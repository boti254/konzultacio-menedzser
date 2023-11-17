<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\JwtAuthMiddleware;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::post('/api/login', [LoginController::class, "login"]);
Route::get('/api/logout', [LoginController::class, "logout"]);

Route::get('/', function () { return view('welcome'); });

//This route is used for test only, no actual functionality.
Route::get('/api/test/{id}', [TestController::class, "index"]);

Route::middleware([JwtAuthMiddleware::class])->group(function () {
    //todos
    Route::get('/api/todos', [TodoController::class, "index"]);
    Route::get('/api/todos/student/{student_id}', [TodoController::class, "getAllByUserId"]);
    Route::get('/api/todos/get/{id}', [TodoController::class, "getById"]);
    Route::post('/api/todos/store/{id}', [TodoController::class, "store"]);
    Route::delete('/api/todos/delete/{id}', [TodoController::class, "delete"]);

    //users
    Route::get('/api/users', [UserController::class, "index"]);
    Route::get('/api/users/search/{expr}', [UserController::class, "search"]);
    Route::get('/api/users/get/{id}', [UserController::class, "getById"]);
    Route::post('/api/users/store/{id}', [UserController::class, "store"]);
    Route::post('/api/users/update-own', [UserController::class, "updateOwnProfile"]);
    Route::delete('/api/users/delete/{id}', [UserController::class, "delete"]);
});





