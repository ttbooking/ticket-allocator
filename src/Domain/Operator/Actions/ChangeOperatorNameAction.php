<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\ChangeOperatorName;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class ChangeOperatorNameAction extends Action
{
    public function __invoke(Operator $operator, ?string $name): void
    {
        $this->dispatch(new ChangeOperatorName(
            uuid: $operator->getKey(),
            name: $name,
        ));
    }
}
