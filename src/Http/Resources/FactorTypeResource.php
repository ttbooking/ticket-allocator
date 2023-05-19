<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

class FactorTypeResource extends JsonResource
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
        if (! is_subclass_of($this->resource, FactorContract::class)) {
            throw new \UnexpectedValueException('Given resource does not implement Factor contract.');
        }

        return [
            'alias' => $this->resource::getAlias(),
            'name' => $this->resource::getName(),
            'excluded' => $this->resource::isExcluded(),
            'hidden' => $this->resource::isHidden(),
            'singular' => $this->resource::isSingular(),
            'component' => $this->resource::getComponentName(),
        ];
    }
}
