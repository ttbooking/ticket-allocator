<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
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
     * @param  bool  $ready
     * @return JsonResponse
     */
    public function ready(Operator $operator, bool $ready): JsonResponse
    {
        $ready
            ? app(SetOperatorReadyAction::class)($operator)
            : app(SetOperatorNotReadyAction::class)($operator);

        return Response::json($ready);
    }

    /**
     * Adjust ticket weight.
     *
     * @param  Ticket  $ticket
     * @param  int  $weightPoints
     * @return JsonResponse
     */
    public function weight(Ticket $ticket, int $weightPoints): JsonResponse
    {
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
     * @param  Operator|null  $handler
     * @return JsonResponse
     */
    public function handler(Ticket $ticket, ?Operator $handler): JsonResponse
    {
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
