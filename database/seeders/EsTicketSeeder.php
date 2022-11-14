<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Database\Seeders;

use Illuminate\Database\Seeder;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\BindTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\CreateTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\IncrementTicketComplexityAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\IncrementTicketDelayAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\IncrementTicketInitialWeightAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\IncrementTicketWeightIncrementAction;
use TTBooking\TicketAllocator\Models\TicketCategory;

class EsTicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @param  int  $count
     * @return void
     */
    public function run(int $count = 50): void
    {
        $ticketCategories = TicketCategory::all()->all();
        $operators = Operator::all()->all();

        for ($i = 0; $i < $count; $i++) {
            $ticket = app(CreateTicketAction::class)(fake()->randomElement($ticketCategories));

            fake()->boolean(30) && app(BindTicketAction::class)($ticket, fake()->randomElement($operators));

            app(IncrementTicketInitialWeightAction::class)($ticket, fake()->numberBetween(0, 100000));
            app(IncrementTicketWeightIncrementAction::class)($ticket, fake()->numberBetween(0, 1000));
            app(IncrementTicketComplexityAction::class)($ticket, fake()->randomElement([10, 25, 50, 75, 100]));
            fake()->boolean(10) && app(IncrementTicketDelayAction::class)($ticket, fake()->numberBetween(1, 10) * 60);
        }
    }
}
