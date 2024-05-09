<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\HomeController;

Route::get('{any}', [HomeController::class, 'index'])->where('any', '.*');

