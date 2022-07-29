<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Single page application catch-all route.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Dashboard');

        /*return view('ticket-allocator::layout', [
            'ticketAllocatorScriptVariables' => [
                'path' => config('ticket-allocator.path'),
            ],
        ]);*/
    }
}
