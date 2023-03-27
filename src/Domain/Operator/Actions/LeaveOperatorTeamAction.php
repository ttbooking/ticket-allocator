<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\LeaveOperatorTeam;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class LeaveOperatorTeamAction extends Action
{
    public function __invoke(Operator|string $operator, OperatorTeam|string $operatorTeam): void
    {
        $this->dispatch(new LeaveOperatorTeam(
            uuid: is_string($operator) ? $operator : $operator->getKey(),
            operatorTeamUuid: is_string($operatorTeam) ? $operatorTeam : $operatorTeam->getKey(),
        ));
    }
}
