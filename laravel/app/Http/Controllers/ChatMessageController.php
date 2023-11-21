<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\Pair;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function sendTo($uid, Request $request){
        $user = User::find($request->uid);
        if ($user) {
            if( Pair::where('student_id', $user->id)->where('teacher_id', $uid)->first() ||
                Pair::where('student_id', $uid)->where('teacher_id', $user->id)->first()
                ) {
                return ChatMessage::create([
                    'from_user_id' => intval($user->id),
                    'to_user_id' => intval($uid),
                    'message' => $request->message,
                    'created_at' => Carbon::now('Europe/Budapest')->format('Y-m-d H:i:s')
                ]);
            }
            return response()->json([
                'message' => 'You are not in contact with this person'
            ], 401);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function messagesFrom($uid, Request $request){
        $user = User::find($request->uid);
        if ($user) {
            if( Pair::where('student_id', $user->id)->where('teacher_id', $uid)->first() ||
                Pair::where('student_id', $uid)->where('teacher_id', $user->id)->first()
                ) {

                $from = ChatMessage::where('from_user_id', $uid)->where('to_user_id', $user->id)->get()->toArray();
                $to = ChatMessage::where('to_user_id', $user->id)->where('from_user_id', $uid)->get()->toArray();

                return (array_merge($from, $to));
            }
            return response()->json([
                'message' => 'You are not in contact with this person'
            ], 401);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }

    public function getNewMessages($uid, $last_id, Request $request){
        $user = User::find($request->uid);
        if ($user) {
            if ($user->id != $uid){

                if( Pair::where('student_id', $user->id)->where('teacher_id', $uid)->first() ||
                Pair::where('student_id', $uid)->where('teacher_id', $user->id)->first()
                ) {
                    return ChatMessage::where(function($query) use ($uid, $user, $last_id) {
                        $query->where('from_user_id', $uid)->where('to_user_id', $user->id)->where('id', '>', $last_id);
                    })->orWhere(function($query) use ($uid, $user, $last_id) {
                        $query->where('to_user_id', $user->id)->where('from_user_id', $uid)->where('id', '>', $last_id);
                    })->get();
                }
                return response()->json([
                    'message' => 'You are not in contact with this person'
                ], 401);
            }
            return response()->json([
                'message' => 'You cannot send a message to yourself'
            ], 400);
        }
        return response()->json([
            'message' => 'Please log in'
        ], 403);
    }
}
