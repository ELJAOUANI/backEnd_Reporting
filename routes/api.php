<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;


Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);
});


Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class,'index']);
    Route::post('store', [CategoryController::class,'store']);
    Route::put('update/{id}', [CategoryController::class,'update']);
    Route::get('get/{id}', [CategoryController::class,'get']);
    Route::delete('delete/{id}', [CategoryController::class,'delete']);
});
