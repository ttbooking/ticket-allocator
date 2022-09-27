<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\DetachTicketCategory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Models\TicketCategory;

class DetachTicketCategoryAction extends Action
{
    public function __invoke(Operator $operator, TicketCategory $ticketCategory): void
    {
        $this->dispatch(new DetachTicketCategory(
            uuid: $operator->getKey(),
            ticketCategoryUuid: $ticketCategory->getKey(),
        ));
    }
}
