<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Operator\Actions;

use Illuminate\Database\Eloquent\Collection;
use TTBooking\TicketAllocator\Domain\Operator\Commands\SetOperatorTeams;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Support\Action;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class SetOperatorTeamsAction extends Action
{
    /**
     * @param  Operator  $operator
     * @param  Collection<int, OperatorTeam>|string[]  $operatorTeams
     * @return void
     */
    public function __invoke(Operator $operator, Collection|array $operatorTeams): void
    {
        $this->dispatch(new SetOperatorTeams(
            uuid: $operator->getKey(),
            operatorTeamUuids: is_array($operatorTeams) ? $operatorTeams : $operatorTeams->modelKeys(),
        ));
    }
}
