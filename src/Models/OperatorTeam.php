<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Database\Factories\OperatorTeamFactory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @property non-empty-string $uuid
 * @property string $name
 * @property string $description
 * @property array|null $matching
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property Collection<int, Operator> $operators
 * @property Collection<int, TicketCategory> $ticketCategories
 */
class OperatorTeam extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'ticket_allocator_operator_teams';

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    /** @var string[] */
    protected $with = ['operators', 'ticketCategories'];

    protected $fillable = ['uuid', 'name', 'description', 'matching'];

    protected static function booted(): void
    {
        static::creating(function (self $model) {
            $model->setAttribute($model->getKeyName(), (string) Str::uuid());
        });
    }

    protected static function newFactory(): OperatorTeamFactory
    {
        return OperatorTeamFactory::new();
    }

    /**
     * @return BelongsToMany<Operator>
     */
    public function operators(): BelongsToMany
    {
        return $this->belongsToMany(Operator::class, 'ticket_allocator_team_operator', 'team_uuid', 'operator_uuid');
    }

    /**
     * @return BelongsToMany<TicketCategory>
     */
    public function ticketCategories(): BelongsToMany
    {
        return $this->belongsToMany(TicketCategory::class, 'ticket_allocator_team_category', 'team_uuid', 'category_uuid');
    }
}
