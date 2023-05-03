<?php

use Illuminate\Support\Facades\Route;
use TTBooking\TicketAllocator\Http\Controllers\FactorController;
use TTBooking\TicketAllocator\Http\Controllers\OperatorController;
use TTBooking\TicketAllocator\Http\Controllers\TeamController;
use TTBooking\TicketAllocator\Http\Controllers\TicketCategoryController;

/*Route::prefix('api/v1')->name('api.')->group(function () {
    Route::apiResource('factors', 'FactorController');
});*/

Route::get('/', 'DashboardController@index')->name('index');

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', 'DashboardController@supervisor')->name('supervisor');
});

Route::resource('operators', OperatorController::class);
Route::put('/operators', 'OperatorController@discover')->name('operators.discover');
Route::patch('/operators/{operator}/ready', 'OperatorController@ready')->name('operators.ready');

Route::resource('teams', TeamController::class)->withTrashed(['show', 'edit', 'update', 'destroy']);

Route::resource('ticket-categories', TicketCategoryController::class);

Route::resource('factors', FactorController::class)->withTrashed(['show', 'edit', 'update', 'destroy']);
Route::put('/factors/{factor}/raise-priority', 'FactorController@raisePriority')->withTrashed()->name('factors.raise-priority');
Route::put('/factors/{factor}/lower-priority', 'FactorController@lowerPriority')->withTrashed()->name('factors.lower-priority');

Route::prefix('tickets/{ticket}')->name('tickets.')->group(function () {
    Route::patch('/weight', 'TicketController@weight')->name('weight');
    Route::patch('/handler', 'TicketController@handler')->name('handler');
    Route::delete('/', 'TicketController@close')->name('close');
});
