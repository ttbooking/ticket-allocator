<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\DTO;

use Spatie\LaravelData\Data;
use TTBooking\TicketAllocator\Contracts\FactorConfig;

class UnknownConfig extends Data implements FactorConfig
{
}
