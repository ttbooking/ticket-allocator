<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Factors\Category;
use TTBooking\TicketAllocator\Models\Factor;
use TTBooking\TicketAllocator\Models\TicketCategory;

class FactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->callSilent('factor:install');

        $config = [];
        $ticketCategories = TicketCategory::all(['uuid'])->modelKeys();
        foreach ($ticketCategories as $uuid) {
            $config[] = [
                'value' => $uuid,
                'initial_weight' => fake()->numberBetween(0, 100000),
                'weight_increment' => fake()->numberBetween(0, 100),
                'complexity' => fake()->randomElement([5, 10, 25, 50]),
                'delay' => fake()->boolean(10) ? fake()->numberBetween(1, 10) * 60 : 0,
                'reservation' => 0,
            ];
        }

        Factor::query()->whereKey(Category::getInstanceData()->value('uuid'))->update(compact('config'));
    }
}
