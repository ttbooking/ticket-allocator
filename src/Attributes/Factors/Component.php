<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Attributes\Factors;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS)]
class Component
{
    public function __construct(public string $name)
    {
    }
}
