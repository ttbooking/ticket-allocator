<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $aggregate
 * @property string $event
 * @property string $factor_uuid
 * @property int $priority
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property Factor $factor
 */
class Event extends Model
{
    use SoftDeletes;

    protected $table = 'ticket_allocator_events';

    /**
     * @return BelongsTo<Factor, self>
     */
    public function factor(): BelongsTo
    {
        return $this->belongsTo(Factor::class);
    }
}
