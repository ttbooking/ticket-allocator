<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class MatchQuery
{
    public static function make(): Builder
    {
        return DB::query()

        // выборка пар оператор/тикет
        ->select('o.uuid as operator_uuid', 't.uuid as ticket_uuid')

        ->fromSub(

            // из подмножества тикетов...
            Ticket::query()
                // тикет не закреплён либо время резервации вышло
                ->where(static fn (EloquentBuilder $query) => $query
                    ->whereNull('handler_uuid')
                    ->orWhereNull('accepted_at')
                    ->where('reserved_until', '<=', DB::raw('NOW()'))
                )
                // тикет не задержан либо время задержки вышло
                ->where('delayed_until', '<=', DB::raw('NOW()'))
                // в порядке убывания веса
                ->orderByRaw('initial_weight + TIMESTAMPDIFF(SECOND, created_at, NOW()) * weight_increment DESC'),

            't'

        )->joinSub(

            // ... и операторов
            Operator::query()
                ->select('o.*', 'tm.matching')
                // с учётом команд, в которые он входит
                ->join('ticket_allocator_team_operator as tmo', 'tmo.operator_uuid', 'o.uuid')
                ->join('ticket_allocator_operator_teams as tm', 'tmo.team_uuid', 'tm.uuid')
                // оператор онлайн и готов к работе
                ->where('online', true)
                ->where('ready', true)
                // у оператора есть свободные слоты
                ->where(static fn (EloquentBuilder $query) => $query
                    ->whereNull('free_slots')
                    ->orWhere('free_slots', '>', 0)
                )
                // в порядке убывания числа свободных слотов и единиц сложности
                ->orderByDesc('free_slots')
                ->orderByDesc('free_complexity'),

            'o',

            // с условием, что...
            static fn (JoinClause $join) => $join->on(static fn (Builder $query) => $query
                // свободных единиц сложности достаточно для тикета
                ->where(static fn (Builder $query) => $query
                    ->whereNull('o.free_complexity')
                    ->orWhereColumn('t.complexity', '<=', 'o.free_complexity')
                )
                // тикет не закреплён либо закреплён за другим оператором
                ->where(static fn (Builder $query) => $query
                    ->whereNull('t.handler_uuid')
                    ->orWhereColumn('t.handler_uuid', '<>', 'o.uuid')
                )
                // оператору позволено работать с заданной категорией тикетов
                ->whereJsonContains('o.matching->category', DB::raw('json_quote(t.category_uuid)'))
            )

        )

        // взять первую пару
        ->take(1);
    }
}
