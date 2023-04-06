<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use Symfony\Component\Console\Helper\ProgressBar;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

class OperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 10): void
    {
        if ($count === 0) {
            return;
        }

        $this->command->withProgressBar($count, function (ProgressBar $bar) use ($count) {
            Operator::created(static fn () => $bar->advance());
            Operator::factory($count)->create();
        });

        $this->command->newLine();
    }
}
