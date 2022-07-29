<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Facades;

use Illuminate\Support\Facades\Facade;
use TTBooking\TicketAllocator\Contracts\Factor;
use TTBooking\TicketAllocator\Contracts\FactorRepository as FactorRepositoryContract;

/**
 * @method static array getForEvent(string $event)
 * @method static Factor get(string $uuid)
 * @method static string add(string $factor, array $config = [], string $description = null)
 */
class FactorRepository extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return class-string
     */
    protected static function getFacadeAccessor(): string
    {
        return FactorRepositoryContract::class;
    }
}
