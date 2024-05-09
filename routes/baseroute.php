<?php
Route::get('/list', 'index');
Route::get('/list-all', 'index_all');
Route::post('/store', 'store');
Route::get('/edit/{id}', 'edit');
Route::post('/update/{id}', 'update');
Route::get('/delete/{id}', 'destroy');
Route::post('/search', 'search');
