<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Arr;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\Http\Resources\TicketCategoryResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

#[Attributes\Singular]
#[Attributes\Component('Factor/Partials/AssociationForm')]
class Category extends Factor
{
    public function getProps(): array
    {
        return [
            'entries' => TicketCategoryResource::collection(TicketCategory::all())->resolve(),
        ];
    }

    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        $adjustments = collect($this->getConfig())->firstWhere('value', $ticket->categoryUuid);

        return $adjustments
            ? Arr::except($adjustments, 'value')
            : [
                'initial_weight' => 0,
                'weight_increment' => 0,
                'complexity' => 0,
                'delay' => 0,
            ];
    }
}
