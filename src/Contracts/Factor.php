<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;
use TTBooking\TicketAllocator\DTO\TicketMetrics;

/**
 * @template TFactorConfig of FactorConfig
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

    public function getProps(): array;

    /**
     * @param  TFactorConfig  $config
     * @return $this
     */
    public function configure($config): static;

    /**
     * @return TFactorConfig
     */
    public function getConfig();

    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics;
}
