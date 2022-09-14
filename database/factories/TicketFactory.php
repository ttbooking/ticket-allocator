<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Ticket>
     */
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ticketCategoryUuids = TicketCategory::query()->pluck('uuid')->all();
        $operatorUuids = Operator::query()->pluck('uuid')->all();

        return [
            'uuid' => fake()->uuid(),
            'category_uuid' => fake()->randomElement($ticketCategoryUuids),
            'handler_uuid' => fake()->optional(.3)->randomElement($operatorUuids),
            'initial_weight' => fake()->numberBetween(0, 100000),
            'weight_increment' => fake()->numberBetween(0, 1000),
            'complexity' => fake()->randomElement([10, 25, 50, 75, 100]),
            'delay' => fake()->optional(.1, 0)->numberBetween(1, 10) * 60,
        ];
    }

    public function newModel(array $attributes = [])
    {
        return parent::newModel($attributes)->writeable();
    }
}
