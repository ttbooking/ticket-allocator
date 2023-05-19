<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Events\PublishingStubs;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Spatie\EventSourcing\Facades\Projectionist;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Domain\Operator\Projectors\OperatorProjector;
use TTBooking\TicketAllocator\Domain\Operator\Reactors\SyncTicketCategories;
use TTBooking\TicketAllocator\Domain\Ticket\Projectors\TicketProjector;
//use TTBooking\TicketAllocator\Domain\Ticket\Reactors\ApplyCategoryInfo;
use TTBooking\TicketAllocator\Domain\Ticket\Reactors\ApplyFactors;
use TTBooking\TicketAllocator\Jobs\Triage;
use TTBooking\TicketAllocator\Support\DiscoverFactors;

class TicketAllocatorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerRoutes();
        $this->registerResources();
        $this->registerMixins();
        $this->registerCommands();
        $this->registerObservers();
        $this->registerEventHandlers();
        $this->registerFactors();

        if ($this->app->runningInConsole()) {
            $this->offerPublishing();
            $this->registerMigrations();
        }
    }

    /**
     * Register the Ticket Allocator routes.
     */
    protected function registerRoutes(): void
    {
        Route::domain($this->app['config']['ticket-allocator.domain'] ?? '')
            ->prefix($this->app['config']['ticket-allocator.path'] ?? '')
            ->name('ticket-allocator.')
            ->namespace('TTBooking\\TicketAllocator\\Http\\Controllers')
            ->middleware($this->app['config']['ticket-allocator.middleware'] ?? 'web')
            ->group(fn () => $this->loadRoutesFrom(__DIR__.'/../routes/web.php'));

        require __DIR__.'/../routes/channels.php';
    }

    /**
     * Register the Ticket Allocator resources.
     */
    protected function registerResources(): void
    {
        $this->loadTranslationsFrom(__DIR__.'/../lang', 'ticket-allocator');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'ticket-allocator');
    }

    protected function registerMixins(): void
    {
        Application::mixin(new Support\FactorCacheMixin);
        Vite::mixin(new Support\ViteAliasMixin);
    }

    protected function registerCommands(): void
    {
        $this->commands([
            Console\SeedCommand::class,
            Console\ReapCommand::class,
            Console\CleanCommand::class,
            Console\FactorCacheCommand::class,
            Console\FactorClearCommand::class,
            Console\FactorMakeCommand::class,
            Console\SnapshotOperatorCommand::class,
        ]);
    }

    protected function registerObservers(): void
    {
        Models\OperatorTeam::observe(Observers\OperatorTeamObserver::class);
        Models\TeamCategory::observe(Observers\TeamCategoryObserver::class);
        Models\TeamOperator::observe(Observers\TeamOperatorObserver::class);
        Models\TicketCategory::observe(Observers\TicketCategoryObserver::class);
    }

    protected function registerEventHandlers(): void
    {
        Projectionist::addEventHandlers([
            OperatorProjector::class,
            TicketProjector::class,
            SyncTicketCategories::class,
            ApplyFactors::class,
            //ApplyCategoryInfo::class,
        ]);
    }

    protected function registerFactors(): void
    {
        TicketAllocator::setFactors($this->getFactors());
    }

    /**
     * @param  bool  $ignoreCache
     * @return array<string, class-string<FactorContract>>
     */
    public function getFactors(bool $ignoreCache = false): array
    {
        if (! $ignoreCache && $this->app->factorsAreCached()) {
            return require $this->app->getCachedFactorsPath();
        }

        return collect(array_merge($this->discoveredFactors(), $this->factors()))
            ->filter(static fn (string $class) => is_subclass_of($class, FactorContract::class))
            ->reject(self::factorExcluded(...))
            ->mapWithKeys(self::mapFactor(...))
            ->sortBy(self::factorName(...))
            ->all();
    }

    /**
     * @param  class-string<FactorContract>  $factor
     * @return bool
     */
    private static function factorExcluded(string $factor): bool
    {
        return $factor::isExcluded();
    }

    /**
     * @param  class-string<FactorContract>  $factor
     * @param  array-key  $alias
     * @return array<string, class-string<FactorContract>>
     */
    private static function mapFactor(string $factor, string|int $alias): array
    {
        is_string($alias) && $factor::setAlias($alias);

        return [$factor::getAlias() => $factor];
    }

    /**
     * @param  class-string<FactorContract>  $factor
     * @return string
     */
    private static function factorName(string $factor): string
    {
        return $factor::getName();
    }

    /**
     * @return array<class-string<FactorContract>>
     */
    protected function factors(): array
    {
        return $this->app['config']['ticket-allocator.factors'] ?? [];
    }

    /**
     * @return list<class-string<FactorContract>>
     */
    protected function discoveredFactors(): array
    {
        return $this->shouldDiscoverFactors() ? $this->discoverFactors() : [];
    }

    protected function shouldDiscoverFactors(): bool
    {
        return $this->app['config']['ticket-allocator.enable_factor_discovery'] ?? true;
    }

    /**
     * @return list<class-string<FactorContract>>
     */
    protected function discoverFactors(): array
    {
        return collect($this->discoverFactorsWithin())
            ->filter(static fn (string $filename) => is_dir($filename))
            ->reduce(function (array $discovered, string $directory) {
                return array_merge($discovered, DiscoverFactors::within($directory, $this->factorDiscoveryBasePath()));
            }, []);
    }

    /**
     * @return string[]
     */
    protected function discoverFactorsWithin(): array
    {
        return $this->app['config']['ticket-allocator.discover_factors_within'] ?? [];
    }

    protected function factorDiscoveryBasePath(): string
    {
        return $this->app['config']['ticket-allocator.factor_discovery_base_path'] ?? $this->app->basePath();
    }

    protected function offerPublishing(): void
    {
        $this->publishes([
            __DIR__.'/../config/ticket-allocator.php' => $this->app->configPath('ticket-allocator.php'),
        ], ['ticket-allocator', 'config', 'ticket-allocator-config']);

        $this->publishes([
            __DIR__.'/../database/migrations' => $this->app->databasePath('migrations'),
        ], ['ticket-allocator', 'migrations', 'ticket-allocator-migrations']);

        $this->publishes([
            __DIR__.'/../resources/views' => $this->app->resourcePath('views/vendor/ticket-allocator'),
        ], ['ticket-allocator', 'views', 'ticket-allocator-views']);

        $this->publishes([
            __DIR__.'/../public' => $this->app->publicPath('vendor/ticket-allocator'),
            __DIR__.'/../bootstrap' => $this->app->basePath('bootstrap/vendor/ticket-allocator'),
        ], ['ticket-allocator', 'assets', 'ticket-allocator-assets']);

        $this->publishes([
            __DIR__.'/../stubs' => $this->app->basePath('stubs')
        ], ['ticket-allocator', 'stubs', 'ticket-allocator-stubs']);

        Event::listen(PublishingStubs::class, static function (PublishingStubs $stubs) {
            $stubs->add(__DIR__.'/../stubs/factor.stub', 'factor.stub');
        });
    }

    protected function registerMigrations(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->configure();
        $this->registerServices();

        if ($this->app->runningInConsole()) {
            $this->scheduleTasks();
        }
    }

    protected function configure(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/ticket-allocator.php', 'ticket-allocator');
    }

    protected function registerServices(): void
    {
        //
    }

    protected function scheduleTasks(): void
    {
        $this->callAfterResolving(Schedule::class, function (Schedule $schedule) {
            $this->scheduleTicketTriage($schedule);
            $this->scheduleOperatorSnapshot($schedule);
        });
    }

    protected function scheduleTicketTriage(Schedule $schedule): void
    {
        if ($expression = $this->app['config']['ticket-allocator.triage_schedule']) {
            $schedule->job(Triage::class)->cron($expression);
        }
    }

    protected function scheduleOperatorSnapshot(Schedule $schedule): void
    {
        if ($expression = $this->app['config']['ticket-allocator.snapshot_schedule']) {
            $schedule->command('ticket-allocator:snapshot-operator')->cron($expression);
        }
    }
}
