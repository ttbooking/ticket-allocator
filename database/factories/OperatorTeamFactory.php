<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Models\OperatorTeam;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @extends Factory<OperatorTeam>
 */
class OperatorTeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<OperatorTeam>
     */
    protected $model = OperatorTeam::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //$ticketCategoryUuids = TicketCategory::query()->pluck('uuid')->all();

        return [
            'uuid' => fake()->uuid(),
            'name' => Str::ucfirst(fake()->words(3, true)),
            'description' => fake()->sentence(),
            /*'matching' => [
                'categories' => fake()
                    ->randomElements($ticketCategoryUuids, fake()->numberBetween(0, count($ticketCategoryUuids)))
            ],*/
        ];
    }

    /**
     * Configure the factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function (OperatorTeam $team) {
            $ticketCategoryUuids = TicketCategory::query()->pluck('uuid')->all();
            $team->ticketCategories()->sync(fake()->randomElements($ticketCategoryUuids,
                fake()->optional(.9, 0)->numberBetween(1, count($ticketCategoryUuids))
            ));
        });
    }
}
