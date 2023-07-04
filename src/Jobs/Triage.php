<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\BindTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Support\Benchmark;
use TTBooking\TicketAllocator\Support\MatchQuery;

class Triage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    /**
     * Execute the job.
     */
    public function handle(BindTicketAction $bindTicket): void
    {
        $bench = new Benchmark;

        $query = MatchQuery::make();

        while (! is_null($pair = $bench->measure('Query', static fn () => $query->first()))) {
            $bench->measure('Binding',
                static fn () => $bindTicket($pair['ticket_uuid'], $pair['operator_uuid'], [Ticket::META_TRIAGE => true])
            );
        }

        info($bench);
    }

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return string[]
     */
    public function tags(): array
    {
        return ['ticket-allocator', 'ticket-allocator:triage'];
    }
}
