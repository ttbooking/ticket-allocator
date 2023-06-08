<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Matchers;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

class Category extends Matcher
{
    public function qualify(Builder $query, string $operator, mixed $value): Builder
    {
        return $query->whereJsonContains('o.matching->categories', DB::raw('json_quote(t.category_uuid)'));
    }
}
