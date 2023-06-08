<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use Illuminate\Database\Query\Builder;

interface Matcher
{
    public static function setAlias(string $alias): void;

    public static function getAlias(): string;

    public static function getName(): string;

    public static function isExcluded(): bool;

    public function qualify(Builder $query, string $operator, mixed $value): Builder;
}
