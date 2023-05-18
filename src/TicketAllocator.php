<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

/**
 * @template TFactor of class-string<FactorContract>
 */
class TicketAllocator
{
    /** @var Collection<string, TFactor> */
    protected static Collection $factors;

    /**
     * @param  Arrayable<string, TFactor>|iterable<string, TFactor>|null  $factors
     * @return void
     */
    public static function setFactors(Arrayable|iterable|null $factors): void
    {
        static::$factors = collect($factors);
    }

    /**
     * @return Collection<string, TFactor>
     */
    public static function factors(): Collection
    {
        return static::$factors ??= collect();
    }
}
