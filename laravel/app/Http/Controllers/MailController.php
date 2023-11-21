<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send() {
        $data = array('name' => "Joi die");
        Mail::send(['text' => 'mail'], $data, function($message) {
            $message->to('arvaizsombor@gmail.com')->subject('Emlékeztető');
            $message->from('info@szoftarch.webgravir.hu' , 'Konzultáció Menedzser');
        });
        echo "Great! Simple mail successfully send!";
    }
}
