<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\ResignOperator;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class ResignOperatorAction extends Action
{
    public function __invoke(Operator $operator): void
    {
        $this->dispatch(new ResignOperator(
            uuid: $operator->getKey(),
        ));
    }
}
