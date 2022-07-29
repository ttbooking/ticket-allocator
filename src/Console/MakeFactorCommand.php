<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Console;

use Illuminate\Console\GeneratorCommand;

class MakeFactorCommand extends GeneratorCommand
{
    protected $name = 'make:factor';

    protected $description = 'Create a new factor';

    protected $type = 'Factor';

    protected function getStub(): string
    {
        return __DIR__.'/../../stubs/factor.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace.'\Factors';
    }
}
