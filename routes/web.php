<?php

use Illuminate\Support\Facades\Route;
use TTBooking\TicketAllocator\Http\Controllers\OperatorController;
use TTBooking\TicketAllocator\Http\Controllers\TeamController;

Route::prefix('api/v1')->name('api.')->group(function () {
    Route::apiResource('factors', 'FactorController');

    Route::prefix('operators/{operator}')->group(function () {
        Route::name('ready')->patch('/ready', 'SupervisorController@ready');
    });

    Route::prefix('tickets/{ticket}')->group(function () {
        Route::name('weight')->patch('/weight', 'SupervisorController@weight');
        Route::name('handler')->patch('/handler', 'SupervisorController@handler');
        Route::name('close')->delete('/', 'SupervisorController@close');
    });
});

Route::get('/', 'HomeController@index')->name('index');

Route::resource('operators', OperatorController::class);
Route::resource('teams', TeamController::class)->withTrashed(['show', 'edit', 'update', 'destroy']);

Route::get('users', 'UserController@index');

// Catch-all Route...
//Route::get('/{view?}', 'HomeController@index')->where('view', '(.*)')->name('index');
