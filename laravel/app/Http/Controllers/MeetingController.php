<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\ApplicationController;
use App\Models\Pair;

class MeetingController extends Controller
{
    public function index(Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            if ($user->admin){
                return Meeting::all();
            }
            return response()->json([
                'message' => 'Unauthorised'
            ], 401);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function myMeetingsTeacher($all, Request $request){
        $user = User::find($request->uid);
        if ($user) {
            if ($user->teacher){
                // Returns only the upcoming by default
                if ($all == 0){
                    return Meeting::where('teacher_id', $user->id)
                                  ->where('date', '>', Carbon::now())->get();
                }
                // Returns all if $all set to anything else than 0
                else {
                    return Meeting::where('teacher_id', $user->id)->get();
                }
            }
            return response()->json([
                'message' => 'You are not a teacher'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function myMeetingsStudent($all, Request $request){
        $user = User::find($request->uid);
        if ($user) {
            if ($user->student){
                $applications = (new ApplicationController)->myApplications($request);
                $meetings = [];
                foreach ($applications as $application){
                    $meeting = Meeting::find($application->meeting_id);
                    if ($all) {
                        $meetings[] = $meeting;
                    }
                    else {
                        if ($meeting->date <= Carbon::now()){
                            $meetings[] = $meeting;
                        }
                    }
                }
                return $meetings;
            }
            return response()->json([
                'message' => 'You are not a student'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function getById($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            $meeting = Meeting::find($id);
            if ($meeting){
                if ($user->student || $user->teacher) {
                    $pair = Pair::where('student_id', $user->id)->where('teacher_id', $meeting->teacher_id)->first();
                    if ($pair || $user->id == $meeting->teacher_id) {
                        return $meeting;
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
            ], 404);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function store($id, Request $request) {
        $user = User::find($request->uid);
        if ($user) {
            if ($user->teacher){
                $req_array = [
                    'teacher_id' => $user->id,
                    'date' => $request->date,
                    'location' => $request->location,
                    'count' => $request->count,
                ];
                if ($id == 0){
                    return Meeting::create($req_array);
                }
                else {
                    $meeting = Meeting::find($id);
                    if ($meeting) {
                        if ($meeting->teacher_id == $user->id){
                            $meeting->update($req_array);
                            return $meeting;
                        }
                        return response()->json([
                            'message' => 'This meeting does not belong to you'
                        ], 400);
                    }
                    return response()->json([
                        'message' => 'Meeting not found'
                    ], 400);
                }
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
            if ($user->teacher){
                $meeting = Meeting::find($id);
                if ($meeting) {
                    if ($meeting->teacher_id == $user->id){
                        $meeting->delete();
                        return response()->json([
                            'message' => 'Meeting deleted successfully'
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'This meeting does not belong to you'
                    ], 400);
                }
                return response()->json([
                    'message' => 'Meeting not found'
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
