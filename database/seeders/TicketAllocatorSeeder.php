<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;

class TicketAllocatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $count = $this->askNumber('Enter the number of ticket categories', 10);
        $this->callWith(TicketCategorySeeder::class, compact('count'));

        $count = $this->askNumber('Enter the number of operator teams', 3);
        $this->callWith(OperatorTeamSeeder::class, compact('count'));

        $count = $this->askNumber('Enter the number of operators', 10);
        $this->callWith(OperatorSeeder::class, compact('count'));

        $count = $this->askNumber('Enter the number of tickets', 50);
        $this->callWith(TicketSeeder::class, compact('count'));
    }

    /**
     * Prompt the user for numeric input.
     *
     * @param  string  $question
     * @param  int  $default
     * @return int
     */
    protected function askNumber(string $question, int $default = 0): int
    {
        do {
            isset($count) && $this->command->error('You must enter numeric value!');
            $count = $this->command->ask($question, (string) $default);
        } while (! is_numeric($count));

        return (int) $count;
    }
}
