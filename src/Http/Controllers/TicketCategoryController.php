<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use TTBooking\TicketAllocator\Http\Requests\StoreTicketCategoryRequest;
use TTBooking\TicketAllocator\Http\Requests\UpdateTicketCategoryRequest;
use TTBooking\TicketAllocator\Http\Resources\TicketCategoryResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketCategoryController extends Controller
{
    /**
     * Display a listing of the ticket categories.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
    {
        $ticketCategories = TicketCategoryResource::collection(TicketCategory::all())->resolve();

        return Inertia::render('TicketCategory/Index', compact('ticketCategories'));
    }

    /**
     * Show the form for creating a new ticket category.
     *
     * @return InertiaResponse
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('TicketCategory/CreateEdit');
    }

    /**
     * Store a newly created ticket category in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\StoreOperatorRequest  $request
     * @return RedirectResponse
     */
    public function store(StoreTicketCategoryRequest $request): RedirectResponse {
        TicketCategory::query()->create($request->validated());

        return Response::redirectToRoute('ticket-allocator.ticket-categories.index', status: 303);
    }

    /**
     * Display the specified ticket category.
     *
     * @param  \TTBooking\TicketAllocator\Models\TicketCategory  $ticketCategory
     * @return InertiaResponse
     */
    public function show(TicketCategory $ticketCategory): InertiaResponse
    {
        $ticketCategory = new TicketCategoryResource($ticketCategory);

        return Inertia::render('TicketCategory/Show', compact('ticketCategory'));
    }

    /**
     * Show the form for editing the specified ticket category.
     *
     * @param  \TTBooking\TicketAllocator\Models\TicketCategory  $ticketCategory
     * @return InertiaResponse
     */
    public function edit(TicketCategory $ticketCategory): InertiaResponse
    {
        $ticketCategory = new TicketCategoryResource($ticketCategory);

        return Inertia::render('TicketCategory/CreateEdit', compact('ticketCategory'));
    }

    /**
     * Update the specified ticket category in storage.
     *
     * @param  \TTBooking\TicketAllocator\Http\Requests\UpdateTicketCategoryRequest  $request
     * @param  \TTBooking\TicketAllocator\Models\TicketCategory  $ticketCategory
     * @return RedirectResponse
     */
    public function update(UpdateTicketCategoryRequest $request, TicketCategory $ticketCategory): RedirectResponse {
        $ticketCategory->update($request->validated());

        return Response::redirectToRoute('ticket-allocator.ticket-categories.index', status: 303);
    }

    /**
     * Remove the specified ticket category from storage.
     *
     * @param  \TTBooking\TicketAllocator\Models\TicketCategory  $ticketCategory
     * @return RedirectResponse
     */
    public function destroy(TicketCategory $ticketCategory): RedirectResponse
    {
        $ticketCategory->delete();

        return Response::redirectToRoute('ticket-allocator.ticket-categories.index', status: 303);
    }
}
