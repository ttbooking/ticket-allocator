<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use TTBooking\TicketAllocator\Concerns\Broadcastable;

abstract class Event implements ShouldBroadcast
{
    use Broadcastable;
}
