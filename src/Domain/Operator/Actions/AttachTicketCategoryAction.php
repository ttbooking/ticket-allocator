<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\AttachTicketCategory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Models\TicketCategory;

class AttachTicketCategoryAction extends Action
{
    public function __invoke(Operator|string $operator, TicketCategory|string $ticketCategory): void
    {
        $this->dispatch(new AttachTicketCategory(
            uuid: is_string($operator) ? $operator : $operator->getKey(),
            ticketCategoryUuid: is_string($ticketCategory) ? $ticketCategory : $ticketCategory->getKey(),
        ));
    }
}
