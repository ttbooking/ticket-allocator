<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(
    name: 'factor:clear',
    description: 'Clear all cached ticket metric factors',
)]
class FactorClearCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'factor:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all cached ticket metric factors';

    /**
     * Execute the console command.
     */
    public function handle(Filesystem $files): void
    {
        $files->delete($this->laravel->getCachedFactorsPath());

        $this->components->info('Cached factors cleared successfully.');
    }
}
