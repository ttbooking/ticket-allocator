<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Facades;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Facade;
use TTBooking\TicketAllocator\Contracts\FactorDictionary as FactorDictionaryContract;

/**
 * @method static Collection getDictionary()
 * @method static string|false getClass(string $alias)
 */
class Factor extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return class-string
     */
    protected static function getFacadeAccessor(): string
    {
        return FactorDictionaryContract::class;
    }
}
