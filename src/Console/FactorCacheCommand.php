<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\Command;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'factor:cache')]
class FactorCacheCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'factor:cache';

    /**
     * The name of the console command.
     *
     * This name is used to identify the command during lazy loading.
     *
     * @var string|null
     *
     * @deprecated
     */
    protected static $defaultName = 'factor:cache';

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
        return [];
    }
}
