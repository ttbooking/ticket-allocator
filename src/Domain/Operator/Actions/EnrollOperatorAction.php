<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Domain\Operator\Commands\EnrollOperator;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class EnrollOperatorAction extends Action
{
    public function __invoke(int|string $userId): ?Operator
    {
        $uuid = (string) Str::orderedUuid();

        $this->dispatch(new EnrollOperator(
            uuid: $uuid,
            userId: $userId,
        ));

        return Operator::find($uuid);
    }
}
