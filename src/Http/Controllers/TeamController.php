<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest;
use TTBooking\TicketAllocator\Models\OperatorTeam;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $teams = OperatorTeam::all()->toArray();

        return Inertia::render('OperatorTeam/Index', compact('teams'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return InertiaResponse
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('OperatorTeam/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOperatorTeamRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return \Illuminate\Http\Response
     */
    public function show(OperatorTeam $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return InertiaResponse
     */
    public function edit(OperatorTeam $team): InertiaResponse
    {
        $categories = TicketCategory::all()->toArray();

        return Inertia::render('OperatorTeam/Edit', compact('team', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest  $request
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOperatorTeamRequest $request, OperatorTeam $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(OperatorTeam $team)
    {
        $team->delete();

        return Response::noContent();
    }
}
