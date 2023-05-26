<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\Models\Factor;
use TTBooking\TicketAllocator\TicketAllocator;

#[AsCommand(
    name: 'factor:install',
    description: 'Instantiate eligible ticket metric factors',
)]
class FactorInstallCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'factor:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Instantiate eligible ticket metric factors';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        TicketAllocator::factors()->instances()->each(
            static fn (array $attributes) => Factor::create($attributes)
        );

        $this->components->info('Factor instances created successfully.');
    }
}
