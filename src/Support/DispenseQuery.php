<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class DispenseQuery
{
    public static function make(): Builder
    {
        return DB::query()->fromSub(

            Ticket::query()
                ->whereNull('handler_uuid')
                ->where('delayed_until', '<=', DB::raw('NOW()'))
                ->orderByDesc('weight'),

            't'

        )->joinSub(

            Operator::query()
                ->where('online', true)
                ->where('ready', true)
                ->where('free_slots', '>', 0)
                ->orderByDesc('free_slots')
                ->orderByDesc('free_complexity'),

            'o',

            static fn (JoinClause $join) => $join
                ->on('t.complexity', '<=', 'o.free_complexity')
                ->on(static fn (Builder $query) => $query
                    ->whereJsonContains('o.matching->categories', DB::raw('t.category_id'))
                )

        )->take(1);
    }
}
