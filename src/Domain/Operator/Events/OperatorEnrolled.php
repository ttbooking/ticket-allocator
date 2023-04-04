<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorEnrolled extends Event
{
    public function __construct(
        public string $uuid,
        public int|string $userId,
        public ?string $name = null,
        public bool $online = false,
        public bool $ready = false,
        public ?int $ticketLimit = null,
        public ?int $complexityLimit = null,
    ) {
    }
}
