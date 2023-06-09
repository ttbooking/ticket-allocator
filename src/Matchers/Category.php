<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Matchers;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use TTBooking\TicketAllocator\Models\TicketCategory;

class Category extends Matcher
{
    public static function getProps(): array
    {
        TicketCategory::all(['uuid', 'name'])->pluck('name', 'uuid');
    }

    public static function qualify(Builder $query): Builder
    {
        return $query->whereJsonContains('o.matching->categories', DB::raw('json_quote(t.category_uuid)'));
    }
}
