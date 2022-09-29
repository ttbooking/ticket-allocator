<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projectors;

use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Operator\Events;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class OperatorProjector extends Projector
{
    public function onOperatorEnrolled(Events\OperatorEnrolled $event): void
    {
        (new Operator)->writeable()->create([
            'uuid' => $event->uuid,
        ]);
    }

    public function onOperatorResigned(Events\OperatorResigned $event): void
    {
        Operator::find($event->uuid)?->writeable()->delete();
    }

    public function onOperatorNameChanged(Events\OperatorNameChanged $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['name' => $event->name]);
    }

    public function onOperatorCommented(Events\OperatorCommented $event): void
    {
        //Operator::find($event->uuid)?->writeable()->...;
    }

    public function onOperatorTicketLimitAdjusted(Events\OperatorTicketLimitAdjusted $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['ticket_limit' => $event->ticketLimit]);
    }

    public function onOperatorComplexityLimitAdjusted(Events\OperatorComplexityLimitAdjusted $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['complexity_limit' => $event->complexityLimit]);
    }

    public function onOperatorOnline(Events\OperatorOnline $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['online' => true]);
    }

    public function onOperatorOffline(Events\OperatorOffline $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['online' => false]);
    }

    public function onOperatorReady(Events\OperatorReady $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['ready' => true]);
    }

    public function onOperatorNotReady(Events\OperatorNotReady $event): void
    {
        Operator::find($event->uuid)?->writeable()->update(['ready' => false]);
    }

    public function onOperatorJoinedTeam(Events\OperatorJoinedTeam $event): void
    {
        Operator::find($event->uuid)?->writeable()->teams()->attach($event->operatorTeamUuid);
    }

    public function onOperatorLeftTeam(Events\OperatorLeftTeam $event): void
    {
        Operator::find($event->uuid)?->writeable()->teams()->detach($event->operatorTeamUuid);
    }
}
