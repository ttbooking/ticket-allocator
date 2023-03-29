<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use TTBooking\TicketAllocator\Domain\Operator\Actions\AttachTicketCategoryAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\DetachTicketCategoryAction;

/**
 * @property string $team_uuid
 * @property string $category_uuid
 * @property OperatorTeam $team
 * @property TicketCategory $category
 */
class TeamCategory extends Pivot
{
    protected static function booted(): void
    {
        /** @var AttachTicketCategoryAction $attachTicketCategory */
        $attachTicketCategory = app(AttachTicketCategoryAction::class);
        /** @var DetachTicketCategoryAction $detachTicketCategory */
        $detachTicketCategory = app(DetachTicketCategoryAction::class);

        static::created(static function (self $pivot) use ($attachTicketCategory) {
            foreach ($pivot->team->operators as $operator) {
                $attachTicketCategory($operator, $pivot->category_uuid);
            }
        });

        static::deleting(static function (self $pivot) use ($detachTicketCategory) {
            foreach ($pivot->team->operators as $operator) {
                $detachTicketCategory($operator, $pivot->category_uuid);
            }
        });
    }

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
