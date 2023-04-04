<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Actions\EnrollOperatorAction;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class EsOperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(EnrollOperatorAction $enrollOperator, int $count = 10): void
    {
        $operatorTeams = OperatorTeam::all()->all();

        for ($i = 0; $i < $count; $i++) {
            $operator = $enrollOperator(
                user: $i + 1,
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
        }
    }
}
