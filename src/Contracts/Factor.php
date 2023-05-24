<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use Illuminate\Support\Enumerable;
use Spatie\LaravelData\Contracts\DataCollectable;
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

    /**
     * @return class-string<TFactorConfig>
     */
    public static function getConfigClass(): string;

    /**
     * @param  Enumerable|array  $config
     * @return TFactorConfig|DataCollectable<array-key, TFactorConfig>
     */
    public static function makeConfig(Enumerable|array $config);

    public static function getComponentName(): ?string;

    public function getProps(): array;

    /**
     * @param  TFactorConfig|DataCollectable<array-key, TFactorConfig>  $config
     * @return $this
     */
    public function configure($config): static;

    /**
     * @return TFactorConfig|DataCollectable<array-key, TFactorConfig>
     */
    public function getConfig();

    public function getAdjustments(TicketAggregateRoot $ticket): TicketMetrics;
}
