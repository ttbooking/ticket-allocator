<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projections;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\EventSourcing\Projections\Projection;
use TTBooking\TicketAllocator\Models\OperatorTeam;

/**
 * @property Collection<int, OperatorTeam> $teams
 */
class Operator extends Projection
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return BelongsToMany<OperatorTeam>
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(OperatorTeam::class);
    }
}
