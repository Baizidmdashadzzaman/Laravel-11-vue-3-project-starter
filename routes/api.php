<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Backend\{
    Admin\Auth\AuthController,AztokenController,SettingController,ReuseableController
};

use App\Http\Middleware\AdminMiddleware;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::controller(AztokenController::class)->group(function(){
    Route::post('/get-aztoken','get_aztoken');
});

Route::controller(AuthController::class)->group(function(){
    Route::post('/login','authenticate');
    Route::post('/register','register');
    Route::post('/request-password-reset','request_password_reset');
});

//reuseable route start
Route::controller(ReuseableController::class)->prefix('reuseable')->group(function(){
    Route::get('/dashboard-data','dashboard_data');
    Route::get('/setting','setting');
    Route::get('/category-list','category_list');
    Route::get('/subcategory-list-category-wise/{id}','subcategory_list_category_wise');
    Route::get('/subsubcategory-list-subcategory-wise/{id}','subsubcategory_list_subcategory_wise');
    Route::get('/brand-list','brand_list');
    Route::get('/producttype-list','producttype_list');
    Route::get('/origincountry-list','origincountry_list');

    Route::get('/customer-list','customer_list');
    Route::get('/product-list','product_list');
    Route::get('/color-list','color_list');
    Route::get('/size-list','size_list');
    Route::get('/bondsize-list','bondsize_list');
    Route::get('/cupsize-list','cupsize_list');
    Route::get('/delivarycharge-list','delivarycharge_list');

    Route::get('/search/{id}', 'search');
});
//reuseable route end

Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function(){
    //user data route start
    Route::controller(AuthController::class)->group(function(){
        Route::post('/logout','logout');
        Route::get('/userinfo','userinfo');
    });
    //user data route end

    //setting route start
    Route::controller(SettingController::class)->prefix('setting')->group(function(){
        Route::get('/setting','setting');
        Route::post('/update','update');
    });
    //setting route end


    //secureapitoken route start
    Route::controller(AztokenController::class)->prefix('aztoken')->group(function(){
        require('baseroute.php');
    });
    //secureapitoken route end



});
