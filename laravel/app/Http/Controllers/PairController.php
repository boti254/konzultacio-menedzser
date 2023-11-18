<?php

namespace App\Http\Controllers;

use App\Models\Pair;
use App\Models\User;
use Illuminate\Http\Request;

class PairController extends Controller
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

    public function myPairs(Request $request){
        $user = User::find($request->uid);
        $my_pairs = [];
        if ($user) {
            $pairs = Pair::where('teacher_id', $user->id)->orWhere('student_id', $user->id)->get();
            foreach ($pairs as $pair){
                if ($pair->teacher_id == $user->id){
                    $my_pairs[] = [
                        "user" => User::find($pair->student_id),
                        "pair" => $pair,
                    ];
                }
                else {
                    $my_pairs[] = [
                        "user" => User::find($pair->teacher_id),
                        "pair" => $pair,
                    ];
                }

            }
            return $my_pairs;
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function myStudents(Request $request){
        $user = User::find($request->uid);
        $my_students = [];
        if ($user) {
            $pairs = Pair::where('teacher_id', $user->id)->get();
            foreach ($pairs as $pair){
                $my_students[] = [
                    "user" => User::find($pair->student_id),
                    "pair" => $pair,
                ];
            }
            return $my_students;
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function myTeachers(Request $request){
        $user = User::find($request->uid);
        $my_teachers = [];
        if ($user) {
            $pairs = Pair::where('student_id', $user->id)->get();
            foreach ($pairs as $pair){
                $my_teachers[] = [
                    "user" => User::find($pair->teacher_id),
                    "pair" => $pair,
                ];
            }
            return $my_teachers;
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function applyToTeacher($t_id, Request $request) {
        $user = User::find($request->uid);

        if ($user) {

            $teacher = User::find($t_id);
            if (!$teacher) {
                return response()->json([
                    'message' => 'Teacher not found'
                ], 400);
            }
            if ($teacher && !$teacher->teacher) {
                return response()->json([
                    'message' => 'Requested user is not a teacher'
                ], 400);
            }

            if ($user->student) {
                if ($user->id == $t_id){
                    return response()->json([
                        'message' => 'Cannot apply to yourself'
                    ], 400);
                }
                $pair = Pair::where('student_id', $user->id)->where('teacher_id', $t_id)->first();
                if ($pair) {
                    return response()->json([
                        'message' => 'You have already applied'
                    ], 400);
                }

                return Pair::create([
                    'student_id' => $user->id,
                    'teacher_id' => $t_id,
                    'accepted' => false,
                ]);
            }
            return response()->json([
                'message' => 'You are not a student'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function acceptStudent($s_id, Request $request) {
        $user = User::find($request->uid);

        if ($user) {
            $student = User::find($s_id);
            if (!$student) {
                return response()->json([
                    'message' => 'Student not found'
                ], 400);
            }
            if ($student && !$student->student) {
                return response()->json([
                    'message' => 'Requested user is not a student'
                ], 400);
            }

            if ($user->teacher) {
                $pair = Pair::where('student_id', $student->id)->where('teacher_id', $user->id)->first();

                if ($pair){
                    $pair->accepted = true;
                    $pair->save();
                    return $pair;
                }
                return response()->json([
                    'message' => 'Application not found'
                ], 400);

            }
            return response()->json([
                'message' => 'You are not a teacher'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function delete($s_id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            if ($user->teacher){
                $student = User::find($s_id);
                if ($student) {
                    $pair = Pair::where('student_id', $student->id)->where('teacher_id', $user->id)->first();
                    $pair_id = $pair->id;
                    if ($pair){
                        $pair->delete();
                        return response()->json([
                            'message' => 'Pair deleted successfully',
                            'pair_id' => $pair_id,
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'You don\'t have a sudent given in the request'
                    ], 400);
                }
                return response()->json([
                    'message' => 'Student not found'
                ], 400);
            }
            return response()->json([
                'message' => 'You are not a teacher'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }
}
