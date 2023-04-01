<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket;

use Illuminate\Support\Arr;
use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use TTBooking\TicketAllocator\Domain\Attributes\Incrementable;

class TicketAggregateRoot extends AggregateRoot
{
    const META_ICON = 'icon';

    const META_TRIAGE = 'triage';

    const META_CATEGORY_NAME = 'category_name';

    const META_CATEGORY_SHORT = 'category_short';

    const META_TITLE = 'title';

    const META_CARD_TITLE = 'card_title';

    const META_CARD_SUBTITLE = 'card_subtitle';

    const META_CARD_CONTENT = 'card_content';

    public ?object $origin = null;

    // TODO: group by factors? Return magic sum?

    public string $categoryUuid;

    /** @var array<string, mixed> */
    public array $meta = [];

    public ?string $operatorUuid;

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
            categoryUuid: $command->categoryUuid,
            origin: $command->origin,
        ));
    }

    protected function applyTicketCreated(Events\TicketCreated $event): void
    {
        $this->categoryUuid = $event->categoryUuid;
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

    public function changeCategory(Commands\ChangeTicketCategory $command): static
    {
        return $this->recordThat(new Events\TicketCategoryChanged(
            uuid: $this->uuid(),
            categoryUuid: $command->categoryUuid,
        ));
    }

    protected function applyTicketCategoryChanged(Events\TicketCategoryChanged $event): void
    {
        $this->categoryUuid = $event->categoryUuid;
    }

    public function setMetaValue(Commands\SetTicketMetaValue $command): static
    {
        return $this->recordThat(new Events\TicketMetaValueSet(
            uuid: $this->uuid(),
            key: $command->key,
            value: $command->value,
        ));
    }

    protected function applyTicketMetaValueSet(Events\TicketMetaValueSet $event): void
    {
        Arr::set($this->meta, $event->key, $event->value);
    }

    public function bind(Commands\BindTicket $command): static
    {
        return $this->recordThat(new Events\TicketBound(
            uuid: $this->uuid(),
            operatorUuid: $command->operatorUuid,
        ));
    }

    protected function applyTicketBound(Events\TicketBound $event): void
    {
        $this->operatorUuid = $event->operatorUuid;
    }

    public function unbind(Commands\UnbindTicket $command): static
    {
        return $this->recordThat(new Events\TicketUnbound(
            uuid: $this->uuid(),
        ));
    }

    protected function applyTicketUnbound(Events\TicketUnbound $event): void
    {
        $this->operatorUuid = null;
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
