<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(
    name: 'matcher:clear',
    description: 'Clear all cached matchers',
)]
class MatcherClearCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'matcher:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all cached matchers';

    /**
     * Execute the console command.
     */
    public function handle(Filesystem $files): void
    {
        $files->delete($this->laravel->getCachedMatchersPath());

        $this->components->info('Cached matchers cleared successfully.');
    }
}
