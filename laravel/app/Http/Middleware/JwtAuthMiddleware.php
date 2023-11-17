<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Middleware\JwtAuth;

class JwtAuthMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $headers = $request->header();
        $jwt_auth = new JwtAuth($headers);
        if ($jwt_auth->isValid()["success"] != 1) {
            return response()->json([
                'message' => 'Please log in'
            ], 401);
        }
        $request->merge(["uid" => $jwt_auth->isValid()["user"]["id"]]);
        return $next($request);
    }
}
