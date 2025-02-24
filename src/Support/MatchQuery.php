<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\TicketMatch;
use TTBooking\TicketAllocator\TicketAllocator;

class MatchQuery
{
    public static function make(): Builder
    {
        [
            'ticket_aggregate' => $tagg,
            'operator_aggregate' => $oagg,
            'pivot' => $pivot,
        ] = config('ticket-allocator.adjustments');

        return DB::query()

            // выборка пар оператор/тикет
            ->select('o.uuid as operator_uuid', 't.uuid as ticket_uuid')
            ->fromSub(

                // из подмножества тикетов...
                Ticket::query()
                    // тикет не закреплён, резервация не ограничена по времени либо время резервации вышло
                    ->where(static fn (EloquentBuilder $query) => $query
                        ->whereNull('handler_uuid')
                        ->orWhereNull('accepted_at')
                        ->whereNotNull('reserved_until')
                        ->where('reserved_until', '<=', DB::raw('NOW()'))
                    )
                    // тикет не задержан либо время задержки вышло
                    ->where('delayed_until', '<=', DB::raw('NOW()')),
                    // в порядке убывания веса
                    //->orderByRaw('initial_weight + TIMESTAMPDIFF(SECOND, created_at, NOW()) * weight_increment DESC'),

                't'

            )->joinSub(

                // ... и операторов
                Operator::query()
                    ->select('o.*', 'tm.weight', 'tm.matching')
                    ->from('ticket_allocator_operators', 'o')
                    // с учётом команд, в которые они входят
                    ->join('ticket_allocator_team_operator as tmo', 'tmo.operator_uuid', 'o.uuid')
                    ->join('ticket_allocator_operator_teams as tm', static fn (JoinClause $join) => $join
                        ->on(static fn (Builder $query) => $query->whereNull('tm.deleted_at'))
                        ->on('tmo.team_uuid', 'tm.uuid')
                    )
                    // оператор онлайн и готов к работе
                    ->where('online', true)
                    ->where('ready', true),
                    // в порядке убывания числа свободных слотов и единиц сложности
                    //->orderByDesc('free_slots')
                    //->orderByDesc('free_complexity'),

                'o',

                // с условием, что...
                static fn (JoinClause $join) => $join->on(static fn (Builder $query) => $query
                    // тикет не закреплён либо закреплён за другим оператором
                    ->where(static fn (Builder $query) => $query
                        ->whereNull('t.handler_uuid')
                        ->orWhereColumn('t.handler_uuid', '<>', 'o.uuid')
                    )
                    // тикет удовлетворяет всем правилам матчинга команды
                    ->tap(static fn (Builder $query) => TicketAllocator::matchers()->each(
                        static fn (string $matcher) => $query->where(
                            static fn (Builder $query) => app($matcher)->qualify($query)
                        )
                    ))
                )

            // и учётом персональных поправок
            )->leftJoinSub(

                TicketMatch::query()
                    ->select(
                        "meta->$pivot",
                        "$oagg(ticket_limit) as ticket_limit",
                        "$oagg(complexity_limit) as complexity_limit",
                    )
                    ->groupBy("meta->$pivot"),

                'm',

                static fn (JoinClause $join) => $join
                    ->on('m.operator_uuid', 'o.uuid')
                    ->on("m.meta->$pivot", "t.meta->$pivot")

            )

            // у оператора есть свободные слоты
            ->where(static fn (Builder $query) => $query
                ->whereNull('o.free_slots')
                ->orWhere(DB::raw('o.free_slots + IFNULL(m.ticket_limit, 0)'), '>', 0)
            )

            // свободных единиц сложности достаточно для тикета
            ->where(static fn (Builder $query) => $query
                ->whereNull('o.free_complexity')
                ->orWhereColumn('t.complexity', '<=', DB::raw('o.free_complexity + IFNULL(m.complexity_limit, 0)'))
            )

            // в порядке убывания веса заявки
            ->orderByRaw('t.initial_weight + TIMESTAMPDIFF(SECOND, t.created_at, NOW()) * t.weight_increment DESC')

            // в порядке убывания числа свободных слотов и единиц сложности оператора
            //->orderByDesc('o.free_slots')
            //->orderByDesc('o.free_complexity')

            // учитывая вес команды, в которую входит оператор
            ->orderByDesc('o.weight')

            // в порядке возрастания числа закреплённых тикетов
            ->orderBy('o.bound_tickets')

            // в порядке возрастания времени последней привязки
            ->orderBy('o.last_bound_at')

            // взять первую пару
            ->take(1);
    }
}
