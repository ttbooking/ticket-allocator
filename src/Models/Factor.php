<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\TicketAllocator;

/**
 * @method static static create(array $parameters = [])
 * @method static static|null find(string $uuid)
 *
 * @property non-empty-string $uuid
 * @property int $priority
 * @property class-string<FactorContract> $type
 * @property-read FactorContract $instance
 * @property string $name
 * @property string $description
 * @property array $config
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 */
class Factor extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'ticket_allocator_factors';

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['uuid', 'priority', 'type', 'name', 'description', 'config'];

    /** @var array<string, string> */
    protected $casts = [
        'config' => 'array',
    ];

    /**
     * @return Attribute<class-string<FactorContract>, never>
     */
    protected function type(): Attribute
    {
        return Attribute::get(static fn ($type) => TicketAllocator::factors()->get($type));
    }

    /**
     * @return Attribute<FactorContract, never>
     */
    protected function instance(): Attribute
    {
        return Attribute::get(fn ($type) => app($this->type)->configure($this->config));
    }

    /**
     * @return Attribute<string, never>
     */
    protected function name(): Attribute
    {
        return Attribute::get(fn ($value) => $value ?? $this->type::getName());
    }
}
