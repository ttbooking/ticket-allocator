<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest;
use TTBooking\TicketAllocator\Models\OperatorTeam;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TeamController extends Controller
{
    /**
     * Display a listing of the operator teams.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $teams = OperatorTeam::withTrashed()->get();

        return Inertia::render('OperatorTeam/Index', compact('teams'));
    }

    /**
     * Show the form for creating a new operator team.
     *
     * @return InertiaResponse
     */
    public function create(): InertiaResponse
    {
        $operators = Operator::all();
        $ticketCategories = TicketCategory::all();

        return Inertia::render('OperatorTeam/CreateEdit', compact('operators', 'ticketCategories'));
    }

    /**
     * Store a newly created operator team in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest  $request
     * @return RedirectResponse
     */
    public function store(StoreOperatorTeamRequest $request): RedirectResponse
    {
        /** @var OperatorTeam $team */
        $team = OperatorTeam::query()->create($request->safe(['name', 'description']));
        $request->validated('active') ? $team->restore() : $team->delete();
        $team->operators()->sync($request->validated('operators'));
        $team->ticketCategories()->sync($request->validated('ticket_categories'));

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }

    /**
     * Display the specified operator team.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return InertiaResponse
     */
    public function show(OperatorTeam $team): InertiaResponse
    {
        return Inertia::render('OperatorTeam/Show', compact('team'));
    }

    /**
     * Show the form for editing the specified operator team.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return InertiaResponse
     */
    public function edit(OperatorTeam $team): InertiaResponse
    {
        $operators = Operator::all();
        $ticketCategories = TicketCategory::all();

        return Inertia::render('OperatorTeam/CreateEdit', compact('team', 'operators', 'ticketCategories'));
    }

    /**
     * Update the specified operator team in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest  $request
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return RedirectResponse
     */
    public function update(UpdateOperatorTeamRequest $request, OperatorTeam $team): RedirectResponse
    {
        if (! is_null($active = $request->validated('active'))) {
            $active ? $team->restore() : $team->delete();
        }

        $team->update($request->safe(['name', 'description']));

        if (! is_null($operators = $request->validated('operators'))) {
            $team->operators()->sync($operators);
        }

        if (! is_null($ticketCategories = $request->validated('ticket_categories'))) {
            $team->ticketCategories()->sync($ticketCategories);
        }

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }

    /**
     * Remove the specified operator team from storage.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return RedirectResponse
     */
    public function destroy(OperatorTeam $team): RedirectResponse
    {
        $team->forceDelete();

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }
}
