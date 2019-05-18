<?php

namespace App\Http\Controllers;

use http\Exception;
use Illuminate\Http\Request;
use Auth;
use App\User;
class AppController extends Controller
{

    public function index()
    {
        if (!Auth::check()) {
            return redirect('/');
        }
        else{
            return view('home');
        }
    }


    public function checkAuth(){
        return response()
            ->json(Auth::check());
    }

    public function getUserData(){
        $user = Auth::user();
        if(Auth::check()){
            return response()->json($user);
        }
    }


}
