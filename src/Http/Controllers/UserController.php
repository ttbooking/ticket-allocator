<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    /**
     * Retrieve users with operator privileges.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        /** @var callable():Builder $operatorScope */
        $operatorScope = config('ticket-allocator.operator-scope');

        return Response::json($operatorScope()->get());
    }
}
