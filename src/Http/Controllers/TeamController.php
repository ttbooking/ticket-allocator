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

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $operatorTeams = OperatorTeam::all()->toArray();

        return Inertia::render('OperatorTeam/Index', compact('operatorTeams'));
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
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $operatorTeam
     * @return \Illuminate\Http\Response
     */
    public function show(OperatorTeam $operatorTeam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $operatorTeam
     * @return InertiaResponse
     */
    public function edit(OperatorTeam $operatorTeam): InertiaResponse
    {
        return Inertia::render('OperatorTeam/Edit', compact('operatorTeam'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest  $request
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $operatorTeam
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOperatorTeamRequest $request, OperatorTeam $operatorTeam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \TTBooking\TicketAllocator\Models\OperatorTeam  $operatorTeam
     * @return \Illuminate\Http\Response
     */
    public function destroy(OperatorTeam $operatorTeam)
    {
        $operatorTeam->delete();

        return Response::noContent();
    }
}
