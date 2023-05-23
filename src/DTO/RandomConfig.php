<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\DTO;

use Spatie\LaravelData\Data;
use TTBooking\TicketAllocator\Contracts\FactorConfig;

class RandomConfig extends Data implements FactorConfig
{
    public function __construct(

        /** @var array{int, int}|array{min: int, max: int} */
        public array $initial_weight = [0, 0],

        /** @var array{int, int}|array{min: int, max: int} */
        public array $weight_increment = [0, 0],

        /** @var array{int, int}|array{min: int, max: int} */
        public array $complexity = [0, 0],

        /** @var array{int, int}|array{min: int, max: int} */
        public array $delay = [0, 0],

    ) {
    }
}
