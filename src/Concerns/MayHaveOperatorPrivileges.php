<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @mixin Model
 *
 * @method static static|Builder eligibleToProcessTickets()
 *
 * @property Operator|null $operator
 */
trait MayHaveOperatorPrivileges
{
    public function scopeEligibleToProcessTickets(Builder $query): Builder
    {
        return $query;
    }

    public function operator(): HasOne
    {
        return $this->hasOne(Operator::class, 'user_id');
    }
}
