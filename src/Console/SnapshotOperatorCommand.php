<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\Domain\Operator\OperatorAggregateRoot;
use TTBooking\TicketAllocator\Domain\Operator\Projections\Operator;

#[AsCommand(
    name: 'ticket-allocator:snapshot-operator',
    description: 'Make snapshot(s) of operator aggregate root(s)',
)]
class SnapshotOperatorCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ticket-allocator:snapshot-operator {uuid?* : Operator UUID(s)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make snapshot(s) of operator aggregate root(s)';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        /** @var string[] $uuids */
        $uuids = $this->argument('uuid') ?: Operator::all()->modelKeys();

        foreach ($uuids as $uuid) {
            OperatorAggregateRoot::retrieve($uuid)->snapshot();
        }

        $this->info('Snapshots successfully created.');
    }
}
