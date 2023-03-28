<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use TTBooking\TicketAllocator\Domain\Operator\Actions\JoinOperatorTeamAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\LeaveOperatorTeamAction;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @property string $team_uuid
 * @property string $operator_uuid
 * @property OperatorTeam $team
 * @property Operator $operator
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

    /**
     * @return BelongsTo<OperatorTeam, self>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(OperatorTeam::class);
    }

    /**
     * @return BelongsTo<Operator, self>
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }
}
