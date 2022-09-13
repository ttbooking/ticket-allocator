<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @extends Factory<TicketCategory>
 */
class TicketCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<TicketCategory>
     */
    protected $model = TicketCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'name' => Str::ucfirst(implode(' ', $name = fake()->words())),
            'short' => $name[0],
            'initial_weight' => fake()->numberBetween(0, 100000),
            'weight_increment' => fake()->numberBetween(0, 1000),
            'complexity' => fake()->randomElement([10, 25, 50, 75, 100]),
            'delay' => fake()->optional(.1, 0)->numberBetween(1, 10) * 60,
        ];
    }
}
