<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

interface Matcher
{
    public static function setAlias(string $alias): void;

    public static function getAlias(): string;

    public static function getName(): string;

    public static function isExcluded(): bool;
}
