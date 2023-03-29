<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Domain\Operator\Actions\JoinOperatorTeamAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\LeaveOperatorTeamAction;
use TTBooking\TicketAllocator\Models\TeamOperator;

class TeamOperatorObserver
{
    public function __construct(
        protected JoinOperatorTeamAction $joinOperatorTeam,
        protected LeaveOperatorTeamAction $leaveOperatorTeam,
    ) {
    }

    /**
     * Handle the TeamOperator "created" event.
     */
    public function created(TeamOperator $pivot): void
    {
        ($this->joinOperatorTeam)($pivot->operator_uuid, $pivot->team_uuid);
    }

    /**
     * Handle the TeamOperator "deleting" event.
     */
    public function deleting(TeamOperator $pivot): void
    {
        ($this->leaveOperatorTeam)($pivot->operator_uuid, $pivot->team_uuid);
    }
}
