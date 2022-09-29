<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator;

use Spatie\EventSourcing\AggregateRoots\AggregateRoot;

class OperatorAggregateRoot extends AggregateRoot
{
    public ?object $origin = null;

    public string $name;

    public bool $online = false;

    public bool $ready = false;

    public int $ticketLimit = 0;

    public int $complexityLimit = 0;

    public function enroll(Commands\EnrollOperator $command): static
    {
        return $this->recordThat(new Events\OperatorEnrolled(
            uuid: $this->uuid(),
            origin: $command->origin,
        ));
    }

    protected function applyOperatorEnrolled(Events\OperatorEnrolled $event): void
    {
        $this->origin = $event->origin;
    }

    public function resign(Commands\ResignOperator $command): static
    {
        return $this->recordThat(new Events\OperatorResigned(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorResigned(Events\OperatorResigned $event): void
    {
    }

    public function changeName(Commands\ChangeOperatorName $command): static
    {
        return $this->recordThat(new Events\OperatorNameChanged(
            uuid: $this->uuid(),
            name: $command->name,
        ));
    }

    protected function applyOperatorNameChanged(Events\OperatorNameChanged $event): void
    {
        $this->name = $event->name;
    }

    public function setOnline(Commands\SetOperatorOnline $command): static
    {
        return $this->recordThat(new Events\OperatorOnline(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorOnline(Events\OperatorOnline $event): void
    {
        $this->online = true;
    }

    public function setOffline(Commands\SetOperatorOffline $command): static
    {
        return $this->recordThat(new Events\OperatorOffline(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorOffline(Events\OperatorOffline $event): void
    {
        $this->online = false;
    }

    public function setReady(Commands\SetOperatorReady $command): static
    {
        return $this->recordThat(new Events\OperatorReady(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorReady(Events\OperatorReady $event): void
    {
        $this->ready = true;
    }

    public function setNotReady(Commands\SetOperatorNotReady $command): static
    {
        return $this->recordThat(new Events\OperatorNotReady(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorNotReady(Events\OperatorNotReady $event): void
    {
        $this->ready = false;
    }

    public function adjustTicketLimit(Commands\AdjustOperatorTicketLimit $command): static
    {
        return $this->recordThat(new Events\OperatorTicketLimitAdjusted(
            uuid: $this->uuid(),
            ticketLimit: $command->ticketLimit,
        ));
    }

    protected function applyOperatorTicketLimitAdjusted(Events\OperatorTicketLimitAdjusted $event): void
    {
        $this->ticketLimit = $event->ticketLimit;
    }

    public function adjustComplexityLimit(Commands\AdjustOperatorComplexityLimit $command): static
    {
        return $this->recordThat(new Events\OperatorComplexityLimitAdjusted(
            uuid: $this->uuid(),
            complexityLimit: $command->complexityLimit,
        ));
    }

    protected function applyOperatorComplexityLimitAdjusted(Events\OperatorComplexityLimitAdjusted $event): void
    {
        $this->complexityLimit = $event->complexityLimit;
    }

    public function joinOperatorTeam(Commands\JoinOperatorTeam $command): static
    {
        return $this->recordThat(new Events\OperatorJoinedTeam(
            uuid: $this->uuid(),
            operatorTeamUuid: $command->operatorTeamUuid,
        ));
    }

    protected function applyOperatorJoinedTeam(Events\OperatorJoinedTeam $event): void
    {
    }

    public function leaveOperatorTeam(Commands\LeaveOperatorTeam $command): static
    {
        return $this->recordThat(new Events\OperatorLeftTeam(
            uuid: $this->uuid(),
            operatorTeamUuid: $command->operatorTeamUuid,
        ));
    }

    protected function applyOperatorLeftTeam(Events\OperatorLeftTeam $event): void
    {
    }

    public function attachTicketCategory(Commands\AttachTicketCategory $command): static
    {
        return $this->recordThat(new Events\OperatorTicketCategoryAttached(
            uuid: $this->uuid(),
            ticketCategoryUuid: $command->ticketCategoryUuid,
        ));
    }

    protected function applyOperatorTicketCategoryAttached(Events\OperatorTicketCategoryAttached $event): void
    {
    }

    public function detachTicketCategory(Commands\DetachTicketCategory $command): static
    {
        return $this->recordThat(new Events\OperatorTicketCategoryDetached(
            uuid: $this->uuid(),
            ticketCategoryUuid: $command->ticketCategoryUuid,
        ));
    }

    protected function applyOperatorTicketCategoryDetached(Events\OperatorTicketCategoryDetached $event): void
    {
    }
}
