<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\AdjustOperatorTicketLimit;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class AdjustOperatorTicketLimitAction extends Action
{
    public function __invoke(Operator $operator, ?int $ticketLimit): void
    {
        $this->dispatch(new AdjustOperatorTicketLimit(
            uuid: $operator->getKey(),
            ticketLimit: $ticketLimit,
        ));
    }
}
