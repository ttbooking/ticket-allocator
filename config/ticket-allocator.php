<?php

use TTBooking\TicketAllocator\Http\Middleware\HandleInertiaRequests;
use TTBooking\TicketAllocator\Http\Middleware\NotifyInvalidProps;

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

    'middleware' => ['web', 'auth', HandleInertiaRequests::class, NotifyInvalidProps::class],

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Triage Schedule
    |--------------------------------------------------------------------------
    */

    'triage_schedule' => env('TA_TRIAGE_SCHEDULE', '* * * * *'),

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Snapshot Schedule
    |--------------------------------------------------------------------------
    */

    'snapshot_schedule' => env('TA_SNAPSHOT_SCHEDULE', '0 0 * * *'),

    /*
    |--------------------------------------------------------------------------
    | Ticket Allocator Metric Factors
    |--------------------------------------------------------------------------
    */

    'enable_factor_discovery' => env('TA_DISCOVER_FACTORS', true),

    'discover_factors_within' => [
        app_path('Factors'),
    ],

    'factor_discovery_base_path' => base_path(),

    'factors' => [
        TTBooking\TicketAllocator\Factors\Category::class,
        TTBooking\TicketAllocator\Factors\Expression::class,
        TTBooking\TicketAllocator\Factors\Fixed::class,
        TTBooking\TicketAllocator\Factors\Manual::class,
        TTBooking\TicketAllocator\Factors\Random::class,
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

    'display_options' => [
        'duration_threshold' => env('TA_DURATION_THRESHOLD', 1800),
        'weight_threshold' => env('TA_WEIGHT_THRESHOLD', 360_000),
    ],

];
