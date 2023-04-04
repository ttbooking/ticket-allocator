<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\CreateTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Models\TicketCategory;

class EsTicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(CreateTicketAction $createTicket, int $count = 50): void {
        $ticketCategories = TicketCategory::all()->modelKeys();
        $operators = Operator::all()->modelKeys();

        for ($i = 0; $i < $count; $i++) {
            $createTicket(
                category: fake()->randomElement($ticketCategories),
                operator: fake()->boolean(20) ? fake()->randomElement($operators) : null,
                initialWeight: fake()->numberBetween(0, 100000),
                weightIncrement: fake()->numberBetween(0, 100),
                complexity: fake()->randomElement([5, 10, 25, 50]),
                delay: fake()->boolean(10) ? fake()->numberBetween(1, 10) * 60 : 0,
                meta: [
                    Ticket::META_ICON => fake()->randomElement(['mdi-airplane', 'mdi-train', 'mdi-bus', 'mdi-car']),
                    Ticket::META_TITLE => $order = fake()->numberBetween(100, 1000),
                    Ticket::META_CARD_TITLE => 'Order #'.$order,
                    Ticket::META_CARD_CONTENT => [
                        'Applicant' => fake()->name(),
                        'Organisation' => fake()->company(),
                    ],
                ],
            );
        }
    }
}
