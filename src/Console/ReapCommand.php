<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;
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
    protected $signature = 'ticket-allocator:reap';
    //{entity=both : "operators", "tickets" or "both"}
    //{--from=alt : "operators", "tickets" or "alt"}
    //{--osort=none : ["none", "dir" or "rev"]}
    //{--tsort=none : "none", "dir" or "rev"}
    //{--sort=none : "none", "dir" or "rev"}
    //{--cleanup : Clean up non-ES tables}';

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
     *
     * @return void
     */
    public function handle(): void
    {
        //$entity = $this->argument('entity');
        //$from = $this->option('from');
        //$osort = $this->option('sort') ?? $this->option('osort');
        //$tsort = $this->option('sort') ?? $this->option('tsort');
        //$cleanup = $this->option('cleanup');

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

        $sort = [];
        if ($operators) {
            $choices = ["Doesn't matter", 'Preferable first', 'Preferable last'];
            $sort['Operators'] = array_search(
                $this->choice('In what order operators should be reaped?', $choices, 2),
                $choices, true
            );
        }
        if ($tickets) {
            $choices = ["Doesn't matter", 'Significant first', 'Significant last', 'Protracted first', 'Protracted last'];
            $sort['Tickets'] = array_search(
                $this->choice('In what order tickets should be reaped?', $choices, 2),
                $choices, true
            );
        }

        foreach ($entities as $entity) {
            $this->{"reap$entity"}(null, $sort[$entity], $withTickets ? $sort['Tickets'] : null);
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
            app(ResignOperatorAction::class)($operator);
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
            app(CloseTicketAction::class)($ticket);
        }
    }
}
