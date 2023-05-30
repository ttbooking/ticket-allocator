<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Contracts\Support\Arrayable;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Support\FactorDictionary;

/**
 * @template TFactor of class-string<FactorContract>
 */
class TicketAllocator
{
    protected static FactorDictionary $factors;

    protected static bool $invalidationPending = false;

    /**
     * @param  Arrayable<string, TFactor>|iterable<string, TFactor>|null  $factors
     * @return void
     */
    public static function setFactors(Arrayable|iterable|null $factors): void
    {
        static::$factors = new FactorDictionary($factors);
    }

    public static function factors(): FactorDictionary
    {
        return static::$factors ??= new FactorDictionary;
    }

    public static function invalidateProps(bool $invalidate = true): void
    {
        static::$invalidationPending = $invalidate;
    }

    public static function propsInvalid(): bool
    {
        return static::$invalidationPending;
    }
}
