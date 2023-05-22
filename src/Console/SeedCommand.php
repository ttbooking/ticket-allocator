<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\Database\Seeders\DatabaseSeeder;

#[AsCommand(
    name: 'ticket-allocator:seed',
    description: 'Seed ticket allocator tables using event sourced approach',
)]
class SeedCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'ticket-allocator:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed ticket allocator tables using event sourced approach';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->call('db:seed', ['class' => DatabaseSeeder::class]);
    }
}
