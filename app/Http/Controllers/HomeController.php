<?php

namespace App\Http\Controllers;

use Request;
//use App\Models\Setting;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $display_type = 'admin';
        return view('welcome',compact('display_type'));

        // $setting = Setting::first();
        // if(Request::is('admin/*')){
        //     $display_type = 'admin';
        //     return view('welcome',compact('display_type','setting'));
        // }
        // elseif(Request::is('masjidadmin/*')){
        //     $display_type = 'masjidadmin';
        //     return view('welcome',compact('display_type','setting'));
        // }
        // else{
        //     $display_type = 'frontend';
        //     return view('welcome',compact('display_type','setting'));
        // }
    }


}
