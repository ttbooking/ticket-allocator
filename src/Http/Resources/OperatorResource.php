<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

/**
 * @mixin Operator
 */
class OperatorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request|null  $request
     * @return array<string, mixed>
     */
    public function toArray($request = null): array
    {
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'online' => $this->online,
            'ready' => $this->ready,
            'ticket_limit' => $this->ticket_limit,
            'complexity_limit' => $this->complexity_limit,
            'teams' => OperatorTeamResource::collection($this->teams),
        ];
    }
}
