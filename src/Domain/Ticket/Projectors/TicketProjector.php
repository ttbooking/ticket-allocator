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
        ]);
    }

    public function onTicketClosed(Events\TicketClosed $event): void
    {
        Ticket::find($event->uuid)?->writeable()->delete();
    }

    public function onTicketCategoryChanged(Events\TicketCategoryChanged $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['category_uuid' => $event->categoryUuid]);
    }

    public function onTicketMetaValueSet(Events\TicketMetaValueSet $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['meta->'.$event->key => $event->value]);
    }

    public function onTicketBound(Events\TicketBound $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['handler_uuid' => $event->operatorUuid]);
    }

    public function onTicketUnbound(Events\TicketUnbound $event): void
    {
        Ticket::find($event->uuid)?->writeable()->update(['handler_uuid' => null]);
    }

    public function onTicketInitialWeightIncremented(Events\TicketInitialWeightIncremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->increment('initial_weight', $event->weightPoints);
    }

    public function onTicketInitialWeightDecremented(Events\TicketInitialWeightDecremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->decrement('initial_weight', $event->weightPoints);
    }

    public function onTicketWeightIncrementIncremented(Events\TicketWeightIncrementIncremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->increment('weight_increment', $event->weightPoints);
    }

    public function onTicketWeightIncrementDecremented(Events\TicketWeightIncrementDecremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->decrement('weight_increment', $event->weightPoints);
    }

    public function onTicketComplexityIncremented(Events\TicketComplexityIncremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->increment('complexity', $event->complexityPoints);
    }

    public function onTicketComplexityDecremented(Events\TicketComplexityDecremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->decrement('complexity', $event->complexityPoints);
    }

    public function onTicketDelayIncremented(Events\TicketDelayIncremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->increment('delay', $event->delaySeconds);
    }

    public function onTicketDelayDecremented(Events\TicketDelayDecremented $event): void
    {
        Ticket::find($event->uuid)?->writeable()->decrement('delay', $event->delaySeconds);
    }
}
