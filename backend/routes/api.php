<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/login/', [AuthController::class, 'login']);
Route::post('/logout/', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me/', [AuthController::class, 'me'])->middleware('auth:sanctum');

Route::get('/getTopPageUser', [UserController::class, 'getTopPageUser'])->middleware('auth:sanctum');
Route::get('/users/search', [UserController::class, 'search']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/rankings', [RankingController::class, 'index']);

Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth:sanctum');
Route::put('/profile', [ProfileController::class, 'update'])->middleware('auth:sanctum');
