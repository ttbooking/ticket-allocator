<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Models\TicketCategory;

class TicketCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  int  $count
     * @return void
     */
    public function run(int $count = 10): void
    {
        TicketCategory::factory($count)->create();
    }
}
