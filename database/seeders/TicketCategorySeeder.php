<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use Symfony\Component\Console\Helper\ProgressBar;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketCategorySeeder extends Seeder
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
            TicketCategory::created(static fn () => $bar->advance());
            TicketCategory::factory($count)->create();
        });

        $this->command->newLine();
    }
}
