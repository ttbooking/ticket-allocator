<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\Domain\Operator\Actions\ResignOperatorAction;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\CloseTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

#[AsCommand(name: 'ticket-allocator:reap')]
class ReapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ticket-allocator:reap
        {entity=both : "operators", "tickets" or "both"}
        {--from=alt : "operators", "tickets" or "alt"}
        {--osort=none : ["none", "dir" or "rev"]}
        {--tsort=none : "none", "dir" or "rev"}
        {--sort=none : "none", "dir" or "rev"}
        {--cleanup : Clean up non-ES tables}';

    /**
     * The name of the console command.
     *
     * This name is used to identify the command during lazy loading.
     *
     * @var string|null
     *
     * @deprecated
     */
    protected static $defaultName = 'ticket-allocator:reap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up ticket allocator tables using event sourced approach';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $entity = $this->argument('entity');
        $from = $this->option('from');
        $osort = $this->option('sort') ?? $this->option('osort');
        $tsort = $this->option('sort') ?? $this->option('tsort');
        $cleanup = $this->option('cleanup');

        if ($entity === 'operators' || $entity === 'both') {
            $operators = Operator::all();

            if ($osort !== 'none') {
                $operators = $operators->sortBy([
                    ['online', 'desc'],
                    ['ready', 'desc'],
                    ['free_slots', 'desc'],
                    ['bound_tickets', 'asc'],
                    ['name', 'asc'],
                ]);

                if ($osort === 'rev') {
                    $operators = $operators->reverse();
                }
            }

            foreach ($operators as $operator) {
                app(ResignOperatorAction::class)($operator);
            }
        }

        if ($entity === 'tickets' || $entity === 'both') {
            $tickets = Ticket::all();

            if ($tsort !== 'none') {
                $tickets = $tickets->sortBy([['weight']]);

                if ($tsort === 'rev') {
                    $tickets = $tickets->reverse();
                }
            }

            foreach ($tickets as $ticket) {
                app(CloseTicketAction::class)($ticket);
            }
        }

        if ($cleanup) {
            $this->call('ticket-allocator:clean');
        }
    }
}
