<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors\Attributes;

use Attribute;
use TTBooking\TicketAllocator\Contracts\FactorConfig;

#[Attribute(Attribute::TARGET_CLASS)]
class Config
{
    /**
     * @param class-string<FactorConfig> $class
     */
    public function __construct(public string $class)
    {
    }
}
