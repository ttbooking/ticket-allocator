<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projections;

use Carbon\Carbon;
use Spatie\EventSourcing\Projections\Projection;

/**
 * @property string $uuid
 * @property int $initial_weight
 * @property int $weight_increment
 * @property int $complexity
 * @property int $delay
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @method int increment(string $column, float|int $amount = 1, array $extra = [])
 * @method int decrement(string $column, float|int $amount = 1, array $extra = [])
 */
class Ticket extends Projection
{
    protected $guarded = [];

    /** @var array<string, mixed> */
    protected $attributes = [
        'initial_weight' => 0,
        'weight_increment' => 0,
        'complexity' => 0,
        'delay' => 0,
    ];

    /** @var array<string, string> */
    protected $casts = [
        'initial_weight' => 'integer',
        'weight_increment' => 'integer',
        'complexity' => 'integer',
        'delay' => 'integer',
    ];
}
