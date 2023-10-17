<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Console\Events\CommandFinished;
use Illuminate\Console\OutputStyle;
use Illuminate\Console\View\Components\Factory;
use Illuminate\Contracts\Support\Arrayable;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;
use TTBooking\TicketAllocator\Events\PropsInvalidated;
use TTBooking\TicketAllocator\Support\FactorDictionary;
use TTBooking\TicketAllocator\Support\MatcherDictionary;

/**
 * @template TFactor of class-string<FactorContract>
 * @template TMatcher of class-string<MatcherContract>
 */
class TicketAllocator
{
    protected static FactorDictionary $factors;

    protected static MatcherDictionary $matchers;

    protected static bool $propsChanged = false;

    /**
     * @param  Arrayable<string, TFactor>|iterable<string, TFactor>|null  $factors
     */
    public static function setFactors(Arrayable|iterable|null $factors): void
    {
        static::$factors = new FactorDictionary($factors);
    }

    public static function factors(): FactorDictionary
    {
        return static::$factors ??= new FactorDictionary;
    }

    /**
     * @param  Arrayable<string, TMatcher>|iterable<string, TMatcher>|null  $matchers
     */
    public static function setMatchers(Arrayable|iterable|null $matchers): void
    {
        static::$matchers = new MatcherDictionary($matchers);
    }

    public static function matchers(): MatcherDictionary
    {
        return static::$matchers ??= new MatcherDictionary;
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
