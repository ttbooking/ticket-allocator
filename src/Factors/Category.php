<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Arr;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;
use TTBooking\TicketAllocator\Http\Resources\TicketCategoryResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @template TEntry of array{
 *     value: string,
 *     initial_weight: int,
 *     weight_increment: int,
 *     complexity: int,
 *     delay: int,
 * }
 *
 * @extends Factor<TEntry[]>
 */
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

    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics
    {
        $adjustments = collect($this->config)->firstWhere('value', $ticket->categoryUuid);

        return $adjustments ? TicketMetrics::from(Arr::except($adjustments, 'value')) : new TicketMetrics;
    }
}
