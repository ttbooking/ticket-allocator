<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Actions\EnrollOperatorAction;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(EnrollOperatorAction $enrollOperator, int $count = 10): void
    {
        if ($count === 0) {
            return;
        }

        $fromUserId = Operator::query()->max('user_id');
        $operatorTeams = OperatorTeam::all()->all();

        $bar = $this->command->getOutput()->createProgressBar($count);
        $bar->start();

        for ($i = 1; $i <= $count; $i++) {
            $operator = $enrollOperator(
                user: $fromUserId + $i,
                name: fake()->lastName(),
                online: fake()->boolean(90),
                ready: fake()->boolean(70),
                ticketLimit: fake()->boolean(70) ? fake()->numberBetween(1, 4) : null,
                complexityLimit: 100,
            );

            if (! empty($operatorTeams)) {
                foreach (fake()->randomElements($operatorTeams,
                    fake()->optional(.9, 0)->numberBetween(1, count($operatorTeams))
                ) as $team) {
                    $team->operators()->attach($operator);
                }
            }

            $bar->advance();
        }

        $bar->finish();
        $this->command->newLine();
    }
}
