<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @template TConfig of array
 */
interface Factor
{
    public static function setAlias(string $alias): void;

    public static function getAlias(): string;

    public static function getName(): string;

    public static function isExcluded(): bool;

    public static function isHidden(): bool;

    public static function isSingular(): bool;

    public static function getComponentName(): ?string;

    /**
     * @return Collection<int, array{
     *     uuid: string|null,
     *     priority: int,
     *     type: string,
     *     name: string|null,
     *     description: string|null,
     *     config: array|null,
     *     enable: bool,
     * }>
     */
    public static function getInstanceData(): Collection;

    public function getProps(): array;

    /**
     * @param  TConfig  $config
     * @return $this
     */
    public function configure($config): static;

    /**
     * @return TConfig
     */
    public function getConfig(): array;

    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics;
}
