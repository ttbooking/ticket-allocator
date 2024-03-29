<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Concerns\MayHaveOperatorPrivileges;
use TTBooking\TicketAllocator\Domain\Operator\Actions;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Http\Requests\StoreOperatorRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateOperatorRequest;
use TTBooking\TicketAllocator\Http\Resources\OperatorResource;
use TTBooking\TicketAllocator\Http\Resources\OperatorTeamResource;
use TTBooking\TicketAllocator\Http\Resources\UserResource;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class OperatorController extends Controller
{
    /**
     * Display a listing of the operators.
     */
    public function index(): InertiaResponse
    {
        $operators = OperatorResource::collection(Operator::all()->load('user'))->resolve();

        return Inertia::render('Operator/Index', compact('operators'));
    }

    /**
     * Show the form for creating a new operator.
     */
    public function create(): InertiaResponse
    {
        /** @var class-string<MayHaveOperatorPrivileges> $userClass */
        $userClass = config('ticket-allocator.operator_source');
        $userQuery = $userClass::eligibleToProcessTickets()->doesntHave('operator');

        $users = UserResource::collection($userQuery->get(['id', 'name']))->resolve();
        $teams = OperatorTeamResource::collection(OperatorTeam::withTrashed()->get())->resolve();

        return Inertia::render('Operator/CreateEdit', compact('users', 'teams'));
    }

    /**
     * Store a newly created operator in storage.
     */
    public function store(
        StoreOperatorRequest $request,
        Actions\EnrollOperatorAction $enrollOperator,
        Actions\ChangeOperatorNameAction $changeOperatorName,
        Actions\AdjustOperatorTicketLimitAction $adjustOperatorTicketLimit,
        Actions\AdjustOperatorComplexityLimitAction $adjustOperatorComplexityLimit,
    ): RedirectResponse {
        $input = $request->safe();
        $operator = $enrollOperator($input->user);
        $changeOperatorName($operator, $input->name);
        $adjustOperatorTicketLimit($operator, $input->ticket_limit);
        $adjustOperatorComplexityLimit($operator, $input->complexity_limit);
        $operator->teams()->sync($input->teams);

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Display the specified operator.
     */
    public function show(Operator $operator): InertiaResponse
    {
        $operator = new OperatorResource($operator->load('user', 'teams'));

        return Inertia::render('Operator/Show', compact('operator'));
    }

    /**
     * Show the form for editing the specified operator.
     */
    public function edit(Operator $operator): InertiaResponse
    {
        $operator = new OperatorResource($operator->load('user', 'teams'));
        $teams = OperatorTeamResource::collection(OperatorTeam::withTrashed()->get())->resolve();

        return Inertia::render('Operator/CreateEdit', compact('operator', 'teams'));
    }

    /**
     * Update the specified operator in storage.
     */
    public function update(
        UpdateOperatorRequest $request,
        Operator $operator,
        Actions\ChangeOperatorNameAction $changeOperatorName,
        Actions\AdjustOperatorTicketLimitAction $adjustOperatorTicketLimit,
        Actions\AdjustOperatorComplexityLimitAction $adjustOperatorComplexityLimit,
    ): RedirectResponse {
        $input = $request->safe();
        $changeOperatorName($operator, $input->name);
        $adjustOperatorTicketLimit($operator, $input->ticket_limit);
        $adjustOperatorComplexityLimit($operator, $input->complexity_limit);
        $operator->teams()->sync($input->teams);

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Remove the specified operator from storage.
     */
    public function destroy(Operator $operator, Actions\ResignOperatorAction $resignOperator): RedirectResponse
    {
        $resignOperator($operator);

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Discover users with operator privileges and store them as operators.
     */
    public function discover(Actions\EnrollOperatorAction $enrollOperator): RedirectResponse
    {
        /** @var class-string<MayHaveOperatorPrivileges> $userClass */
        $userClass = config('ticket-allocator.operator_source');

        $userClass::eligibleToProcessTickets()->doesntHave('operator')
            ->each(static fn ($user) => $enrollOperator($user));

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Set operator readiness status.
     */
    public function ready(
        Actions\SetOperatorReadyAction $setOperatorReady,
        Actions\SetOperatorNotReadyAction $setOperatorNotReady,
        Operator $operator,
        Request $request,
    ): JsonResponse {
        $request->ready ? $setOperatorReady($operator) : $setOperatorNotReady($operator);

        return Response::json($request->ready);
    }
}
