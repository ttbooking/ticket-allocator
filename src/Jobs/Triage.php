<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\BindTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot as Ticket;
use TTBooking\TicketAllocator\Support\MatchQuery;

class Triage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    /**
     * Execute the job.
     */
    public function handle(BindTicketAction $bindTicket): void
    {
        $query = MatchQuery::make();

        while (! is_null($pair = $query->first())) {
            $bindTicket($pair['ticket_uuid'], $pair['operator_uuid'], [Ticket::META_TRIAGE => true]);
        }
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
