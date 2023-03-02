<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Projections;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EventSourcing\Projections\Projection;
use TTBooking\TicketAllocator\Database\Factories\OperatorFactory;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Models\OperatorTeam;

/**
 * @property string $uuid
 * @property int|string $user_id
 * @property string|null $name
 * @property bool $online
 * @property bool $ready
 * @property int|null $ticket_limit
 * @property int|null $complexity_limit
 * @property int $bound_tickets
 * @property int $total_complexity
 * @property-read int|null $free_slots
 * @property-read int|null $free_complexity
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Model $user
 * @property Collection<int, OperatorTeam> $teams
 * @property Collection<int, Ticket> $tickets
 *
 * @method int increment(string $column, float|int $amount = 1, array $extra = [])
 * @method int decrement(string $column, float|int $amount = 1, array $extra = [])
 */
class Operator extends Projection
{
    use HasFactory;

    protected $table = 'ticket_allocator_operators';

    protected $guarded = [];

    /** @var array<string, mixed> */
    protected $attributes = [
        'name' => null,
        'online' => false,
        'ready' => false,
        'ticket_limit' => null,
        'complexity_limit' => null,
        'bound_tickets' => 0,
        'total_complexity' => 0,
        //'free_slots' => null,
        //'free_complexity' => null,
    ];

    /** @var array<string, string> */
    protected $casts = [
        'online' => 'boolean',
        'ready' => 'boolean',
        'ticket_limit' => 'integer',
        'complexity_limit' => 'integer',
        'bound_tickets' => 'integer',
        'total_complexity' => 'integer',
        'free_slots' => 'integer',
        'free_complexity' => 'integer',
    ];

    /** @var string[] */
    protected $touches = ['operatorTeams'];

    protected static function newFactory(): OperatorFactory
    {
        return OperatorFactory::new();
    }

    /**
     * @return BelongsTo<static, Model>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(config('ticket-allocator.operator_source'));
    }

    /**
     * @return BelongsToMany<OperatorTeam>
     */
    protected function operatorTeams(): BelongsToMany
    {
        return $this->belongsToMany(OperatorTeam::class, 'ticket_allocator_team_operator', 'operator_uuid', 'team_uuid');
    }

    /**
     * @return BelongsToMany<OperatorTeam>
     */
    public function teams(): BelongsToMany
    {
        return $this->operatorTeams();
    }

    /**
     * @return HasMany<Ticket>
     */
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'handler_uuid');
    }
}
