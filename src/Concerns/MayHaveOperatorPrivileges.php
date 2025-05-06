<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @method static Builder<$this> eligibleToProcessTickets()
 *
 * @property Operator|null $operator
 *
 * @mixin Model
 *
 * @phpstan-require-extends Model
 */
trait MayHaveOperatorPrivileges
{
    /**
     * @param  Builder<$this>  $query
     * @return Builder<$this>
     */
    public function scopeEligibleToProcessTickets(Builder $query): Builder
    {
        return $query;
    }

    /**
     * @return HasOne<Operator, $this>
     */
    public function operator(): HasOne
    {
        return $this->hasOne(Operator::class, 'user_id');
    }
}
