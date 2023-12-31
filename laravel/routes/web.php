<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PairController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\MailController;
use App\Http\Middleware\JwtAuthMiddleware;
use App\Http\Middleware\RestrictByDomain;

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

Route::get('/api/test/{id}', [TestController::class, "index"]);

Route::middleware([RestrictByDomain::class])->group(function () {
    Route::get('/api/mail/{key}', [MailController::class, 'send']);
});


Route::middleware([JwtAuthMiddleware::class])->group(function () {
    //todos
    Route::get('/api/todos', [TodoController::class, "index"]);
    Route::get('/api/alltodos', [TodoController::class, "getAll"]);
    Route::get('/api/todos/student/{student_id}', [TodoController::class, "getAllByUserId"]);
    Route::get('/api/todos/get/{id}', [TodoController::class, "getById"]);
    Route::post('/api/todos/store/{id}', [TodoController::class, "store"]);
    Route::delete('/api/todos/delete/{id}', [TodoController::class, "delete"]);

    //users
    Route::get('/api/users', [UserController::class, "index"]);
    Route::get('/api/users/me', [UserController::class, "getMe"]);
    Route::get('/api/users/search/{expr}', [UserController::class, "search"]);
    Route::get('/api/users/get/{id}', [UserController::class, "getById"]);
    Route::get('/api/users/teachers', [UserController::class, "getAllTeachers"]);
    Route::post('/api/users/store/{id}', [UserController::class, "store"]);
    Route::post('/api/users/update-own', [UserController::class, "updateOwnProfile"]);
    Route::delete('/api/users/delete/{id}', [UserController::class, "delete"]);

    //pairs
    Route::get('/api/allpairs', [PairController::class, "index"]);
    Route::get('/api/pairs/my-pairs', [PairController::class, "myPairs"]);
    Route::get('/api/pairs/my-students', [PairController::class, "myStudents"]);
    Route::get('/api/pairs/my-teachers', [PairController::class, "myTeachers"]);
    Route::post('/api/pairs/apply-to-teacher/{t_id}', [PairController::class, "applyToTeacher"]);
    Route::patch('/api/pairs/accept-student/{s_id}', [PairController::class, "acceptStudent"]);
    Route::delete('/api/pairs/delete/{id}', [PairController::class, "delete"]);

    //meetings
    Route::get('/api/allmeetings', [MeetingController::class, "index"]);
    Route::get('/api/meetings/my-meetings/teacher/{all}', [MeetingController::class, "myMeetingsTeacher"]);
    Route::get('/api/meetings/of-teacher/{id}/{all}', [MeetingController::class, "meetingsOfTeacher"]);
    Route::get('/api/meetings/my-meetings/student/{all}', [MeetingController::class, "myMeetingsStudent"]);
    Route::get('/api/meetings/meeting/{id}', [MeetingController::class, "getById"]);
    Route::post('/api/meetings/store/{id}', [MeetingController::class, "store"]);
    Route::delete('/api/meetings/delete/{id}', [MeetingController::class, "delete"]);

    //applications
    Route::get('/api/allapplications', [ApplicationController::class, "index"]);
    Route::get('/api/applications', [ApplicationController::class, "myApplications"]);
    Route::get('/api/applications/meeting/{id}', [ApplicationController::class, "apllicationsToMeeting"]);
    Route::post('/api/applications/apply-to/{id}', [ApplicationController::class, "applyToMeeting"]);
    Route::patch('/api/applications/accept/{id}', [ApplicationController::class, "acceptApplication"]);
    Route::delete('/api/applications/delete/{id}', [ApplicationController::class, "delete"]);

    //chat
    Route::post('/api/chat/send-to/{uid}', [ChatMessageController::class, "sendTo"]);
    Route::get('/api/chat/messages-from/{uid}', [ChatMessageController::class, "messagesFrom"]);
    Route::get('/api/chat/get-new-messages/{uid}/{last_id}', [ChatMessageController::class, "getNewMessages"]);
});





