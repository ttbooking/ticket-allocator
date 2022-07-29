<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use TTBooking\TicketAllocator\Contracts\Factor;
use TTBooking\TicketAllocator\Contracts\FactorRepository as FactorRepositoryContract;
use TTBooking\TicketAllocator\Domain\Support\FactorRepository;
use TTBooking\TicketAllocator\Domain\Ticket\Factors\Category;
use TTBooking\TicketAllocator\Domain\Ticket\Factors\ExpressiveFactor;

class TicketAllocatorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerRoutes();
        $this->registerResources();
        $this->registerCommands();

        if ($this->app->runningInConsole()) {
            $this->offerPublishing();
            $this->registerMigrations();
        }
    }

    /**
     * Register the Ticket Allocator routes.
     *
     * @return void
     */
    protected function registerRoutes(): void
    {
        Route::group([
            'domain' => $this->app['config']['ticket-allocator.domain'] ?? null,
            'prefix' => $this->app['config']['ticket-allocator.path'] ?? null,
            'name' => 'ticket-allocator.',
            'namespace' => 'TTBooking\\TicketAllocator\\Http\\Controllers',
            'middleware' => $this->app['config']['ticket-allocator.middleware'] ?? 'web',
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        });

        require __DIR__.'/../routes/channels.php';
    }

    /**
     * Register the Ticket Allocator resources.
     *
     * @return void
     */
    protected function registerResources(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'ticket-allocator');
    }

    protected function registerCommands(): void
    {
        $this->commands([
            Console\MakeFactorCommand::class,
        ]);
    }

    protected function offerPublishing(): void
    {
        $this->publishes([
            __DIR__.'/../config/ticket-allocator.php' => $this->app->configPath('ticket-allocator.php'),
        ], 'ticket-allocator-config');

        $this->publishes([
            __DIR__.'/../database/migrations' => $this->app->databasePath('migrations'),
        ], 'ticket-allocator-migrations');

        $this->publishes([
            __DIR__.'/../resources/views' => $this->app->resourcePath('views/vendor/ticket-allocator'),
        ], 'ticket-allocator-views');

        $this->publishes([
            __DIR__.'/../public' => public_path('vendor/ticket-allocator'),
        ], 'ticket-allocator-assets');
    }

    protected function registerMigrations(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->configure();
        $this->registerServices();
    }

    protected function configure(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/ticket-allocator.php', 'ticket-allocator');
    }

    protected function registerServices(): void
    {
        $this->app->bind(Category::class, config('ticket-allocator.factors.category'));

        $this->app->alias(Factor::class, 'factor.expressive');
        $this->app->bind('factor.expressive', ExpressiveFactor::class);

        $this->app->singleton(FactorRepositoryContract::class, FactorRepository::class);
    }
}
