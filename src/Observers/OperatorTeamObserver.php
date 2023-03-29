<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Observers;

use TTBooking\TicketAllocator\Domain\Operator\Actions\AttachTicketCategoryAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\DetachTicketCategoryAction;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class OperatorTeamObserver
{
    public function __construct(
        protected AttachTicketCategoryAction $attachTicketCategory,
        protected DetachTicketCategoryAction $detachTicketCategory,
    ) {
    }

    /**
     * Handle the OperatorTeam "restored" event.
     */
    public function restored(OperatorTeam $team): void
    {
        foreach ($team->operators as $operator) {
            ($this->attachTicketCategory)($operator, $team->ticketCategories);
        }
    }

    /**
     * Handle the OperatorTeam "deleting" event.
     */
    public function deleting(OperatorTeam $team): void
    {
        if ($team->isForceDeleting()) {
            return;
        }

        foreach ($team->operators as $operator) {
            ($this->detachTicketCategory)($operator, $team->ticketCategories);
        }
    }

    /**
     * Handle the OperatorTeam "forceDeleting" event.
     */
    public function forceDeleting(OperatorTeam $team): void
    {
        $team->operators()->detach($team->operators);
        $team->ticketCategories()->detach($team->ticketCategories);
    }
}
