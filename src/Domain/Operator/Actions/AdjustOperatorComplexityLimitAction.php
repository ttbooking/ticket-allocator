<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use TTBooking\TicketAllocator\Domain\Operator\Commands\AdjustOperatorComplexityLimit;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class AdjustOperatorComplexityLimitAction extends Action
{
    public function __invoke(Operator $operator, int $complexityLimit): void
    {
        $this->dispatch(new AdjustOperatorComplexityLimit(
            uuid: $operator->getKey(),
            complexityLimit: $complexityLimit,
        ));
    }
}
