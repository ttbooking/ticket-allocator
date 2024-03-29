<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;
use TTBooking\TicketAllocator\FactorServiceProvider;

#[AsCommand(
    name: 'factor:cache',
    description: 'Discover and cache ticket metric factors',
)]
class FactorCacheCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'factor:cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Discover and cache ticket metric factors';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->callSilent('factor:clear');

        file_put_contents(
            $this->laravel->getCachedFactorsPath(),
            '<?php return '.var_export($this->getFactors(), true).';'
        );

        $this->components->info('Factors cached successfully.');
    }

    /**
     * Get all the ticket metric factors configured for the application.
     */
    protected function getFactors(): array
    {
        return $this->laravel->getProvider(FactorServiceProvider::class)->getFactors(true);
    }
}
