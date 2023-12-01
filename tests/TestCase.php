<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Tests;

use Orchestra\Testbench\TestCase as OrchestraTestCase;
use TTBooking\TicketAllocator\TicketAllocator;
use TTBooking\TicketAllocator\TicketAllocatorServiceProvider;

abstract class TestCase extends OrchestraTestCase
{
    protected function getPackageProviders($app): array
    {
        return [TicketAllocatorServiceProvider::class];
    }

    protected function getPackageAliases($app): array
    {
        return ['TicketAllocator' => TicketAllocator::class];
    }

    protected function getEnvironmentSetUp($app): void
    {
        //
    }
}
