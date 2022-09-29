<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\Domain\Operator\OperatorAggregateRoot;

#[AsCommand(name: 'ticket-allocator:snapshot-operator')]
class SnapshotOperatorCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ticket-allocator:snapshot-operator {uuid : Operator UUID}';

    /**
     * The name of the console command.
     *
     * This name is used to identify the command during lazy loading.
     *
     * @var string|null
     *
     * @deprecated
     */
    protected static $defaultName = 'ticket-allocator:snapshot-operator';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make snapshot(s) of operator aggregate root(s)';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        OperatorAggregateRoot::retrieve($this->argument('uuid'))->snapshot();
    }
}
