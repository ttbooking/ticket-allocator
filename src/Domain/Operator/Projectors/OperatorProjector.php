<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projectors;

use Illuminate\Support\Facades\DB;
use Spatie\EventSourcing\EventHandlers\Projectors\Projector;
use TTBooking\TicketAllocator\Domain\Operator\Events;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Events as TicketEvents;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class OperatorProjector extends Projector
{
    public function onOperatorEnrolled(Events\OperatorEnrolled $event): void
    {
        (new Operator)->writeable()->create([
            'uuid' => $event->uuid,
            'user_id' => $event->userId,
            'name' => $event->name,
            'online' => $event->online,
            'ready' => $event->ready,
            'ticket_limit' => $event->ticketLimit,
            'complexity_limit' => $event->complexityLimit,
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
        //Operator::find($event->uuid)?->writeable()->teams()->attach($event->operatorTeamUuid);
    }

    public function onOperatorLeftTeam(Events\OperatorLeftTeam $event): void
    {
        //Operator::find($event->uuid)?->writeable()->teams()->detach($event->operatorTeamUuid);
    }

    public function onOperatorSetTeams(Events\OperatorSetTeams $event): void
    {
        //Operator::find($event->uuid)?->writeable()->teams()->sync($event->operatorTeamUuids);
    }

    public function onOperatorTicketCategoriesAttached(Events\OperatorTicketCategoriesAttached $event): void
    {
        Operator::find($event->uuid)?->writeable()->ticketCategories()
            ->syncWithPivotValues($event->ticketCategoryUuids, ['team_count' => DB::raw('team_count + 1')], false);
    }

    public function onOperatorTicketCategoriesDetached(Events\OperatorTicketCategoriesDetached $event): void
    {
        DB::transaction(function () use ($event) {
            Operator::find($event->uuid)?->writeable()->ticketCategories()
                ->syncWithPivotValues($event->ticketCategoryUuids, ['team_count' => DB::raw('team_count - 1')], false);

            Operator::find($event->uuid)?->writeable()->ticketCategories()
                ->wherePivot('team_count', 0)->detach($event->ticketCategoryUuids);
        });
    }

    public function onTicketBound(TicketEvents\TicketBound $event): void
    {
        $ticket = Ticket::find($event->uuid);
        $newOperator = Operator::find($event->operatorUuid)?->writeable();
        if (! $ticket || ! $newOperator) {
            return;
        }

        $operator = $ticket->operator?->writeable();
        $operator?->decrement('bound_tickets');
        $operator?->decrement('total_complexity', $ticket->complexity);

        $newOperator->increment('bound_tickets');
        $newOperator->increment('total_complexity', $ticket->complexity);
    }

    public function onTicketUnbound(TicketEvents\TicketUnbound $event): void
    {
        $ticket = Ticket::find($event->uuid);
        if (! $operator = $ticket?->operator?->writeable()) {
            return;
        }

        $operator->decrement('bound_tickets');
        $operator->decrement('total_complexity', $ticket->complexity);
    }

    public function onTicketComplexityIncremented(TicketEvents\TicketComplexityIncremented $event): void
    {
        Ticket::find($event->uuid)?->operator?->writeable()->increment('total_complexity', $event->complexityPoints);
    }

    public function onTicketComplexityDecremented(TicketEvents\TicketComplexityDecremented $event): void
    {
        Ticket::find($event->uuid)?->operator?->writeable()->decrement('total_complexity', $event->complexityPoints);
    }
}
