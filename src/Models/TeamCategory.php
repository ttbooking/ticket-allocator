<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property string $team_uuid
 * @property string $category_uuid
 * @property OperatorTeam $team
 * @property TicketCategory $category
 */
class TeamCategory extends Pivot
{
    /**
     * @return BelongsTo<OperatorTeam, self>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(OperatorTeam::class)->withTrashed();
    }

    /**
     * @return BelongsTo<TicketCategory, self>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(TicketCategory::class);
    }
}
