<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use TTBooking\TicketAllocator\Domain\Operator\Actions\JoinOperatorTeamAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\LeaveOperatorTeamAction;

/**
 * @property string $team_uuid
 * @property string $operator_uuid
 */
class TeamOperator extends Pivot
{
    protected static function booted(): void
    {
        /** @var JoinOperatorTeamAction $joinOperatorTeam */
        $joinOperatorTeam = app(JoinOperatorTeamAction::class);
        /** @var LeaveOperatorTeamAction $leaveOperatorTeam */
        $leaveOperatorTeam = app(LeaveOperatorTeamAction::class);

        static::created(static function (self $pivot) use ($joinOperatorTeam) {
            $joinOperatorTeam($pivot->operator_uuid, $pivot->team_uuid);
        });

        static::deleted(static function (self $pivot) use ($leaveOperatorTeam) {
            $leaveOperatorTeam($pivot->operator_uuid, $pivot->team_uuid);
        });
    }
}
