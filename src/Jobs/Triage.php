<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\BindTicketAction;
use TTBooking\TicketAllocator\Domain\Ticket\Actions\SetTicketMetaValueAction;
use TTBooking\TicketAllocator\Support\MatchQuery;

class Triage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    /**
     * Execute the job.
     */
    public function handle(BindTicketAction $bindTicket, SetTicketMetaValueAction $setTicketMetaValue): void
    {
        $query = MatchQuery::make();

        while (! is_null($pair = $query->first())) {
            $bindTicket($pair['ticket_uuid'], $pair['operator_uuid']);
            $setTicketMetaValue($pair['ticket_uuid'], 'triage', true);
        }
    }
}
