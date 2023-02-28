<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
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
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $operators = OperatorResource::collection(Operator::all())->resolve();

        return Inertia::render('Operator/Index', compact('operators'));
    }

    /**
     * Show the form for creating a new operator.
     *
     * @return InertiaResponse
     */
    public function create(): InertiaResponse
    {
        /** @var Builder $userQuery */
        $userQuery = call_user_func(config('ticket-allocator.operator_source'));
        $users = UserResource::collection($userQuery->get(['id', 'name']))->resolve();
        $teams = OperatorTeamResource::collection(OperatorTeam::all())->resolve();

        return Inertia::render('Operator/CreateEdit', compact('users', 'teams'));
    }

    /**
     * Store a newly created operator in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\StoreOperatorRequest  $request
     * @param  Actions\EnrollOperatorAction  $enrollOperator
     * @param  Actions\ChangeOperatorNameAction  $changeOperatorName
     * @param  Actions\AdjustOperatorTicketLimitAction  $adjustOperatorTicketLimit
     * @param  Actions\AdjustOperatorComplexityLimitAction  $adjustOperatorComplexityLimit
     * @param  Actions\SetOperatorTeamsAction  $setOperatorTeams
     * @return RedirectResponse
     */
    public function store(
        StoreOperatorRequest $request,
        Actions\EnrollOperatorAction $enrollOperator,
        Actions\ChangeOperatorNameAction $changeOperatorName,
        Actions\AdjustOperatorTicketLimitAction $adjustOperatorTicketLimit,
        Actions\AdjustOperatorComplexityLimitAction $adjustOperatorComplexityLimit,
        Actions\SetOperatorTeamsAction $setOperatorTeams,
    ): RedirectResponse {
        $operator = $enrollOperator($request->validated('user'));
        $changeOperatorName($operator, $request->validated('name'));
        $adjustOperatorTicketLimit($operator, $request->validated('ticket_limit'));
        $adjustOperatorComplexityLimit($operator, $request->validated('complexity_limit'));
        $setOperatorTeams($operator, $request->validated('teams'));

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Display the specified operator.
     *
     * @param  \TTBooking\TicketAllocator\Domain\Operator\Projections\Operator  $operator
     * @return InertiaResponse
     */
    public function show(Operator $operator): InertiaResponse
    {
        $operator = new OperatorResource($operator->load('user', 'teams'));

        return Inertia::render('Operator/Show', compact('operator'));
    }

    /**
     * Show the form for editing the specified operator.
     *
     * @param  \TTBooking\TicketAllocator\Domain\Operator\Projections\Operator  $operator
     * @return InertiaResponse
     */
    public function edit(Operator $operator): InertiaResponse
    {
        $operator = new OperatorResource($operator->load('user', 'teams'));
        $teams = OperatorTeamResource::collection(OperatorTeam::all())->resolve();

        return Inertia::render('Operator/CreateEdit', compact('operator', 'teams'));
    }

    /**
     * Update the specified operator in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateOperatorRequest  $request
     * @param  \TTBooking\TicketAllocator\Domain\Operator\Projections\Operator  $operator
     * @param  Actions\ChangeOperatorNameAction  $changeOperatorName
     * @param  Actions\AdjustOperatorTicketLimitAction  $adjustOperatorTicketLimit
     * @param  Actions\AdjustOperatorComplexityLimitAction  $adjustOperatorComplexityLimit
     * @param  Actions\SetOperatorTeamsAction  $setOperatorTeams
     * @return RedirectResponse
     */
    public function update(
        UpdateOperatorRequest $request,
        Operator $operator,
        Actions\ChangeOperatorNameAction $changeOperatorName,
        Actions\AdjustOperatorTicketLimitAction $adjustOperatorTicketLimit,
        Actions\AdjustOperatorComplexityLimitAction $adjustOperatorComplexityLimit,
        Actions\SetOperatorTeamsAction $setOperatorTeams,
    ): RedirectResponse {
        $changeOperatorName($operator, $request->validated('name'));
        $adjustOperatorTicketLimit($operator, $request->validated('ticket_limit'));
        $adjustOperatorComplexityLimit($operator, $request->validated('complexity_limit'));
        $setOperatorTeams($operator, $request->validated('teams'));

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }

    /**
     * Remove the specified operator from storage.
     *
     * @param  \TTBooking\TicketAllocator\Domain\Operator\Projections\Operator  $operator
     * @param  Actions\ResignOperatorAction  $resignOperator
     * @return RedirectResponse
     */
    public function destroy(Operator $operator, Actions\ResignOperatorAction $resignOperator): RedirectResponse
    {
        $resignOperator($operator);

        return Response::redirectToRoute('ticket-allocator.operators.index', status: 303);
    }
}
