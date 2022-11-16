<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class HomeController extends Controller
{
    /**
     * Single page application catch-all route.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        //$unboundTickets = Ticket::unbound()->get()->toArray();
        //$operatorsWithTickets = Operator::with('tickets')->get()->toArray();

        $tickets = Ticket::all()->toArray();
        $operators = Operator::all()->toArray();

        return Inertia::render('Dashboard', [
            'tickets' => $tickets, //$unboundTickets,
            'operators' => $operators, //$operatorsWithTickets,
        ]);
    }
}
