<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use TTBooking\TicketAllocator\Domain\Operator\Actions\ResignOperatorAction;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\CloseTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\Projections\Ticket;

#[AsCommand(
    name: 'ticket-allocator:reap',
    description: 'Clean up ticket allocator tables using event sourced approach',
)]
class ReapCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'ticket-allocator:reap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up ticket allocator tables using event sourced approach';

    protected ResignOperatorAction $resignOperator;

    protected CloseTicketAction $closeTicket;

    protected ProgressBar $bar;

    private const OPRSORT_NONE = 0;
    private const OPRSORT_PREF = 1;
    private const OPRSORT_PREF_REV = 2;

    private const TCKSORT_NONE = 0;
    private const TCKSORT_WGT = 1;
    private const TCKSORT_WGT_REV = 2;
    private const TCKSORT_DUR = 3;
    private const TCKSORT_DUR_REV = 4;

    /**
     * Execute the console command.
     */
    public function handle(ResignOperatorAction $resignOperator, CloseTicketAction $closeTicket): void
    {
        $this->resignOperator = $resignOperator;
        $this->closeTicket = $closeTicket;

        /** @var list<string> $entities */
        $entities = $this->choice(
            'Which entities should be reaped?',
            ['Operators', 'Tickets'], '0,1',
            multiple: true,
        );

        $operators = in_array('Operators', $entities, true);
        $tickets = in_array('Tickets', $entities, true);
        $withTickets = false;

        if ($operators && $tickets) {
            $first = $this->choice(
                'What should be reaped first?',
                ['Operators', 'Tickets', 'Alternate'], 2,
            );

            if ($first === 'Tickets') {
                $entities = ['Tickets', 'Operators'];
            } elseif ($first === 'Alternate') {
                $entities = ['Operators'];
                $withTickets = true;
            }
        }

        $count = 0;
        $sort = [];
        if ($operators) {
            $count += Operator::query()->count();
            $choices = ["Doesn't matter", 'Preferable first', 'Preferable last'];
            $sort['Operators'] = array_search(
                $this->choice('In what order operators should be reaped?', $choices, 2),
                $choices, true
            );
        }
        if ($tickets) {
            $count += Ticket::query()->count();
            $choices = ["Doesn't matter", 'Significant first', 'Significant last', 'Protracted first', 'Protracted last'];
            $sort['Tickets'] = array_search(
                $this->choice('In what order tickets should be reaped?', $choices, 2),
                $choices, true
            );
        }

        if ($count > 0) {
            $this->bar = $this->output->createProgressBar($count);
            $this->bar->start();

            foreach ($entities as $entity) {
                $this->{"reap$entity"}(null, $sort[$entity] ?? 0, $withTickets ? ($sort['Tickets'] ?? null) : null);
            }

            $this->bar->finish();
            $this->newLine(2);

            $this->components->info('Reaping finished.');
        } else {
            $this->components->warn('Nothing to reap!');
        }

        if ($this->confirm('Do you want to do clean up afterwards?')) {
            $this->call('ticket-allocator:clean');
        }
    }

    /**
     * @param  Collection<array-key, Operator>|null  $operators
     * @param  int  $sort
     * @param  int|null  $sortTickets
     * @return void
     */
    protected function reapOperators(Collection $operators = null, int $sort = 0, int $sortTickets = null): void
    {
        $operators ??= Operator::all();

        if ($sort !== self::OPRSORT_NONE) {
            $operators = $operators->sortBy([
                ['online', 'desc'],
                ['ready', 'desc'],
                ['free_slots', 'desc'],
                ['bound_tickets', 'asc'],
                ['name', 'asc'],
            ]);

            if ($sort === self::OPRSORT_PREF_REV) {
                $operators = $operators->reverse();
            }
        }

        if ($sort !== self::OPRSORT_PREF_REV && $sortTickets !== null) {
            $this->reapTickets(Ticket::unbound()->get(), $sortTickets);
        }

        foreach ($operators as $operator) {
            if ($sortTickets !== null) {
                $this->reapTickets($operator->tickets, $sortTickets);
            }
            ($this->resignOperator)($operator);
            $this->bar->advance();
        }

        if ($sort === self::OPRSORT_PREF_REV && $sortTickets !== null) {
            $this->reapTickets(Ticket::unbound()->get(), $sortTickets);
        }
    }

    /**
     * @param  Collection<array-key, Ticket>|null  $tickets
     * @param  int  $sort
     * @return void
     */
    protected function reapTickets(Collection $tickets = null, int $sort = 0): void
    {
        $tickets ??= Ticket::all();

        if ($sort !== self::TCKSORT_NONE) {
            if ($sort === self::TCKSORT_WGT || $sort === self::TCKSORT_WGT_REV) {
                $tickets = $tickets->sortBy([['weight', 'desc']]);
            } else {
                $tickets = $tickets->sortBy([['duration', 'desc']]);
            }

            if ($sort === self::TCKSORT_WGT_REV || $sort === self::TCKSORT_DUR_REV) {
                $tickets = $tickets->reverse();
            }
        }

        foreach ($tickets as $ticket) {
            ($this->closeTicket)($ticket);
            $this->bar->advance();
        }
    }
}
