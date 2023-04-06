<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use Symfony\Component\Console\Helper\ProgressBar;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class OperatorTeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 3): void
    {
        if ($count === 0) {
            return;
        }

        $this->command->withProgressBar($count, function (ProgressBar $bar) use ($count) {
            OperatorTeam::created(static fn () => $bar->advance());
            OperatorTeam::factory($count)->create();
        });

        $this->command->newLine();
    }
}
