<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
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
        $teams = OperatorTeam::all();

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

        return Inertia::render('OperatorTeam/Create', compact('operators', 'ticketCategories'));
    }

    /**
     * Store a newly created operator team in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest  $request
     * @return JsonResponse
     */
    public function store(StoreOperatorTeamRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $team = new OperatorTeam;
        $team->name = $validated['name'];
        $team->description = $validated['description'];
        $team->operators()->sync($validated['operators']);
        $team->ticketCategories()->sync($validated['ticket_categories']);
        $team->save();

        return Response::json($team);
    }

    /**
     * Display the specified operator team.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return JsonResponse
     */
    public function show(OperatorTeam $team): JsonResponse
    {
        // TODO: remove?
        return Response::json($team);
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

        return Inertia::render('OperatorTeam/Edit', compact('team', 'operators', 'ticketCategories'));
    }

    /**
     * Update the specified operator team in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest  $request
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return JsonResponse
     */
    public function update(UpdateOperatorTeamRequest $request, OperatorTeam $team): JsonResponse
    {
        $validated = $request->validated();

        $team->name = $validated['name'];
        $team->description = $validated['description'];
        $team->operators()->sync($validated['operators']);
        $team->ticketCategories()->sync($validated['ticket_categories']);
        $team->save();

        return Response::json($team);
    }

    /**
     * Remove the specified operator team from storage.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(OperatorTeam $team): \Illuminate\Http\Response
    {
        $team->delete();

        return Response::noContent();
    }
}
