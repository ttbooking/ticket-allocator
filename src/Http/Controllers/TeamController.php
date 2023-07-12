<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Http\Requests\StoreOperatorTeamRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateOperatorTeamRequest;
use TTBooking\TicketAllocator\Http\Resources\OperatorResource;
use TTBooking\TicketAllocator\Http\Resources\OperatorTeamResource;
use TTBooking\TicketAllocator\Models\OperatorTeam;
use TTBooking\TicketAllocator\TicketAllocator;

class TeamController extends Controller
{
    /**
     * Display a listing of the operator teams.
     */
    public function index(): InertiaResponse
    {
        $teams = OperatorTeamResource::collection(OperatorTeam::withTrashed()->get())->resolve();

        return Inertia::render('OperatorTeam/Index', compact('teams'));
    }

    /**
     * Show the form for creating a new operator team.
     */
    public function create(): InertiaResponse
    {
        $operators = OperatorResource::collection(Operator::all())->resolve();
        $matchers = TicketAllocator::matchers()->mapWithKeys(
            /** @param class-string<MatcherContract> $matcher */
            static fn (string $matcher, string $alias) => [Str::plural($alias) => app($matcher)->getProps()]
        );

        return Inertia::render('OperatorTeam/CreateEdit', compact('operators', 'matchers'));
    }

    /**
     * Store a newly created operator team in storage.
     */
    public function store(StoreOperatorTeamRequest $request): RedirectResponse
    {
        /** @var OperatorTeam $team */
        $team = OperatorTeam::query()->create($request->safe(['name', 'description', 'weight', 'matching']));
        $request->validated('active') ? $team->restore() : $team->delete();
        $team->operators()->sync($request->validated('operators'));

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }

    /**
     * Display the specified operator team.
     */
    public function show(OperatorTeam $team): InertiaResponse
    {
        $team = new OperatorTeamResource($team->load('operators'));

        return Inertia::render('OperatorTeam/Show', compact('team'));
    }

    /**
     * Show the form for editing the specified operator team.
     */
    public function edit(OperatorTeam $team): InertiaResponse
    {
        $team = new OperatorTeamResource($team->load('operators'));
        $operators = OperatorResource::collection(Operator::all())->resolve();
        $matchers = TicketAllocator::matchers()->mapWithKeys(
            /** @param class-string<MatcherContract> $matcher */
            static fn (string $matcher, string $alias) => [Str::plural($alias) => app($matcher)->getProps()]
        );

        return Inertia::render('OperatorTeam/CreateEdit', compact('team', 'operators', 'matchers'));
    }

    /**
     * Update the specified operator team in storage.
     */
    public function update(UpdateOperatorTeamRequest $request, OperatorTeam $team): RedirectResponse
    {
        if (! is_null($active = $request->validated('active'))) {
            $active ? $team->restore() : $team->delete();
        }

        $team->update($request->safe(['name', 'description', 'weight', 'matching']));

        if (! is_null($operators = $request->validated('operators'))) {
            $team->operators()->sync($operators);
        }

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }

    /**
     * Remove the specified operator team from storage.
     */
    public function destroy(OperatorTeam $team): RedirectResponse
    {
        $team->forceDelete();

        return Response::redirectToRoute('ticket-allocator.teams.index', status: 303);
    }
}
