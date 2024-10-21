<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @property string $team_uuid
 * @property string $operator_uuid
 * @property OperatorTeam $team
 * @property Operator $operator
 */
class TeamOperator extends Pivot
{
    /**
     * @return BelongsTo<OperatorTeam, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(OperatorTeam::class)->withTrashed();
    }

    /**
     * @return BelongsTo<Operator, $this>
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }
}
