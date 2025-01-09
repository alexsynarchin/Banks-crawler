<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\Api\BankController;

Route::post('/banks/store-or-update', [BankController::class, 'storeOrUpdate']);

use App\Http\Controllers\Api\CrawlerController;

Route::post('/crawler/credits', [CrawlerController::class, 'crawlingCredits']);
Route::post('/crawler/banks', [CrawlerController::class, 'crawlingBanks']);

use App\Http\Controllers\Api\CreditController;

Route::post('/credits/store-or-update', [CreditController::class, 'storeOrUpdate']);
