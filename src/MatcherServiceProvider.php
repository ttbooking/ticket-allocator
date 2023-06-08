<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;
use TTBooking\TicketAllocator\Support\DiscoverMatchers;

class MatcherServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerMixins();
        $this->registerMatchers();
    }

    protected function registerMixins(): void
    {
        Application::mixin(new Support\MatcherCacheMixin);
    }

    protected function registerMatchers(): void
    {
        TicketAllocator::setMatchers($this->getMatchers());
    }

    /**
     * @param  bool  $ignoreCache
     * @return array<string, class-string<MatcherContract>>
     */
    public function getMatchers(bool $ignoreCache = false): array
    {
        if (! $ignoreCache && $this->app->matchersAreCached()) {
            return require $this->app->getCachedMatchersPath();
        }

        return collect(array_merge($this->discoveredMatchers(), $this->matchers()))
            ->filter(DiscoverMatchers::isExplicit(...))
            ->mapWithKeys(self::mapMatcher(...))
            ->sortBy(self::matcherName(...))
            ->all();
    }

    /**
     * @param  class-string<MatcherContract>  $matcher
     * @param  array-key  $alias
     * @return array<string, class-string<MatcherContract>>
     */
    private static function mapMatcher(string $matcher, string|int $alias): array
    {
        is_string($alias) && $matcher::setAlias($alias);

        return [$matcher::getAlias() => $matcher];
    }

    /**
     * @param  class-string<MatcherContract>  $matcher
     * @return string
     */
    private static function matcherName(string $matcher): string
    {
        return $matcher::getName();
    }

    /**
     * @return array<class-string<MatcherContract>>
     */
    protected function matchers(): array
    {
        return $this->app['config']['ticket-allocator.matchers'] ?? [];
    }

    /**
     * @return list<class-string<MatcherContract>>
     */
    protected function discoveredMatchers(): array
    {
        return $this->shouldDiscoverMatchers() ? $this->discoverMatchers() : [];
    }

    protected function shouldDiscoverMatchers(): bool
    {
        return $this->app['config']['ticket-allocator.enable_matcher_discovery'] ?? true;
    }

    /**
     * @return list<class-string<MatcherContract>>
     */
    protected function discoverMatchers(): array
    {
        return collect($this->discoverMatchersWithin())
            ->filter(static fn (string $filename) => is_dir($filename))
            ->reduce(function (array $discovered, string $directory) {
                return array_merge($discovered, DiscoverMatchers::within($directory, $this->matcherDiscoveryBasePath()));
            }, []);
    }

    /**
     * @return string[]
     */
    protected function discoverMatchersWithin(): array
    {
        return $this->app['config']['ticket-allocator.discover_matchers_within'] ?? [];
    }

    protected function matcherDiscoveryBasePath(): string
    {
        return $this->app['config']['ticket-allocator.matcher_discovery_base_path'] ?? $this->app->basePath();
    }
}
