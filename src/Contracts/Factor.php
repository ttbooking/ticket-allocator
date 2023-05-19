<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

interface Factor
{
    public static function setAlias(string $alias): void;

    public static function getAlias(): string;

    public static function getName(): string;

    public static function isHidden(): bool;

    public static function isSingular(): bool;

    public static function getComponentName(): ?string;

    public function getProps(): array;

    /**
     * @param  array  $config
     * @return $this
     */
    public function configure(array $config): static;

    public function getConfig(): array;

    public function getAdjustments(TicketAggregateRoot $ticket): array;
}
