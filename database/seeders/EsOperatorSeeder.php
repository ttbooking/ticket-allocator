<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Actions;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class EsOperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  Actions\EnrollOperatorAction  $enrollOperator
     * @param  Actions\ChangeOperatorNameAction  $changeOperatorName
     * @param  Actions\SetOperatorOnlineAction  $setOperatorOnline
     * @param  Actions\SetOperatorReadyAction  $setOperatorReady
     * @param  Actions\AdjustOperatorTicketLimitAction  $adjustOperatorTicketLimit
     * @param  Actions\AdjustOperatorComplexityLimitAction  $adjustOperatorComplexityLimit
     * @param  Actions\JoinOperatorTeamAction  $joinOperatorTeam
     * @param  int  $count
     * @return void
     */
    public function run(
        Actions\EnrollOperatorAction $enrollOperator,
        Actions\ChangeOperatorNameAction $changeOperatorName,
        Actions\SetOperatorOnlineAction $setOperatorOnline,
        Actions\SetOperatorReadyAction $setOperatorReady,
        Actions\AdjustOperatorTicketLimitAction $adjustOperatorTicketLimit,
        Actions\AdjustOperatorComplexityLimitAction $adjustOperatorComplexityLimit,
        Actions\JoinOperatorTeamAction $joinOperatorTeam,
        int $count = 10
    ): void {
        $operatorTeams = OperatorTeam::all()->all();

        for ($i = 0; $i < $count; $i++) {
            $operator = $enrollOperator();

            $changeOperatorName($operator, fake()->name());

            fake()->boolean(90) && $setOperatorOnline($operator);
            fake()->boolean(70) && $setOperatorReady($operator);

            fake()->boolean(70) && $adjustOperatorTicketLimit($operator, fake()->numberBetween(1, 4));
            $adjustOperatorComplexityLimit($operator, 100);

            if (! empty($operatorTeams)) {
                foreach (fake()->randomElements($operatorTeams,
                    fake()->optional(.9, 0)->numberBetween(1, count($operatorTeams))
                ) as $team) {
                    $joinOperatorTeam($operator, $team);
                }
            }
        }
    }
}
