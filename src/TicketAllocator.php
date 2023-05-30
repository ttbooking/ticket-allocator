<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Console\Events\CommandFinished;
use Illuminate\Console\OutputStyle;
use Illuminate\Console\View\Components\Factory;
use Illuminate\Contracts\Support\Arrayable;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Events\PropsInvalidated;
use TTBooking\TicketAllocator\Support\FactorDictionary;

/**
 * @template TFactor of class-string<FactorContract>
 */
class TicketAllocator
{
    protected static FactorDictionary $factors;

    protected static bool $propsChanged = false;

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

    public static function invalidateProps(): void
    {
        static::$propsChanged = true;
    }

    public static function actualizeProps(CommandFinished $event = null): void
    {
        if (static::$propsChanged) {
            broadcast(new PropsInvalidated);
            static::$propsChanged = false;

            $event && (new Factory(new OutputStyle($event->input, $event->output)))
                ->info('All dashboards has been notified on property changes.');
        }
    }
}
