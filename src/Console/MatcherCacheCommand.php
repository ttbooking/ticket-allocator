<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\MatcherServiceProvider;

#[AsCommand(
    name: 'matcher:cache',
    description: 'Discover and cache matchers',
)]
class MatcherCacheCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'matcher:cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Discover and cache matchers';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->callSilent('matcher:clear');

        file_put_contents(
            $this->laravel->getCachedMatchersPath(),
            '<?php return '.var_export($this->getMatchers(), true).';'
        );

        $this->components->info('Matchers cached successfully.');
    }

    /**
     * Get all the matchers configured for the application.
     */
    protected function getMatchers(): array
    {
        return $this->laravel->getProvider(MatcherServiceProvider::class)->getMatchers(true);
    }
}
