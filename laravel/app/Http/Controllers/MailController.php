<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send() {
        echo 'Starting<br>';
        $todos = Todo::where('due', '<', date("Y-m-d H:i:s", strtotime('+1 day')))->where('due', '>', date("Y-m-d H:i:s", strtotime('now')))->where('done', false)->get();
        $users = [];
        foreach ($todos as $todo) {
            try {
                $users[$todo->student_id] = User::find($todo->student_id);
            }
            catch(Exception $e){
                //
            }
        }
        foreach ($users as $user) {
            $data = array('username' => $user->name);
        Mail::send(['text' => 'email'], $data, function($message) use ($user) {
            $message->to($user->email)->subject('Feladat Emlékeztető');
            $message->from('info@szoftarch.webgravir.hu' , 'Konzultáció Menedzser');
        });
        echo "Email sent to " . $user->email . "<br>";
        }
    }
}
