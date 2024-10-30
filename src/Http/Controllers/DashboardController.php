<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use TTBooking\TicketAllocator\Concerns\MayHaveOperatorPrivileges;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Http\Resources\FactorResource;
use TTBooking\TicketAllocator\Models\Factor;
use TTBooking\TicketAllocator\Models\TicketCategory;
use TTBooking\TicketAllocator\TicketAllocator;

class DashboardController extends Controller
{
    public function index(): RedirectResponse
    {
        return to_route('ticket-allocator.dashboard.supervisor');
    }

    /**
     * Display personal dashboard.
     */
    public function personal(): Response
    {
        /** @var class-string<MayHaveOperatorPrivileges> $userClass */
        $userClass = config('ticket-allocator.operator_source');
        $user = $userClass::query()->findOrFail(Auth::id());

        $operator = $user->operator()->firstOrFail()->toArray();
        $tickets = Ticket::all()->toArray();
        $columns = config('ticket-allocator.ticket_columns', []);

        return Inertia::render('Personal', compact('operator', 'tickets', 'columns'));
    }

    /**
     * Display supervisor dashboard.
     */
    public function supervisor(): Response
    {
        $operators = Operator::all()->toArray();
        $tickets = Ticket::all()->toArray();
        $ticketCategories = TicketCategory::all()->toArray();
        $factors = FactorResource::collection(
            Factor::withTrashed()->orderBy('priority')->get()->keyBy('uuid')
        )->resolve();
        $matchers = TicketAllocator::matchers()->mapWithKeys(
            /** @param  class-string<MatcherContract>  $matcher */
            static fn (string $matcher, string $alias) => [Str::plural($alias) => app($matcher)->getProps()]
        );

        return Inertia::render('Dashboard', compact('operators', 'tickets', 'ticketCategories', 'factors', 'matchers'));
    }

    public function trans(): Response
    {
        return Inertia::render('Trans/Index');
    }
}
