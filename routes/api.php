<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\CategoryController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

Route::prefix('category')->group(function () {
    Route::get('show', [CategoryController::class, 'show']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::put('update/{id}', [CategoryController::class, 'update']);
    Route::get('get/{id}', [CategoryController::class, 'get']);
    Route::delete('delete/{id}', [CategoryController::class, 'delete']);
});

Route::prefix('items')->group(function () {
    Route::get('show', [ItemController::class, 'show']);
    Route::post('store', [ItemController::class, 'store']);
    Route::put('update/{id}', [ItemController::class, 'update']);
    Route::get('get/{id}', [ItemController::class, 'get']);
    Route::delete('delete/{id}', [ItemController::class, 'delete']);
    Route::get('restore/{id}', [ItemController::class, 'restore']);
    Route::delete('destroy/{id}', [ItemController::class, 'destroy']);
});

Route::prefix('reports')->group(function () {
    Route::get('show', [ReportController::class, 'show']);
    Route::post('store', [ReportController::class, 'store']);
    Route::put('update/{id}', [ReportController::class, 'update']);
    Route::delete('delete/{id}', [ReportController::class, 'delete']);
    Route::delete('destroy/{id}', [ReportController::class, 'destroy']);
    Route::post('restore/{id}', [ReportController::class, 'restore']);
    Route::get('get/{id}', [ReportController::class, 'get']);
});

Route::prefix('cities')->group(function () {
    Route::post('store', [CityController::class, 'store']);
    Route::get('show', [CityController::class, 'show']);
    Route::get('get/{id}', [CityController::class, 'get']);
    Route::put('update/{id}', [CityController::class, 'update']);
    Route::delete('delete/{id}', [CityController::class, 'delete']);
});
