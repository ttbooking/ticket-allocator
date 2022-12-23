<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Actions\AdjustOperatorComplexityLimitAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\AdjustOperatorTicketLimitAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\ChangeOperatorNameAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\EnrollOperatorAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\JoinOperatorTeamAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\SetOperatorOnlineAction;
use TTBooking\TicketAllocator\Domain\Operator\Actions\SetOperatorReadyAction;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class EsOperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  int  $count
     * @return void
     */
    public function run(int $count = 10): void
    {
        $operatorTeams = OperatorTeam::all()->all();

        for ($i = 0; $i < $count; $i++) {
            $operator = app(EnrollOperatorAction::class)();

            app(ChangeOperatorNameAction::class)($operator, fake()->name());

            fake()->boolean(90) && app(SetOperatorOnlineAction::class)($operator);
            fake()->boolean(70) && app(SetOperatorReadyAction::class)($operator);

            fake()->boolean(70) && app(AdjustOperatorTicketLimitAction::class)($operator, fake()->numberBetween(1, 4));
            app(AdjustOperatorComplexityLimitAction::class)($operator, 100);

            if (! empty($operatorTeams)) {
                foreach (fake()->randomElements($operatorTeams,
                    fake()->optional(.9, 0)->numberBetween(1, count($operatorTeams))
                ) as $team) {
                    app(JoinOperatorTeamAction::class)($operator, $team);
                }
            }
        }
    }
}
