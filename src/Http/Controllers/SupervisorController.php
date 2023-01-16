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
     * @param  Operator  $operator
     * @param  Request  $request
     * @return JsonResponse
     */
    public function ready(Operator $operator, Request $request): JsonResponse
    {
        $ready = $request->ready;

        $ready
            ? app(SetOperatorReadyAction::class)($operator)
            : app(SetOperatorNotReadyAction::class)($operator);

        return Response::json($ready);
    }

    /**
     * Adjust ticket weight.
     *
     * @param  Ticket  $ticket
     * @param  Request  $request
     * @return JsonResponse
     */
    public function weight(Ticket $ticket, Request $request): JsonResponse
    {
        $weightPoints = $request->weight_points;

        if ($weightPoints > 0) {
            app(Actions\IncrementTicketInitialWeightAction::class)($ticket, $weightPoints);
        } elseif ($weightPoints < 0) {
            app(Actions\DecrementTicketInitialWeightAction::class)($ticket, -$weightPoints);
        }

        return Response::json($weightPoints);
    }

    /**
     * Bind or unbind ticket.
     *
     * @param  Ticket  $ticket
     * @param  Request  $request
     * @return JsonResponse
     */
    public function handler(Ticket $ticket, Request $request): JsonResponse
    {
        $handler = Operator::find($request->operator_uuid);

        if ($handler) {
            app(Actions\BindTicketAction::class)($ticket, $handler);
        } else {
            app(Actions\UnbindTicketAction::class)($ticket);
        }

        return Response::json($handler?->getKey());
    }

    /**
     * Close ticket.
     *
     * @param  Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function close(Ticket $ticket): \Illuminate\Http\Response
    {
        app(Actions\CloseTicketAction::class)($ticket);

        return Response::noContent();
    }
}
