<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Projections;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EventSourcing\Projections\Projection;
use TTBooking\TicketAllocator\Database\Factories\TicketFactory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @property string $uuid
 * @property string $category_uuid
 * @property string|null $handler_uuid
 * @property array<string, mixed>|null $meta
 * @property int $initial_weight
 * @property int $weight_increment
 * @property int $complexity
 * @property int $delay
 * @property-read int $weight
 * @property-read Carbon $delayed_until
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 *
 * @property TicketCategory $category
 * @property Operator|null $operator
 *
 * @method static Builder<static> bound()
 * @method static Builder<static> unbound()
 *
 * @method int increment(string $column, float|int $amount = 1, array $extra = [])
 * @method int decrement(string $column, float|int $amount = 1, array $extra = [])
 */
class Ticket extends Projection
{
    use SoftDeletes, HasFactory;

    protected $table = 'ticket_allocator_tickets';

    protected $guarded = [];

    /** @var array<string, mixed> */
    protected $attributes = [
        //'meta' => [],
        'initial_weight' => 0,
        'weight_increment' => 0,
        'complexity' => 0,
        'delay' => 0,
    ];

    /** @var array<string, string> */
    protected $casts = [
        //'meta' => 'array',
        'initial_weight' => 'integer',
        'weight_increment' => 'integer',
        'complexity' => 'integer',
        'delay' => 'integer',
    ];

    protected static function newFactory(): TicketFactory
    {
        return TicketFactory::new();
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
     * Scope a query to only include bound tickets.
     *
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeBound(Builder $query)
    {
        return $query->whereNotNull('handler_uuid');
    }

    /**
     * Scope a query to only include unbound tickets.
     *
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeUnbound(Builder $query)
    {
        return $query->whereNull('handler_uuid');
    }
}
