<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projections;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\EventSourcing\Projections\Projection;
use TTBooking\TicketAllocator\Database\Factories\OperatorFactory;
use TTBooking\TicketAllocator\Models\OperatorTeam;

/**
 * @property string $name
 * @property bool $online
 * @property bool $ready
 * @property int $ticket_limit
 * @property int $complexity_limit
 *
 * @property Collection<int, OperatorTeam> $teams
 */
class Operator extends Projection
{
    use HasFactory;

    protected $table = 'ticket_allocator_operators';

    protected $guarded = [];

    protected static function newFactory(): OperatorFactory
    {
        return OperatorFactory::new();
    }

    /**
     * @return BelongsToMany<OperatorTeam>
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(OperatorTeam::class, 'ticket_allocator_team_operator', 'operator_uuid', 'team_uuid');
    }
}
