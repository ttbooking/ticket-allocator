<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::apiResource('factors', 'FactorController');
});

Route::get('/', 'HomeController@index')->name('index');

// Catch-all Route...
//Route::get('/{view?}', 'HomeController@index')->where('view', '(.*)')->name('index');
