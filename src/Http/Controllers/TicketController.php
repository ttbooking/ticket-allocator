<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

class TicketController extends Controller
{
    /**
     * Adjust ticket weight.
     */
    public function weight(
        Actions\SetTicketMetaValueAction $setTicketMetaValue,
        Ticket $ticket,
        Request $request,
    ): JsonResponse {
        $weightPoints = $request->weight_points;

        $setTicketMetaValue($ticket, TicketAggregateRoot::META_METRIC_ADJUSTMENTS, [
            'initial_weight' => ($ticket->meta[TicketAggregateRoot::META_METRIC_ADJUSTMENTS]['initial_weight'] ?? 0)
                + $request->weight_points,
            'weight_increment' => 0,
            'complexity' => 0,
            'delay' => 0,
            'reservation' => 0,
        ]);

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
