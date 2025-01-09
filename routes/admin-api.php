<?php


use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Services\Acl;
/*
|--------------------------------------------------------------------------
| Admin Api Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\Admin\Api\AuthController;
use App\Http\Controllers\Admin\Api\UserController;
use App\Http\Controllers\Admin\Api\BankController;
use App\Http\Controllers\Admin\Api\CreditController;
Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    });
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/user/{id}/show', [UserController::class, 'show']);

    Route::get('/banks', [BankController::class, 'index']);

    Route::get('/credits', [CreditController::class, 'index']);
});
