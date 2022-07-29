<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Incrementable
{
}
