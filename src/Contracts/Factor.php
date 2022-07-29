<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Contracts;

interface Factor
{
    /**
     * @param  mixed[]  $config
     * @return $this
     */
    public function configure(array $config): static;

    /**
     * @return mixed[]
     */
    public function getConfig(): array;

    //public function when(ShouldAffect $event): bool;

    //public function then(ShouldAffect $event): void;
}
