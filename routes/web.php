<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::apiResource('factors', 'FactorController');

    Route::prefix('operators/{operator}')->group(function () {
        Route::patch('/ready', 'SupervisorController@ready');
    });

    Route::prefix('tickets/{ticket}')->group(function () {
        Route::patch('/weight', 'SupervisorController@weight');
        Route::patch('/handler', 'SupervisorController@handler');
        Route::delete('/', 'SupervisorController@close');
    });
});

Route::get('/', 'HomeController@index')->name('index');

// Catch-all Route...
//Route::get('/{view?}', 'HomeController@index')->where('view', '(.*)')->name('index');
