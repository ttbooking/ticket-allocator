<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class TicketCreated extends Event
{
    public function __construct(
        public string $uuid,
        public string $categoryUuid,
        public ?string $operatorUuid = null,
        public int $initialWeight = 0,
        public int $weightIncrement = 0,
        public int $complexity = 0,
        public int $delay = 0,
        public array $meta = [],
    ) {
    }
}
