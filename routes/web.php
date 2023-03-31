<?php

use Illuminate\Support\Facades\Route;
use TTBooking\TicketAllocator\Http\Controllers\OperatorController;
use TTBooking\TicketAllocator\Http\Controllers\TeamController;
use TTBooking\TicketAllocator\Http\Controllers\TicketCategoryController;

/*Route::prefix('api/v1')->name('api.')->group(function () {
    Route::apiResource('factors', 'FactorController');
});*/

Route::redirect('/', '/dashboard');

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', 'DashboardController@index')->name('index');

    Route::prefix('operators/{operator}')->group(function () {
        Route::patch('/ready', 'DashboardController@ready')->name('ready');
    });

    Route::prefix('tickets/{ticket}')->group(function () {
        Route::patch('/weight', 'DashboardController@weight')->name('weight');
        Route::patch('/handler', 'DashboardController@handler')->name('handler');
        Route::delete('/', 'DashboardController@close')->name('close');
    });
});

Route::resource('ticket-categories', TicketCategoryController::class);

Route::resource('operators', OperatorController::class);
Route::put('/operators', 'OperatorController@discover')->name('operators.discover');

Route::resource('teams', TeamController::class)->withTrashed(['show', 'edit', 'update', 'destroy']);
