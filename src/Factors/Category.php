<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use TTBooking\TicketAllocator\Attributes\Factors\Singular;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\Http\Resources\TicketCategoryResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

#[Singular]
class Category extends Factor
{
    public function getProps(): array
    {
        return [
            'ticketCategories' => TicketCategoryResource::collection(TicketCategory::all())->resolve(),
        ];
    }

    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        return collect($this->getConfig())->firstWhere('value', $ticket->categoryUuid)
            ?? [
                'initial_weight' => 0,
                'weight_increment' => 0,
                'complexity' => 0,
                'delay' => 0,
            ];
    }
}
