<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions;
use TTBooking\TicketAllocator\Models\TicketCategory;

class EsTicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  Actions\CreateTicketAction  $createTicket
     * @param  Actions\SetTicketMetaValueAction  $setTicketMetaValue
     * @param  Actions\BindTicketAction  $bindTicket
     * @param  Actions\IncrementTicketInitialWeightAction  $incrementTicketInitialWeight
     * @param  Actions\IncrementTicketWeightIncrementAction  $incrementTicketWeightIncrement
     * @param  Actions\IncrementTicketComplexityAction  $incrementTicketComplexity
     * @param  Actions\IncrementTicketDelayAction  $incrementTicketDelay
     * @param  int  $count
     * @return void
     */
    public function run(
        Actions\CreateTicketAction $createTicket,
        Actions\SetTicketMetaValueAction $setTicketMetaValue,
        Actions\BindTicketAction $bindTicket,
        Actions\IncrementTicketInitialWeightAction $incrementTicketInitialWeight,
        Actions\IncrementTicketWeightIncrementAction $incrementTicketWeightIncrement,
        Actions\IncrementTicketComplexityAction $incrementTicketComplexity,
        Actions\IncrementTicketDelayAction $incrementTicketDelay,
        int $count = 50
    ): void {
        $ticketCategories = TicketCategory::all()->all();
        $operators = Operator::all()->all();

        for ($i = 0; $i < $count; $i++) {
            $ticket = $createTicket(fake()->randomElement($ticketCategories));
            $setTicketMetaValue($ticket, 'icon', fake()->randomElement(['mdi-airplane', 'mdi-train', 'mdi-bus', 'mdi-car']));
            $setTicketMetaValue($ticket, 'title', $order = fake()->numberBetween(100, 1000));
            $setTicketMetaValue($ticket, 'card_title', 'Order #'.$order);
            $setTicketMetaValue($ticket, 'card_lines', [
                'Applicant' => fake()->name,
                'Organisation' => fake()->company,
            ]);

            if (! empty($operators)) {
                fake()->boolean(20) && $bindTicket($ticket, fake()->randomElement($operators));
            }

            $incrementTicketInitialWeight($ticket, fake()->numberBetween(0, 100000));
            $incrementTicketWeightIncrement($ticket, fake()->numberBetween(0, 100));
            $incrementTicketComplexity($ticket, fake()->randomElement([5, 10, 25, 50]));
            //$incrementTicketDelay($ticket, fake()->numberBetween(1, 10) * 60);
        }
    }
}
