<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Meeting;
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

    public function myApplications(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            return Application::where('student_id', $user->id)->get();
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function apllicationsToMeeting($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $meeting = Meeting::find($id);
            if ($meeting){
                if ($user->student || $user->teacher) {
                    $pair = Pair::where('student_id', $user->id)->where('teacher_id', $meeting->teacher_id)->first();
                    if ($pair || $user->id == $meeting->teacher_id) {
                        return Application::where('meeting_id', $id)->get();
                    }
                    return response()->json([
                        'message' => 'You are not a student of this teacher and this meeting is not yours'
                    ], 401);
                }
                else {
                    return response()->json([
                        'message' => 'You are not a student or a teacher'
                    ], 400);
                }
            }
            return response()->json([
                'message' => 'Meeting not found'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function applyToMeeting($id, Request $request){
        $user = User::find($request->uid);

        if ($user) {
            $meeting = Meeting::find($id);
            if (!$meeting) {
                return response()->json([
                    'message' => 'Meeting not found'
                ], 404);
            }

            if ($user->student) {
                $application = Application::where('student_id', $user->id)->where('meeting_id', $id)->first();
                if ($application) {
                    return response()->json([
                        'message' => 'You have already applied'
                    ], 400);
                }
                $count = count(Application::where('meeting_id', $id)->get());
                if ($count >= $meeting->count) {
                    return response()->json([
                        'message' => 'Meeting is already full'
                    ], 409);
                }

                return Application::create([
                    'student_id' => $user->id,
                    'meeting_id' => $id,
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

    public function acceptApplication($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $application = Application::find($id);
            if (!$application) {
                return response()->json([
                    'message' => 'Application not found'
                ], 404);
            }

            if ($user->teacher) {
                $pair = Pair::where('student_id', $application->student_id)->where('teacher_id', $user->id)->first();
                if ($pair){
                    $meeting = Meeting::where('teacher_id', $user->id);
                    if ($meeting) {
                        $application->accepted = true;
                        $application->save();
                        return $application;
                    }
                    return response()->json([
                        'message' => 'This is not your meeting'
                    ], 400);
                }
                return response()->json([
                    'message' => 'This is not your student'
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

    public function delete($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $application = Application::find($id);
            if (!$application) {
                return response()->json([
                    'message' => 'Application not found'
                ], 404);
            }

            if ($user->teacher) {
                $pair = Pair::where('student_id', $application->student_id)->where('teacher_id', $user->id)->first();
                if ($pair){
                    $meeting = Meeting::where('teacher_id', $user->id);
                    if ($meeting) {
                        $application->delete();
                        return response()->json([
                            'message' => 'Application deleted successfully'
                        ], 400);
                    }
                    return response()->json([
                        'message' => 'This is not your meeting'
                    ], 400);
                }
                return response()->json([
                    'message' => 'This is not your student'
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
