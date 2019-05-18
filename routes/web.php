<?php


Route::get('/', function () {
    return view('index');
});

Route::get('/game/play', 'AppController@index');
Route::get('/instructions','AppController@index');
Route::get('/game', 'AppController@index');
Auth::routes();


// facebook login
Route::get('auth/facebook', 'Auth\FacebookController@redirectToFacebook');
Route::get('/auth/facebook/callback', 'Auth\FacebookController@handleFacebookCallback');


// get requests
Route::get('/checkauth', 'AppController@checkAuth');
Route::get('/getuserdata','AppController@getUserData');

Route::post('/postwinner', 'AppController@addWinner');
