<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use Symfony\Component\Console\Helper\ProgressBar;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(int $count = 50): void
    {
        if ($count === 0) {
            return;
        }

        $this->command->withProgressBar($count, function (ProgressBar $bar) use ($count) {
            Ticket::created(static fn () => $bar->advance());
            Ticket::factory($count)->create();
        });

        $this->command->newLine();
    }
}
