<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Response;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketController extends Controller
{
    /**
     * Adjust ticket weight.
     */
    public function weight(
        Actions\IncrementTicketInitialWeightAction $incrementTicketInitialWeight,
        Actions\DecrementTicketInitialWeightAction $decrementTicketInitialWeight,
        Ticket $ticket,
        Request $request,
    ): JsonResponse {
        $weightPoints = $request->weight_points;

        if ($weightPoints > 0) {
            $incrementTicketInitialWeight($ticket, $weightPoints);
        } elseif ($weightPoints < 0) {
            $decrementTicketInitialWeight($ticket, -$weightPoints);
        }

        return Response::json($weightPoints);
    }

    /**
     * Bind or unbind ticket.
     */
    public function handler(
        Actions\BindTicketAction $bindTicket,
        Actions\UnbindTicketAction $unbindTicket,
        Ticket $ticket,
        Request $request,
    ): JsonResponse {
        $handler = Operator::find($request->operator_uuid);

        if ($handler) {
            $bindTicket($ticket, $handler);
        } else {
            $unbindTicket($ticket);
        }

        return Response::json($handler?->getKey());
    }

    /**
     * Close ticket.
     */
    public function close(Actions\CloseTicketAction $closeTicket, Ticket $ticket): \Illuminate\Http\Response
    {
        $closeTicket($ticket);

        return Response::noContent();
    }
}
