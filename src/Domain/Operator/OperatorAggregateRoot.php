<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator;

use Spatie\EventSourcing\AggregateRoots\AggregateRoot;

class OperatorAggregateRoot extends AggregateRoot
{
    public int|string $userId;

    public ?string $name = null;

    public bool $online = false;

    public bool $ready = false;

    public ?int $ticketLimit = null;

    public ?int $complexityLimit = null;

    public function enroll(Commands\EnrollOperator $command): static
    {
        return $this->recordThat(new Events\OperatorEnrolled(
            uuid: $this->uuid(),
            userId: $command->userId,
            name: $command->name,
            online: $command->online,
            ready: $command->ready,
            ticketLimit: $command->ticketLimit,
            complexityLimit: $command->complexityLimit,
        ));
    }

    protected function applyOperatorEnrolled(Events\OperatorEnrolled $event): void
    {
        $this->userId = $event->userId;
        $this->name = $event->name;
        $this->online = $event->online;
        $this->ready = $event->ready;
        $this->ticketLimit = $event->ticketLimit;
        $this->complexityLimit = $event->complexityLimit;
    }

    public function resign(Commands\ResignOperator $command): static
    {
        return $this->recordThat(new Events\OperatorResigned(
            uuid: $this->uuid(),
        ));
    }

    protected function applyOperatorResigned(Events\OperatorResigned $event): void {}

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

    protected function applyOperatorJoinedTeam(Events\OperatorJoinedTeam $event): void {}

    public function leaveOperatorTeam(Commands\LeaveOperatorTeam $command): static
    {
        return $this->recordThat(new Events\OperatorLeftTeam(
            uuid: $this->uuid(),
            operatorTeamUuid: $command->operatorTeamUuid,
        ));
    }

    protected function applyOperatorLeftTeam(Events\OperatorLeftTeam $event): void {}

    public function setOperatorTeams(Commands\SetOperatorTeams $command): static
    {
        return $this->recordThat(new Events\OperatorSetTeams(
            uuid: $this->uuid(),
            operatorTeamUuids: $command->operatorTeamUuids,
        ));
    }

    protected function applyOperatorSetTeams(Events\OperatorSetTeams $event): void {}

    public function postOperatorMessage(Commands\PostOperatorMessage $command): static
    {
        return $this->recordThat(new Events\OperatorMessagePosted(
            uuid: $this->uuid(),
            ticketUuid: $command->ticketUuid,
            meta: $command->meta,
        ));
    }

    protected function applyOperatorMessagePosted(Events\OperatorMessagePosted $event): void {}
}
