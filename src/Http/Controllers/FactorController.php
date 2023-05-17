<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Support\FactorDictionary;
use TTBooking\TicketAllocator\Http\Requests\StoreFactorRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateFactorRequest;
use TTBooking\TicketAllocator\Http\Resources\FactorResource;
use TTBooking\TicketAllocator\Http\Resources\FactorTypeResource;
use TTBooking\TicketAllocator\Models\Factor;

class FactorController extends Controller
{
    /**
     * Display a listing of the factors.
     */
    public function index(FactorDictionary $factorDictionary): InertiaResponse
    {
        $factors = FactorResource::collection(Factor::withTrashed()->orderBy('priority')->get())->resolve();
        $factorDictionary = FactorTypeResource::collection($factorDictionary->values())->resolve();

        return Inertia::render('Factor/Index', compact('factors', 'factorDictionary'));
    }

    /**
     * Show the form for creating a new factor.
     */
    public function create(FactorDictionary $factorDictionary, Request $request): InertiaResponse
    {
        $factorClass = $factorDictionary->get($request->query('type'), false);
        $factorType = new FactorTypeResource($factorClass);

        return Inertia::render('Factor/CreateEdit', compact('factorType') + app($factorClass)->getProps());
    }

    /**
     * Store a newly created factor in storage.
     */
    public function store(StoreFactorRequest $request): RedirectResponse
    {
        /** @var Factor $factor */
        $factor = Factor::query()->create($request->safe(['type', 'name', 'description', 'config']));
        $request->validated('active') ? $factor->restore() : $factor->delete();

        return Response::redirectToRoute('ticket-allocator.factors.index', status: 303);
    }

    /**
     * Display the specified factor.
     */
    public function show(Factor $factor): InertiaResponse
    {
        $factor = new FactorResource($factor);

        return Inertia::render('Factor/Show', compact('factor'));
    }

    /**
     * Show the form for editing the specified factor.
     */
    public function edit(Factor $factor): InertiaResponse
    {
        $factor = new FactorResource($factor);

        return Inertia::render('Factor/CreateEdit', compact('factor') + $factor->instance->getProps());
    }

    /**
     * Update the specified factor in storage.
     */
    public function update(UpdateFactorRequest $request, Factor $factor): RedirectResponse
    {
        if (! is_null($active = $request->validated('active'))) {
            $active ? $factor->restore() : $factor->delete();
        }

        $factor->update($request->safe(['name', 'description', 'config']));

        return Response::redirectToRoute('ticket-allocator.factors.index', status: 303);
    }

    /**
     * Remove the specified factor from storage.
     */
    public function destroy(Factor $factor): RedirectResponse
    {
        $factor->forceDelete();

        return Response::redirectToRoute('ticket-allocator.factors.index', status: 303);
    }

    /**
     * Raise the specified factor's priority.
     */
    public function raisePriority(Factor $factor, bool $lower = false): RedirectResponse
    {
        /** @var Factor|null $neighbor */
        $neighbor = Factor::withTrashed()
            ->where('priority', $lower ? '>' : '<', $factor->priority)
            ->orderBy('priority', $lower ? 'asc' : 'desc')
            ->first();

        if (! is_null($neighborPriority = $neighbor?->priority)) {
            $neighbor->update(['priority' => $factor->priority]);
            $factor->update(['priority' => $neighborPriority]);
        }

        return Response::redirectToRoute('ticket-allocator.factors.index', status: 303);
    }

    /**
     * Lower the specified factor's priority.
     */
    public function lowerPriority(Factor $factor): RedirectResponse
    {
        return $this->raisePriority($factor, true);
    }
}
