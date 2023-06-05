<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Arr;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;
use TTBooking\TicketAllocator\Http\Resources\TicketCategoryResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

#[Attributes\Instance('99561ec7-78ed-4af6-8a3e-92e9f84a9a36', priority: 200)]
class Category extends AssociationFactor
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
