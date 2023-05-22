<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @mixin TicketCategory
 */
class TicketCategoryResource extends JsonResource
{
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = null;

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
            'short' => $this->short,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
