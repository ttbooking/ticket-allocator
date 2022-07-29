<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;
use TTBooking\TicketAllocator\Http\Queries\FactorQueryBuilder;
use TTBooking\TicketAllocator\Http\Requests\FactorStoreRequest;
use TTBooking\TicketAllocator\Models\Factor;

class FactorController extends Controller
{
    /**
     * Display a listing of the factors.
     *
     * @param  FactorQueryBuilder  $query
     * @return JsonResponse
     */
    public function index(FactorQueryBuilder $query): JsonResponse
    {
        return Response::json($query->paginate());
    }

    /**
     * Store a newly created factor in repository.
     *
     * @param  FactorStoreRequest  $request
     * @return JsonResponse
     */
    public function store(FactorStoreRequest $request): JsonResponse
    {
        $factor = Factor::query()->create($request->validated());

        return Response::json($factor, JsonResponse::HTTP_CREATED);
    }

    /**
     * Display the specified factor.
     *
     * @param  Factor  $factor
     * @return JsonResponse
     */
    public function show(Factor $factor): JsonResponse
    {
        return Response::json($factor);
    }

    /**
     * Update the specified factor in repository.
     *
     * @param  FactorStoreRequest  $request
     * @param  Factor  $factor
     * @return JsonResponse
     */
    public function update(FactorStoreRequest $request, Factor $factor): JsonResponse
    {
        $factor->update($request->validated());

        return Response::json($factor);
    }

    /**
     * Remove the specified factor from repository.
     *
     * @param  Factor  $factor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Factor $factor): \Illuminate\Http\Response
    {
        $factor->delete();

        return Response::noContent();
    }
}
