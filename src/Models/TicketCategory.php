<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use TTBooking\TicketAllocator\Database\Factories\TicketCategoryFactory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

/**
 * @method static static create(array $parameters = [])
 * @method static static|null find(string $uuid)
 * @property non-empty-string $uuid
 * @property string $name
 * @property string $short
 * @property int $initial_weight
 * @property int $weight_increment
 * @property int $complexity
 * @property int $delay
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Collection<int, OperatorTeam> $operatorTeams
 * @property Collection<int, Operator> $operators
 * @property Collection<int, Ticket> $tickets
 */
class TicketCategory extends Model
{
    use HasUuids, HasFactory;

    protected $table = 'ticket_allocator_ticket_categories';

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['uuid', 'name', 'short', 'initial_weight', 'weight_increment', 'complexity', 'delay'];

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

    /** @var string[] */
    protected $touches = ['operatorTeams'];

    protected static function newFactory(): TicketCategoryFactory
    {
        return TicketCategoryFactory::new();
    }

    /**
     * @return BelongsToMany<OperatorTeam>
     */
    public function operatorTeams(): BelongsToMany
    {
        return $this->belongsToMany(OperatorTeam::class, 'ticket_allocator_team_category', 'category_uuid', 'team_uuid')
            ->using(TeamCategory::class);
    }

    /**
     * @return BelongsToMany<Operator>
     */
    public function operators(): BelongsToMany
    {
        return $this->belongsToMany(Operator::class, 'ticket_allocator_operator_category', 'category_uuid', 'operator_uuid')
            ->withPivot('team_count');
    }

    /**
     * @return HasMany<Ticket>
     */
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'category_uuid');
    }
}
