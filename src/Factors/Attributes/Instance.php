<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS)]
class Instance
{
    /**
     * @var array{
     *     uuid: string|null,
     *     priority: int|null,
     *     name: string|null,
     *     description: string|null,
     *     config: array|null,
     *     enable: bool,
     * }
     */
    public array $attributes;

    public function __construct(
        public ?string $uuid = null,
        public ?int $priority = null,
        public ?string $name = null,
        public ?string $description = null,
        public ?array $config = null,
        public bool $enable = true,
    ) {
        $this->attributes = compact('uuid', 'priority', 'name', 'description', 'config', 'enable');
    }
}
