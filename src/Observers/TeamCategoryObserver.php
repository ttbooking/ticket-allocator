<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Domain\Operator\Actions\AttachTicketCategoryAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\DetachTicketCategoryAction;
use TTBooking\TicketAllocator\Models\TeamCategory;

class TeamCategoryObserver
{
    public function __construct(
        protected AttachTicketCategoryAction $attachTicketCategory,
        protected DetachTicketCategoryAction $detachTicketCategory,
    ) {
    }

    /**
     * Handle the TeamCategory "created" event.
     */
    public function created(TeamCategory $pivot): void
    {
        foreach ($pivot->team->operators as $operator) {
            ($this->attachTicketCategory)($operator, $pivot->category_uuid);
        }
    }

    /**
     * Handle the TeamCategory "deleting" event.
     */
    public function deleting(TeamCategory $pivot): void
    {
        foreach ($pivot->team->operators as $operator) {
            ($this->detachTicketCategory)($operator, $pivot->category_uuid);
        }
    }
}
