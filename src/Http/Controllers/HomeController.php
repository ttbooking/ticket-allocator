<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class HomeController extends Controller
{
    /**
     * Single page application catch-all route.
     */
    public function index(): Response
    {
        $operators = Operator::all()->toArray();
        $tickets = Ticket::all()->toArray();

        return Inertia::render('Dashboard', compact('operators', 'tickets'));
    }
}
