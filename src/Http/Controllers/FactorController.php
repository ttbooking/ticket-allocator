<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Http\Requests\StoreFactorRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateFactorRequest;
use TTBooking\TicketAllocator\Http\Resources\FactorResource;
use TTBooking\TicketAllocator\Models\Factor;

class FactorController extends Controller
{
    /**
     * Display a listing of the factors.
     */
    public function index(): InertiaResponse
    {
        $factors = FactorResource::collection(Factor::withTrashed()->get())->resolve();

        return Inertia::render('Factor/Index', compact('factors'));
    }

    /**
     * Show the form for creating a new factor.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Factor/CreateEdit');
    }

    /**
     * Store a newly created factor in storage.
     */
    public function store(StoreFactorRequest $request): RedirectResponse
    {
        /** @var Factor $factor */
        $factor = Factor::query()->create($request->safe(['name', 'description']));
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

        return Inertia::render('Factor/CreateEdit', compact('factor'));
    }

    /**
     * Update the specified factor in storage.
     */
    public function update(UpdateFactorRequest $request, Factor $factor): RedirectResponse
    {
        if (! is_null($active = $request->validated('active'))) {
            $active ? $factor->restore() : $factor->delete();
        }

        $factor->update($request->safe(['name', 'description']));

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
}
