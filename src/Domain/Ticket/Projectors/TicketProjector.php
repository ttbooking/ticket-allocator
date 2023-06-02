<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Ticket\Events;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketProjector extends Projector
{
    public int $weight = 5;

    public function onTicketCreated(Events\TicketCreated $event): void
    {
        (new Ticket)->writeable()->create([
            'uuid' => $event->uuid,
            'category_uuid' => $event->categoryUuid,
            'handler_uuid' => $event->operatorUuid,
            'meta' => $event->meta,
            'bound_at' => $event->operatorUuid ? now() : null,
        ]);
    }

    public function onTicketClosed(Events\TicketClosed $event): void
    {
        Ticket::find($event->uuid)?->writeable()->delete();
    }

    public function onTicketCategoryChanged(Events\TicketCategoryChanged $event): void
    {
        if (! $ticket = Ticket::find($event->uuid)?->writeable()) {
            return;
        }

        $ticket->update([
            'category_uuid' => $event->categoryUuid,
            'meta' => array_merge($ticket->meta, $event->meta),
        ]);
    }

    public function onTicketMetaValueSet(Events\TicketMetaValueSet $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['meta->'.$event->key => $event->value]);
    }

    public function onTicketMetaValuesMerged(Events\TicketMetaValuesMerged $event): void
    {
        if (! $ticket = Ticket::find($event->uuid)?->writeable()) {
            return;
        }

        $ticket->update(['meta' => array_merge($ticket->meta, $event->meta)]);
    }

    public function onTicketMetricsAdjusted(Events\TicketMetricsAdjusted $event): void
    {
        if (! $ticket = Ticket::find($event->uuid)?->writeable()) {
            return;
        }

        $metrics = [];
        foreach ($event->adjustments as $metric => $adjustment) {
            $metrics[$metric] = max(0, $ticket->$metric + $adjustment);
        }

        $ticket->update(
            ['metrics' => ($ticket->metrics ?? []) + [$event->factorUuid => $event->adjustments]] + $metrics
        );
    }

    public function onTicketBound(Events\TicketBound $event): void
    {
        if (! $ticket = Ticket::find($event->uuid)?->writeable()) {
            return;
        }

        $ticket->update([
            'handler_uuid' => $event->operatorUuid,
            'meta' => array_merge($ticket->meta, $event->meta),
            'bound_at' => now(),
            'accepted_at' => null,
        ]);
    }

    public function onTicketAccepted(Events\TicketAccepted $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['accepted_at' => now()]);
    }

    public function onTicketUnbound(Events\TicketUnbound $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update([
            'handler_uuid' => null,
            'bound_at' => null,
            'accepted_at' => null,
        ]);
    }
}
