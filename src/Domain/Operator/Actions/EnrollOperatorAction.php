<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Domain\Operator\Commands\EnrollOperator;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;

class EnrollOperatorAction extends Action
{
    public function __invoke(
        Model|int|string $user,
        ?string $name = null,
        bool $online = false,
        bool $ready = false,
        ?int $ticketLimit = null,
        ?int $complexityLimit = null,
    ): ?Operator {
        $uuid = (string) Str::orderedUuid();

        $this->dispatch(new EnrollOperator(
            uuid: $uuid,
            userId: is_scalar($user) ? $user : $user->getKey(),
            name: $name,
            online: $online,
            ready: $ready,
            ticketLimit: $ticketLimit,
            complexityLimit: $complexityLimit,
        ));

        return Operator::find($uuid);
    }
}
