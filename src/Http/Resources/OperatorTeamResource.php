<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use TTBooking\TicketAllocator\Models\OperatorTeam;

/**
 * @mixin OperatorTeam
 */
class OperatorTeamResource extends JsonResource
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
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'operators' => OperatorResource::collection($this->whenLoaded('operators')),
            'ticket_categories' => TicketCategoryResource::collection($this->whenLoaded('ticketCategories')),
        ];
    }
}
