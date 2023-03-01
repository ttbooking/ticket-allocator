<?php

use TTBooking\TicketAllocator\Http\Middleware\HandleInertiaRequests;

return [

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Domain
    |--------------------------------------------------------------------------
    */

    'domain' => env('TA_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Path
    |--------------------------------------------------------------------------
    */

    'path' => env('TA_PATH', 'ticket-allocator'),

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Route Middleware
    |--------------------------------------------------------------------------
    */

    'middleware' => ['web', 'auth', HandleInertiaRequests::class],

    'ticket_origin' => '', // TODO: Enter your class from which tickets originate

    'factors' => [
        'expressive' => TTBooking\TicketAllocator\Domain\Ticket\Factors\ExpressiveFactor::class,
        'ticket.category' => TTBooking\TicketAllocator\Domain\Ticket\Factors\Category::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator User Model
    |--------------------------------------------------------------------------
    */

    'operator_source' => App\Models\User::class,

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Monitoring Options
    |--------------------------------------------------------------------------
    */

    'duration_threshold' => env('TA_DURATION_THRESHOLD', 1800),

    'weight_threshold' => env('TA_WEIGHT_THRESHOLD', 360_000),

];
