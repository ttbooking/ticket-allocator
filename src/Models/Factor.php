<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @method static static create(array $parameters = [])
 * @method static static|null find(string $uuid)
 * @property non-empty-string $uuid
 * @property int $priority
 * @property string $name
 * @property string $description
 * @property class-string $class
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

    protected $fillable = ['uuid', 'priority', 'name', 'description', 'class', 'config'];

    /** @var array<string, string> */
    protected $casts = [
        'config' => 'array',
    ];
}
