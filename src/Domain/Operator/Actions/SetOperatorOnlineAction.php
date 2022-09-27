<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Operator\Commands\SetOperatorOnline;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

class SetOperatorOnlineAction extends Action
{
    public function __invoke(Operator $operator): void
    {
        $this->dispatch(new SetOperatorOnline(
            uuid: $operator->getKey(),
        ));
    }
}
