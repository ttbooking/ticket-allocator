<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Events;

use TTBooking\TicketAllocator\Domain\Support\Event;

class OperatorSetTeams extends Event
{
    /**
     * @param  string  $uuid
     * @param  string[]  $operatorTeamUuids
     */
    public function __construct(
        public string $uuid,
        public array $operatorTeamUuids,
    ) {
    }
}
