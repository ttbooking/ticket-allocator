<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="{{ Vite::ticketAllocatorImage('favicon.png') }}" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=nunito:400,500,600&display=swap" />
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=lobster:400&display=swap" />

        <!-- Scripts -->
        @routes
        @vite('resources/js/app.js')
        {{ Vite::ticketAllocatorEntryPoint($page) }}
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
