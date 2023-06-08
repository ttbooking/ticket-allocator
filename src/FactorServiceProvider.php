<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Support\DiscoverFactors;

class FactorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerMixins();
        $this->registerFactors();
    }

    protected function registerMixins(): void
    {
        Application::mixin(new Support\FactorCacheMixin);
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
            ->filter(DiscoverFactors::isExplicit(...))
            ->mapWithKeys(self::mapFactor(...))
            ->sortBy(self::factorName(...))
            ->all();
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
}
