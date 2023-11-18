<?php

namespace App\Http\Controllers;

use App\Models\Pair;
use App\Models\User;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            if ($user->admin){
                return Pair::all();
            }
            return response()->json([
                'message' => 'Unauthorised'
            ], 401);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

}
