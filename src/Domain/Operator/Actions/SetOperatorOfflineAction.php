<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Domain\Operator\Commands\SetOperatorOffline;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

class SetOperatorOfflineAction extends Action
{
    public function __invoke(Operator $operator): void
    {
        $this->dispatch(new SetOperatorOffline(
            uuid: $operator->getKey(),
        ));
    }
}
