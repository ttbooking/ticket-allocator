<?php

namespace TTBooking\TicketAllocator\Matchers;

Matcher::query()
    ->whereIn('category', [
        '080f51a5-9fa6-3b93-adb7-ad5a6bdaedba',
        '2782bdd0-8995-3e22-a8b4-5d06ebea80f1',
    ])
    ->where('group', static fn (Matcher $query) => $query           // whereGroup alias, where w/o "group"
        ->where('import', '42213844-f8a4-3428-9536-cb3262026372')
        ->orWhere('time_until_departure', '<', 3600)
    )
    ->orWhereBetween('weight', [1000, 5000])
    ->getQuery();
