<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Ticket\Events;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketProjector extends Projector
{
    public function onTicketCreated(Events\TicketCreated $event): void
    {
        (new Ticket)->writeable()->create([
            'uuid' => $event->uuid,
        ]);
    }

    public function onTicketClosed(Events\TicketClosed $event): void
    {
        Ticket::find($event->uuid)?->writeable()->delete();
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
