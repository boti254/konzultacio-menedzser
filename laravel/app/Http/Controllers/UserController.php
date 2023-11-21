<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = User::find($request->uid);
        if ($user && $user->admin) {
            return User::all();
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }

    public function getMe(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            return $user;
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function search($expr, Request $request) {
        $user = User::find($request->uid);
        if ($user && $user->admin) {
            return User::where('name', 'LIKE', '%'.$expr.'%')->get();
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }

    public function getAllTeachers(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            return User::where('teacher', true)->where('id', '!=', $user->id)->get();
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }

    public function getById($id, Request $request) {
        $user = User::find($request->uid);
        if ($user && ($user->admin || $id == $request->uid)) {
            $user_to_find = User::find($id);
            if ($user_to_find) {
                return $user_to_find;
            }
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }

    public function updateOwnProfile(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $req_array = [
                'name' => $user->name,
                'email' => $request->email,
                //'password' => Hash::make($request->password),
                'neptun' => $user->neptun,
                'student' => $user->student,
                'teacher' => $user->teacher,
                'admin' => $user->admin,
            ];
            $user->update($req_array);
            return $user;
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);

    }

    public function store(Request $request) {
        $user = User::find($request->uid);
        if ($user && $user->admin) {
            $new_user = null;


            if ($request->id == 0) {
                $req_array = [
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'neptun' => $request->neptun,
                    'student' => $request->student,
                    'teacher' => $request->teacher,
                    'admin' => $request->admin,
                ];
                $new_user = User::create($req_array);
            }
            else {
                $req_array = [
                    'name' => $request->name,
                    'email' => $request->email,
                    //'password' => Hash::make($request->password),
                    'neptun' => $request->neptun,
                    'student' => $request->student,
                    'teacher' => $request->teacher,
                    'admin' => $request->admin,
                ];
                if ($request->id != $request->uid){
                    $user_to_mod = User::find($request->id);
                    if ($user_to_mod){
                        $user_to_mod->update($req_array);
                        $new_user = $user_to_mod;
                    }
                    else{
                        return response()->json([
                            'message' => 'User not found'
                        ], 400);
                    }
                }
                else {
                    return response()->json([
                        'message' => 'Unauthorised'
                    ], 403);
                }

            }
            return $new_user;
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }

    public function delete($id, Request $request) {
        $user = User::find($request->uid);
        if ($user && $user->admin && $id != $request->uid) {
            $user_to_delete = User::find($id);
            if ($user_to_delete) {
                $user_to_delete->delete();
                return response()->json([
                    'message' => 'User deleted'
                ], 200);
            }
            return response()->json([
                'message' => 'User not found'
            ], 400);
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }
}
