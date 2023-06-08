<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Closure;
use Illuminate\Foundation\Application;

/**
 * @mixin Application
 */
class MatcherCacheMixin
{
    /**
     * @return Closure(): bool
     */
    protected function matchersAreCached(): Closure
    {
        return fn (): bool => $this['files']->exists($this->getCachedMatchersPath());
    }

    /**
     * @return Closure(): string
     */
    protected function getCachedMatchersPath(): Closure
    {
        return fn (): string => $this->normalizeCachePath('APP_MATCHERS_CACHE', 'cache/matchers.php');
    }
}
