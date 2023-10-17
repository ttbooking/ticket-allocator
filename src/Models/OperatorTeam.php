<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use TTBooking\TicketAllocator\Database\Factories\OperatorTeamFactory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @method static static create(array $parameters = [])
 * @method static static|null find(string $uuid)
 *
 * @property non-empty-string $uuid
 * @property string $name
 * @property string $description
 * @property int $weight
 * @property array<string, mixed>|null $matching
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon|null $deleted_at
 * @property Collection<int, Operator> $operators
 */
class OperatorTeam extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = 'ticket_allocator_operator_teams';

    protected $primaryKey = 'uuid';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['uuid', 'name', 'description', 'weight', 'matching'];

    /** @var array<string, string> */
    protected $casts = [
        'matching' => 'array',
    ];

    protected static function newFactory(): OperatorTeamFactory
    {
        return OperatorTeamFactory::new();
    }

    /**
     * @return BelongsToMany<Operator>
     */
    public function operators(): BelongsToMany
    {
        return $this->belongsToMany(Operator::class, 'ticket_allocator_team_operator', 'team_uuid', 'operator_uuid')
            ->using(TeamOperator::class);
    }
}
