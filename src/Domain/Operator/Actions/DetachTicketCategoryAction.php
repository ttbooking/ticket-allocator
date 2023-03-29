<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Domain\Operator\Commands\DetachTicketCategories;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Models\TicketCategory;

class DetachTicketCategoryAction extends Action
{
    public function __invoke(
        Operator|string $operator,
        TicketCategory|Collection|EloquentCollection|iterable|string $ticketCategory,
    ): void {
        $this->dispatch(new DetachTicketCategories(
            uuid: is_string($operator) ? $operator : $operator->getKey(),
            ticketCategoryUuids: self::extractUuids($ticketCategory),
        ));
    }
}
