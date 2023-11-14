<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index() {
        $user = User::find(Auth::id());
        if ($user) {
            return Todo::all();
        }
        return response()->json([
            'message' => 'Please log in.'
        ], 403);
    }
}
