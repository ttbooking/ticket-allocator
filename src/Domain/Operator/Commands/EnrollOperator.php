<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Commands;

use Spatie\EventSourcing\Commands\AggregateUuid;
use Spatie\EventSourcing\Commands\HandledBy;
use TTBooking\TicketAllocator\Domain\Operator\OperatorAggregateRoot;

#[HandledBy(OperatorAggregateRoot::class)]
class EnrollOperator
{
    public function __construct(
        #[AggregateUuid] public string $uuid,
        public int|string $userId,
        public ?string $name = null,
        public bool $online = false,
        public bool $ready = false,
        public ?int $ticketLimit = null,
        public ?int $complexityLimit = null,
    ) {}
}
