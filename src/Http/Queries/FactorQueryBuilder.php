<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Queries;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use TTBooking\TicketAllocator\Models\Factor;

class FactorQueryBuilder extends QueryBuilder
{
    public function __construct()
    {
        parent::__construct(Factor::query());

        $factor = $this->getModel();

        $this->allowedFilters([
            AllowedFilter::exact('uuid', $factor->getKeyName()),
            AllowedFilter::exact('aggregate'),
            AllowedFilter::exact('class'),
            'description',
            AllowedFilter::callback('created_from', function (Builder $query, string $value) use ($factor) {
                $query->where($factor::CREATED_AT, '>=', $value);
            }),
            AllowedFilter::callback('created_to', function (Builder $query, string $value) use ($factor) {
                $query->where($factor::CREATED_AT, '<=', $value);
            }),
        ]);

        $this->allowedSorts([
            'aggregate',
            'class',
            'description',
            'created_at',
        ]);
    }
}
