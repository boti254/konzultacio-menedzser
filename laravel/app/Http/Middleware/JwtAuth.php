<?php

namespace App\Http\Middleware;

use App\Http\Middleware\JwtHandler;
use App\Models\User;

class JwtAuth extends JwtHandler
{
    //protected $db;
    protected $headers;
    protected $token;

    public function __construct($headers)
    {
        parent::__construct();
        //$this->db = $db;
        $this->headers = $headers;
    }

    public function isValid()
    {
        //dd($this->headers);
        if (array_key_exists('authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['authorization'][0], $matches)) {

            $data = $this->jwtDecodeData($matches[1]);

            if (
                isset($data['data']->user_id) &&
                $user = $this->fetchUser($data['data']->user_id)
            ) :
                return [
                    "success" => 1,
                    "user" => $user
                ];
            else :
                return [
                    "success" => 0,
                    "message" => $data['message'],
                ];
            endif;
        } else {
            return [
                "success" => 0,
                "message" => "Token not found in request"
            ];
        }
    }

    protected function fetchUser($user_id)
    {
        try {
            $user = User::find($user_id);
            if ($user) :
                return $user;
            else :
                return false;
            endif;
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
