<?php

namespace App\Http\Middleware;

use Closure;

class RestrictByDomain
{
    public function handle($request, Closure $next)
    {
        // Check if the request originated from the allowed domain
        $key = $request->route('key');
        if ($key != env("MAIL_KEY")) {
            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}
