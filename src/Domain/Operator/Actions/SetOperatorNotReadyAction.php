<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\SetOperatorNotReady;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class SetOperatorNotReadyAction extends Action
{
    public function __invoke(Operator $operator): void
    {
        $this->dispatch(new SetOperatorNotReady(
            uuid: $operator->getKey(),
        ));
    }
}
