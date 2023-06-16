<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputOption;
use TTBooking\TicketAllocator\TicketAllocator;

#[AsCommand(
    name: 'make:matcher',
    description: 'Create a new matcher class',
)]
class MatcherMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:matcher';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new matcher class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Matcher';

    /**
     * Execute the console command.
     *
     * @return false|null
     *
     * @throws FileNotFoundException
     */
    public function handle(): ?bool
    {
        if (false !== $result = parent::handle()) {
            $this->laravel->matchersAreCached() && $this->call('matcher:cache');
            TicketAllocator::invalidateProps();
        }

        return $result;
    }

    /**
     * Determine if the class already exists.
     */
    protected function alreadyExists($rawName): bool
    {
        return class_exists($rawName) || parent::alreadyExists($rawName);
    }

    /**
     * Get the stub file for the generator.
     */
    protected function getStub(): string
    {
        return $this->resolveStubPath('/stubs/matcher.stub');
    }

    /**
     * Resolve the fully-qualified path to the stub.
     */
    protected function resolveStubPath(string $stub): string
    {
        return file_exists($customPath = $this->laravel->basePath(trim($stub, '/')))
            ? $customPath
            : __DIR__.'/../..'.$stub;
    }

    /**
     * Get the default namespace for the class.
     */
    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace.'\TicketAllocator\Matchers';
    }

    /**
     * Get the console command options.
     */
    protected function getOptions(): array
    {
        return [
            ['force', 'f', InputOption::VALUE_NONE, 'Create the class even if the matcher already exists'],
        ];
    }
}
