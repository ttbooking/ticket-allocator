<?php

use Illuminate\Support\Facades\Route;

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

// Catch-all Route...
//Route::get('/{view?}', 'HomeController@index')->where('view', '(.*)')->name('index');
