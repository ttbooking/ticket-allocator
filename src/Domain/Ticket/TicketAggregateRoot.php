<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket;

use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use TTBooking\TicketAllocator\Domain\Attributes\Incrementable;

class TicketAggregateRoot extends AggregateRoot
{
    public object $origin;

    // TODO: group by factors? Return magic sum?

    #[Incrementable]
    public int $initialWeight = 0;

    #[Incrementable]
    public int $weightIncrement = 0;

    #[Incrementable]
    public int $complexity = 0;

    #[Incrementable]
    public int $delay = 0;

    /** @var array<string, array<string, mixed>> */
    protected array $attributes = [];

    public function create(Commands\CreateTicket $command): static
    {
        return $this->recordThat(new Events\TicketCreated(
            uuid: $this->uuid(),
            origin: $command->origin,
        ));
    }

    protected function applyTicketCreated(Events\TicketCreated $event): void
    {
        $this->origin = $event->origin;
    }

    public function close(Commands\CloseTicket $command): static
    {
        return $this->recordThat(new Events\TicketClosed(
            uuid: $this->uuid(),
        ));
    }

    protected function applyTicketClosed(Events\TicketClosed $event): void
    {
    }

    public function incrementInitialWeight(Commands\IncrementTicketInitialWeight $command): static
    {
        return $this->recordThat(new Events\TicketInitialWeightIncremented(
            uuid: $this->uuid(),
            weightPoints: $command->weightPoints,
        ));
    }

    protected function applyTicketInitialWeightIncremented(Events\TicketInitialWeightIncremented $event): void
    {
        $this->initialWeight += $event->weightPoints;
    }

    public function decrementInitialWeight(Commands\DecrementTicketInitialWeight $command): static
    {
        return $this->recordThat(new Events\TicketInitialWeightDecremented(
            uuid: $this->uuid(),
            weightPoints: $command->weightPoints,
        ));
    }

    protected function applyTicketInitialWeightDecremented(Events\TicketInitialWeightDecremented $event): void
    {
        $this->initialWeight -= $event->weightPoints;
    }

    public function incrementWeightIncrement(Commands\IncrementTicketWeightIncrement $command): static
    {
        return $this->recordThat(new Events\TicketWeightIncrementIncremented(
            uuid: $this->uuid(),
            weightPoints: $command->weightPoints,
        ));
    }

    protected function applyTicketWeightIncrementIncremented(Events\TicketWeightIncrementIncremented $event): void
    {
        $this->weightIncrement += $event->weightPoints;
    }

    public function decrementWeightIncrement(Commands\DecrementTicketWeightIncrement $command): static
    {
        return $this->recordThat(new Events\TicketWeightIncrementDecremented(
            uuid: $this->uuid(),
            weightPoints: $command->weightPoints,
        ));
    }

    protected function applyTicketWeightIncrementDecremented(Events\TicketWeightIncrementDecremented $event): void
    {
        $this->weightIncrement -= $event->weightPoints;
    }

    public function incrementComplexity(Commands\IncrementTicketComplexity $command): static
    {
        return $this->recordThat(new Events\TicketComplexityIncremented(
            uuid: $this->uuid(),
            complexityPoints: $command->complexityPoints,
        ));
    }

    protected function applyTicketComplexityIncremented(Events\TicketComplexityIncremented $event): void
    {
        $this->complexity += $event->complexityPoints;
    }

    public function decrementComplexity(Commands\DecrementTicketComplexity $command): static
    {
        return $this->recordThat(new Events\TicketComplexityDecremented(
            uuid: $this->uuid(),
            complexityPoints: $command->complexityPoints,
        ));
    }

    protected function applyTicketComplexityDecremented(Events\TicketComplexityDecremented $event): void
    {
        $this->complexity -= $event->complexityPoints;
    }

    public function incrementDelay(Commands\IncrementTicketDelay $command): static
    {
        return $this->recordThat(new Events\TicketDelayIncremented(
            uuid: $this->uuid(),
            delaySeconds: $command->delaySeconds,
        ));
    }

    protected function applyTicketDelayIncremented(Events\TicketDelayIncremented $event): void
    {
        $this->delay += $event->delaySeconds;
    }

    public function decrementDelay(Commands\DecrementTicketDelay $command): static
    {
        return $this->recordThat(new Events\TicketDelayDecremented(
            uuid: $this->uuid(),
            delaySeconds: $command->delaySeconds,
        ));
    }

    protected function applyTicketDelayDecremented(Events\TicketDelayDecremented $event): void
    {
        $this->delay -= $event->delaySeconds;
    }
}
