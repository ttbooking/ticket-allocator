<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Closure;
use Illuminate\Foundation\Application;

/**
 * @mixin Application
 */
class FactorCacheMixin
{
    /**
     * @return Closure(): bool
     */
    protected function factorsAreCached(): Closure
    {
        return fn (): bool => $this['files']->exists($this->getCachedFactorsPath());
    }

    /**
     * @return Closure(): string
     */
    protected function getCachedFactorsPath(): Closure
    {
        return fn (): string => $this->normalizeCachePath('APP_FACTORS_CACHE', 'cache/factors.php');
    }
}
