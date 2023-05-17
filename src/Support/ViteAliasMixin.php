<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Closure;
use Illuminate\Foundation\Vite;

/**
 * @mixin Vite
 */
class ViteAliasMixin
{
    /**
     * @return Closure(array{component: string} $page): $this
     */
    protected function ticketAllocatorEntryPoint(): Closure
    {
        return fn (array $page): static => $this
            ->useHotFile('vendor/ticket-allocator/hot')
            ->useBuildDirectory('vendor/ticket-allocator/build')
            ->withEntryPoints(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"]);
    }

    /**
     * @return Closure(string $asset): string
     */
    protected function ticketAllocatorImage(): Closure
    {
        return fn (string $asset): string => $this
            ->useHotFile('vendor/ticket-allocator/hot')
            ->useBuildDirectory('vendor/ticket-allocator/build')
            ->asset("resources/images/$asset");
    }
}
