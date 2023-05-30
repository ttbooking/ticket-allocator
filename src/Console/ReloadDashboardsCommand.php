<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\TicketAllocator;

#[AsCommand(
    name: 'ticket-allocator:reload-dashboards',
    description: 'Reload all monitoring dashboards',
)]
class ReloadDashboardsCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'ticket-allocator:reload-dashboards';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reload all monitoring dashboards';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        TicketAllocator::invalidateProps();
    }
}
