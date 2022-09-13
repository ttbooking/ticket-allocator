<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Models\OperatorTeam;

class OperatorTeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  int  $count
     * @return void
     */
    public function run(int $count = 3): void
    {
        OperatorTeam::factory($count)->create();
    }
}
