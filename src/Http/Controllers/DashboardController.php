<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
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
