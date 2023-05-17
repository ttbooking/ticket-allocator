<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

/**
 * @implements Collection<string, class-string<FactorContract>>
 */
class FactorDictionary extends Collection
{
}
