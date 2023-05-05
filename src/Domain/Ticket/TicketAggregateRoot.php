<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket;

use Illuminate\Support\Arr;
use Spatie\EventSourcing\AggregateRoots\AggregateRoot;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Models\Factor;
use TTBooking\TicketAllocator\Models\TicketCategory;

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

    // TODO: group by factors? Return magic sum?

    public string $categoryUuid;

    /** @var array<string, mixed> */
    public array $meta = [];

    /** @var array<string, array<string, int>> */
    public array $perFactorMetrics = [];

    /** @var array<string, int> */
    public array $metrics = [];

    public ?string $operatorUuid;

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

        $this->applyFactors();
    }

    protected function applyFactors(): void
    {
        Factor::query()
            ->orderBy('priority')
            ->get(['uuid', 'type', 'config'])
            ->pluck('instance', 'uuid')
            ->each(function (FactorContract $factor, string $uuid) {
                $adjustments = $factor->getAdjustments($this);
                $this->adjustMetrics(new Commands\AdjustTicketMetrics($this->uuid(), $uuid, $adjustments));
            });
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

        foreach ($event->adjustments as $metric => $adjustment) {
            $this->metrics[$metric] = max(0, ($this->metrics[$metric] ?? 0) + $adjustment);
        }
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

    /**
     * @param  string  $categoryUuid
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
