<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;

class TestController extends Controller
{
    public function index($id){
        $test = Test::find($id);
        echo json_encode($test);
    }
}
