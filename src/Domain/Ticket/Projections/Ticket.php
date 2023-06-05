<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projections;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EventSourcing\Projections\Projection;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\DTO\TicketMetrics;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @property string $uuid
 * @property string $category_uuid
 * @property string|null $handler_uuid
 * @property array<string, mixed>|null $meta
 * @property array<string, TicketMetrics>|null $metrics
 * @property int $initial_weight
 * @property int $weight_increment
 * @property int $complexity
 * @property int $delay
 * @property int $reservation
 * @property-read Carbon $delayed_until
 * @property-read Carbon|null $reserved_until
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $bound_at
 * @property Carbon|null $accepted_at
 * @property Carbon|null $deleted_at
 * @property-read int $duration
 * @property-read int $weight
 * @property TicketCategory $category
 * @property Operator|null $operator
 *
 * @method static Builder<self> unbound()
 * @method static Builder<self> bound()
 * @method static Builder<self> notAccepted()
 * @method static Builder<self> accepted()
 * @method int increment(string $column, float|int $amount = 1, array $extra = [])
 * @method int decrement(string $column, float|int $amount = 1, array $extra = [])
 */
class Ticket extends Projection
{
    use SoftDeletes;

    protected $table = 'ticket_allocator_tickets';

    protected $guarded = [];

    /** @var array<string, mixed> */
    protected $attributes = [
        //'meta' => [],
        //'metrics' => [],
        'initial_weight' => 0,
        'weight_increment' => 0,
        'complexity' => 0,
        'delay' => 0,
        'reservation' => 0,
        'bound_at' => null,
        'accepted_at' => null,
    ];

    /** @var array<string, string> */
    protected $casts = [
        'meta' => 'array',
        'metrics' => 'array',
        'initial_weight' => 'integer',
        'weight_increment' => 'integer',
        'complexity' => 'integer',
        'delay' => 'integer',
        'reservation' => 'integer',
        'bound_at' => 'datetime',
        'accepted_at' => 'datetime',
    ];

    /** @var list<string> */
    //protected $appends = ['duration', 'weight'];

    /**
     * Retrieve ticket duration in seconds.
     *
     * @return Attribute<int, never>
     */
    protected function duration(): Attribute
    {
        return Attribute::get(static function ($value, $attributes = []): int {
            return now()->diffInSeconds($attributes[static::CREATED_AT]);
        });
    }

    /**
     * Retrieve current ticket weight.
     *
     * @return Attribute<int, never>
     */
    protected function weight(): Attribute
    {
        return Attribute::get(function ($value, $attributes = []): int {
            return $attributes['initial_weight'] + $attributes['weight_increment'] * $this->duration;
        });
    }

    /**
     * @return BelongsTo<TicketCategory, self>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(TicketCategory::class);
    }

    /**
     * @return BelongsTo<Operator, self>
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class, 'handler_uuid');
    }

    /**
     * Scope a query to only include unbound tickets.
     *
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeUnbound(Builder $query): Builder
    {
        return $query->whereNull('handler_uuid');
    }

    /**
     * Scope a query to only include bound tickets.
     *
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeBound(Builder $query): Builder
    {
        return $query->whereNotNull('handler_uuid');
    }

    /**
     * Scope a query to only include not accepted tickets.
     *
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeNotAccepted(Builder $query): Builder
    {
        return $query->whereNotNull('handler_uuid')->whereNull('accepted_at');
    }

    /**
     * Scope a query to only include accepted tickets.
     *
     * @param  Builder<self>  $query
     * @return Builder<self>
     */
    public function scopeAccepted(Builder $query): Builder
    {
        return $query->whereNotNull('handler_uuid')->whereNotNull('accepted_at');
    }
}
