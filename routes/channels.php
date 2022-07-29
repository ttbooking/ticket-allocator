<?php

use Illuminate\Support\Facades\Broadcast;
use TTBooking\TicketAllocator\Broadcasting\OperatorChannel;
use TTBooking\TicketAllocator\Broadcasting\SupervisorChannel;

Broadcast::channel('ticket-allocator.operator.{operator}', OperatorChannel::class);

Broadcast::channel('ticket-allocator.supervisor', SupervisorChannel::class);
