<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projections;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @property string $ticket_uuid
 * @property string $operator_uuid
 * @property int $initial_weight
 * @property int $weight_increment
 * @property int $complexity
 * @property int $delay
 * @property int $reservation
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Ticket $ticket
 * @property Operator $operator
 */
class TicketMatch extends Pivot
{
    protected $table = 'ticket_allocator_matches';

    protected $guarded = [];

    /** @var array<string, mixed> */
    protected $attributes = [
        'initial_weight' => 0,
        'weight_increment' => 0,
        'complexity' => 0,
        'delay' => 0,
        'reservation' => 0,
    ];

    /** @var array<string, string> */
    protected $casts = [
        'initial_weight' => 'integer',
        'weight_increment' => 'integer',
        'complexity' => 'integer',
        'delay' => 'integer',
        'reservation' => 'integer',
    ];

    /**
     * @return BelongsTo<Ticket, $this>
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class, 'ticket_uuid');
    }

    /**
     * @return BelongsTo<Operator, $this>
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class, 'operator_uuid');
    }
}
