<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Console\Events\CommandFinished;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Events\PublishingStubs;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Spatie\EventSourcing\Facades\Projectionist;
use TTBooking\TicketAllocator\Domain\Operator\Projectors\OperatorProjector;
use TTBooking\TicketAllocator\Domain\Ticket\Projectors\TicketProjector;
//use TTBooking\TicketAllocator\Domain\Ticket\Reactors\ApplyCategoryInfo;
use TTBooking\TicketAllocator\Domain\Ticket\Reactors\ApplyFactors;
use TTBooking\TicketAllocator\Jobs\Triage;

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
            Console\FactorInstallCommand::class,
            Console\MatcherCacheCommand::class,
            Console\MatcherClearCommand::class,
            Console\MatcherMakeCommand::class,
            Console\ReloadDashboardsCommand::class,
            Console\SnapshotOperatorCommand::class,
        ]);

        Event::listen(CommandFinished::class, TicketAllocator::actualizeProps(...));
    }

    protected function registerObservers(): void
    {
        Models\Factor::observe(Observers\InvalidatingObserver::class);
        Models\OperatorTeam::observe(Observers\InvalidatingObserver::class);
        Models\TicketCategory::observe([Observers\TicketCategoryObserver::class, Observers\InvalidatingObserver::class]);
        Models\TeamOperator::observe(Observers\TeamOperatorObserver::class);
    }

    protected function registerEventHandlers(): void
    {
        Projectionist::addEventHandlers([
            OperatorProjector::class,
            TicketProjector::class,
            ApplyFactors::class,
            //ApplyCategoryInfo::class,
        ]);
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

        Event::listen(PublishingStubs::class, static fn (PublishingStubs $stubs) => $stubs
            ->add(__DIR__.'/../stubs/factor.stub', 'factor.stub')
            ->add(__DIR__.'/../stubs/matcher.stub', 'matcher.stub')
        );
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
