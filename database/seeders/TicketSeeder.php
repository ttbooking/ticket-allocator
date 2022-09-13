<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  int  $count
     * @return void
     */
    public function run(int $count = 50): void
    {
        Ticket::factory($count)->create();
    }
}
