<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use TTBooking\TicketAllocator\Domain\Operator\Actions\SetOperatorNotReadyAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\SetOperatorReadyAction;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class SupervisorController extends Controller
{
    /**
     * Set operator readiness status.
     *
     * @param  SetOperatorReadyAction  $setOperatorReady
     * @param  SetOperatorNotReadyAction  $setOperatorNotReady
     * @param  Operator  $operator
     * @param  Request  $request
     * @return JsonResponse
     */
    public function ready(
        SetOperatorReadyAction $setOperatorReady,
        SetOperatorNotReadyAction $setOperatorNotReady,
        Operator $operator,
        Request $request
    ): JsonResponse {
        $request->ready ? $setOperatorReady($operator) : $setOperatorNotReady($operator);

        return Response::json($request->ready);
    }

    /**
     * Adjust ticket weight.
     *
     * @param  Actions\IncrementTicketInitialWeightAction  $incrementTicketInitialWeight
     * @param  Actions\DecrementTicketInitialWeightAction  $decrementTicketInitialWeight
     * @param  Ticket  $ticket
     * @param  Request  $request
     * @return JsonResponse
     */
    public function weight(
        Actions\IncrementTicketInitialWeightAction $incrementTicketInitialWeight,
        Actions\DecrementTicketInitialWeightAction $decrementTicketInitialWeight,
        Ticket $ticket,
        Request $request
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
     *
     * @param  Actions\BindTicketAction  $bindTicket
     * @param  Actions\UnbindTicketAction  $unbindTicket
     * @param  Ticket  $ticket
     * @param  Request  $request
     * @return JsonResponse
     */
    public function handler(
        Actions\BindTicketAction $bindTicket,
        Actions\UnbindTicketAction $unbindTicket,
        Ticket $ticket,
        Request $request
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
     *
     * @param  Actions\CloseTicketAction  $closeTicket
     * @param  Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function close(Actions\CloseTicketAction $closeTicket, Ticket $ticket): \Illuminate\Http\Response
    {
        $closeTicket($ticket);

        return Response::noContent();
    }
}
