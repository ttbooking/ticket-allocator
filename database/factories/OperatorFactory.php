<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Models\OperatorTeam;
use TTBooking\TicketAllocator\Models\TicketCategory;

/**
 * @extends Factory<Operator>
 */
class OperatorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Operator>
     */
    protected $model = Operator::class;

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
            'user_id' => 0,
            'name' => fake()->name(),
            'online' => fake()->boolean(90),
            'ready' => fake()->boolean(70),
            'ticket_limit' => fake()->optional(.7)->numberBetween(1, 4),
            'complexity_limit' => 100,
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
        return $this->afterCreating(function (Operator $operator) {
            $operatorTeamUuids = OperatorTeam::query()->pluck('uuid')->all();
            $operator->teams()->sync(fake()->randomElements($operatorTeamUuids,
                fake()->optional(.9, 0)->numberBetween(1, count($operatorTeamUuids))
            ));
        });
    }

    public function newModel(array $attributes = [])
    {
        return parent::newModel($attributes)->writeable();
    }
}
