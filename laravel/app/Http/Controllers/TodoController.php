<?php

namespace App\Http\Controllers;

use App\Models\Pair;
use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            return Todo::all();
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function getById($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $todo = Todo::find($id);
            if (!$todo){
                return response()->json([
                    'message' => 'Item not found'
                ], 400);
            }
            if ($user->id == $todo->student_id
                || ($user->teacher && Pair::where('student_id', $todo->student_id)->where("teacher_id", $user->id)->first())
                || $user->admin
            ){
                return $todo;
            }
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function getAllByUserId($student_id, Request $request) {
        $user = User::find($request->uid);

        // if user logged in and either a student who wnats to get their own todos or a teacher getting their students todos or user is admin
        if ($user &&
            ($user->id == $student_id
            || ($user->teacher && Pair::where('student_id', $student_id)->where("teacher_id", $user->id)->first())
            || $user->admin
            )) {
            return Todo::where('student_id', $student_id)->get();
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }



    public function store(Request $request) {
        $user = User::find($request->uid);
        if ($user) {

            $id = $request->id;
            $student_id = $request->student_id;
            $todo = Todo::find($id);

            //only if the user is a teacher and they are setting a todo for their own student
            if(($user->teacher && Pair::where('student_id', $student_id)->where("teacher_id", $user->id)->first()) || $user->admin){
                $req_array = [
                    'student_id' => $request->student_id,
                    'title' => $request->title,
                    'due' => $request->due,
                    'done' => $request->done,
                ];
                if ($id > 0) {
                    if ($todo){
                        $todo->update($req_array);
                    }
                    else{
                        return response()->json([
                            'message' => 'Item not found'
                        ], 400);
                    }
                }
                else {
                    $todo = Todo::create($req_array);
                }
            }

            else if ($id > 0 && $user->id == $todo->student_id){
                $req_array = [
                    'student_id' => $todo->student_id,
                    'title' => $todo->title,
                    'due' => $todo->due,
                    'done' => $request->done,
                ];

                $todo->update($req_array);
            }
            return $todo;
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }



    public function delete($id, Request $request) {
        $user = User::find($request->uid);
        $todo = Todo::find($id);
        if (!$todo){
            return response()->json([
                'message' => 'Item not found'
            ], 400);
        }
        if ($user && (($user->teacher && Pair::where('student_id', $todo->student_id)->where("teacher_id", $user->id)->first()) || $user->admin)) {
            Todo::find($id)->delete();
            return response()->json([
                'message' => 'Item deleted'
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorised'
        ], 403);
    }
}
