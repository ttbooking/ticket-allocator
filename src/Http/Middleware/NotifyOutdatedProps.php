<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use TTBooking\TicketAllocator\TicketAllocator;

class NotifyOutdatedProps
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        TicketAllocator::actualizeProps();

        return $response;
    }
}
