<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'ticket-allocator:clean')]
class CleanCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'ticket-allocator:clean';

    /**
     * The name of the console command.
     *
     * This name is used to identify the command during lazy loading.
     *
     * @var string|null
     *
     * @deprecated
     */
    protected static $defaultName = 'ticket-allocator:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up ticket allocator tables';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $tables = [
            'snapshots',
            'stored_events',
            //'ticket_allocator_events',
            'ticket_allocator_factors',
            'ticket_allocator_operators',
            'ticket_allocator_operator_category',
            'ticket_allocator_operator_teams',
            'ticket_allocator_team_category',
            'ticket_allocator_team_operator',
            'ticket_allocator_tickets',
            'ticket_allocator_ticket_categories',
            'ticket_allocator_ticket_operator_stats',
        ];

        Schema::disableForeignKeyConstraints();

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        Schema::enableForeignKeyConstraints();
    }
}
