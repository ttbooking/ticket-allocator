<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

use TTBooking\TicketAllocator\Domain\Support\Event;
use TTBooking\TicketAllocator\Exceptions\FactorResolutionException;

interface FactorRepository
{
    /**
     * @param  class-string<Event>  $event
     * @return list<Factor>
     *
     * @throws FactorResolutionException
     */
    public function getForEvent(string $event): array;

    /**
     * @param  non-empty-string  $uuid
     * @return Factor
     *
     * @throws FactorResolutionException
     */
    public function get(string $uuid): Factor;

    /**
     * @param  class-string  $factor
     * @param  mixed[]  $config
     * @param  string|null  $description
     * @return non-empty-string
     *
     * @throws FactorResolutionException
     */
    public function add(string $factor, array $config = [], string $description = null): string;
}
