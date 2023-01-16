<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Events;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketProjector extends Projector
{
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

    public function onTicketBound(Events\TicketBound $event): void
    {
        //Ticket::find($event->uuid)?->writeable()->update(['handler_uuid' => $event->operatorUuid]);

        $ticket = Ticket::find($event->uuid)?->writeable();

        if ($operator = $ticket?->operator?->writeable()) {
            $operator->decrement('bound_tickets');
            $operator->decrement('total_complexity', $ticket->complexity);
        }

        $ticket?->update(['handler_uuid' => $event->operatorUuid]);

        if ($operator = Operator::find($event->operatorUuid)?->writeable()) {
            $operator->increment('bound_tickets');
            $operator->increment('total_complexity', $ticket->complexity);
        }
    }

    public function onTicketUnbound(Events\TicketUnbound $event): void
    {
        //Ticket::find($event->uuid)?->writeable()->update(['handler_uuid' => null]);

        $ticket = Ticket::find($event->uuid)?->writeable();

        if ($operator = $ticket?->operator?->writeable()) {
            $operator->decrement('bound_tickets');
            $operator->decrement('total_complexity', $ticket->complexity);
            $ticket->update(['handler_uuid' => null]);
        }
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
        $ticket = Ticket::find($event->uuid)?->writeable();

        $ticket?->increment('complexity', $event->complexityPoints);

        if ($operator = $ticket?->operator?->writeable()) {
            $operator->increment('total_complexity', $event->complexityPoints);
        }
    }

    public function onTicketComplexityDecremented(Events\TicketComplexityDecremented $event): void
    {
        $ticket = Ticket::find($event->uuid)?->writeable();

        $ticket?->decrement('complexity', $event->complexityPoints);

        if ($operator = $ticket?->operator?->writeable()) {
            $operator->decrement('total_complexity', $event->complexityPoints);
        }
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
