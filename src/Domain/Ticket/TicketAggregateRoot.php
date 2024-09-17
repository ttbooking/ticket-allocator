<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket;

use Illuminate\Support\Arr;
use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketAggregateRoot extends AggregateRoot
{
    const META_ICON = 'icon';
    const META_TRIAGE = 'triage';
    const META_CATEGORY_NAME = 'category_name';
    const META_CATEGORY_SHORT = 'category_short';
    const META_METRIC_ADJUSTMENTS = 'metric_adjustments';
    const META_TITLE = 'title';
    const META_CARD_TITLE = 'card_title';
    const META_CARD_SUBTITLE = 'card_subtitle';
    const META_CARD_CONTENT = 'card_content';

    // TODO: group by factors? Return magic sum?

    public string $categoryUuid;

    /** @var array<string, mixed> */
    public array $meta = [];

    /** @var array<string, TicketMetrics> */
    public array $perFactorMetrics = [];

    public TicketMetrics $metrics;

    public ?string $operatorUuid;

    public bool $accepted;

    public function __construct()
    {
        $this->metrics ??= new TicketMetrics;
    }

    public function create(Commands\CreateTicket $command): static
    {
        return $this->recordThat(new Events\TicketCreated(
            uuid: $this->uuid(),
            categoryUuid: $command->categoryUuid,
            operatorUuid: $command->operatorUuid,
            meta: $command->meta + static::getCategoryData($command->categoryUuid),
        ));
    }

    protected function applyTicketCreated(Events\TicketCreated $event): void
    {
        $this->categoryUuid = $event->categoryUuid;
        $this->operatorUuid = $event->operatorUuid;
        $this->meta = $event->meta;
    }

    public function close(Commands\CloseTicket $command): static
    {
        return $this->recordThat(new Events\TicketClosed(
            uuid: $this->uuid(),
        ));
    }

    protected function applyTicketClosed(Events\TicketClosed $event): void {}

    public function changeCategory(Commands\ChangeTicketCategory $command): static
    {
        return $this->recordThat(new Events\TicketCategoryChanged(
            uuid: $this->uuid(),
            categoryUuid: $command->categoryUuid,
            meta: static::getCategoryData($command->categoryUuid),
        ));
    }

    protected function applyTicketCategoryChanged(Events\TicketCategoryChanged $event): void
    {
        $this->categoryUuid = $event->categoryUuid;
        $this->meta = array_merge($this->meta, $event->meta);
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
        $this->meta[$event->key] = $event->value;
    }

    public function mergeMetaValues(Commands\MergeTicketMetaValues $command): static
    {
        return $this->recordThat(new Events\TicketMetaValuesMerged(
            uuid: $this->uuid(),
            meta: $command->meta,
        ));
    }

    protected function applyTicketMetaValuesMerged(Events\TicketMetaValuesMerged $event): void
    {
        $this->meta = array_merge($this->meta, $event->meta);
    }

    public function adjustMetrics(Commands\AdjustTicketMetrics $command): static
    {
        return $this->recordThat(new Events\TicketMetricsAdjusted(
            uuid: $this->uuid(),
            factorUuid: $command->factorUuid,
            adjustments: $command->adjustments,
        ));
    }

    protected function applyTicketMetricsAdjusted(Events\TicketMetricsAdjusted $event): void
    {
        $this->perFactorMetrics[$event->factorUuid] = $event->adjustments;

        $this->metrics->adjust($event->adjustments);
    }

    public function bind(Commands\BindTicket $command): static
    {
        return $this->recordThat(new Events\TicketBound(
            uuid: $this->uuid(),
            operatorUuid: $command->operatorUuid,
            meta: $command->meta,
        ));
    }

    protected function applyTicketBound(Events\TicketBound $event): void
    {
        $this->operatorUuid = $event->operatorUuid;
        $this->meta = array_merge($this->meta, $event->meta);
        $this->accepted = false;
    }

    public function accept(Commands\AcceptTicket $command): static
    {
        return $this->recordThat(new Events\TicketAccepted(
            uuid: $this->uuid(),
        ));
    }

    protected function applyTicketAccepted(Events\TicketAccepted $event): void
    {
        $this->accepted = true;
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
        $this->accepted = false;
    }

    /**
     * @return array{category_name: string, category_short: string}
     */
    protected static function getCategoryData(string $categoryUuid): array
    {
        static $categoryDataCache;

        $categoryDataCache ??= TicketCategory::all(['uuid', 'name', 'short'])
            ->keyBy('uuid')->map->only(['name', 'short'])->all();

        /** @var array{category_name: string, category_short: string} */
        return Arr::prependKeysWith($categoryDataCache[$categoryUuid], 'category_');
    }
}
