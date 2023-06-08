<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Matchers;

use Illuminate\Database\Query\Builder;

#[Attributes\Excluded]
class Unknown extends Matcher
{
    public function qualify(Builder $query, string $operator, mixed $value): Builder
    {
        return $query;
    }
}
