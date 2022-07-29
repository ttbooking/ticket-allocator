<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property non-empty-string $uuid
 * @property string $aggregate
 * @property class-string $class
 * @property string $description
 * @property array $config
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property Collection<Event> $events
 */
class Factor extends Model
{
    use SoftDeletes;

    protected $table = 'ticket_allocator_factors';

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['uuid', 'aggregate', 'class', 'description', 'config'];

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->setAttribute($model->getKeyName(), (string) Str::uuid());
        });
    }

    /**
     * @return HasMany<Event>
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
