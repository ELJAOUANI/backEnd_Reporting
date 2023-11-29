<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return AuthService::login($request);
    }

    public function register(Request $request)
    {
        return AuthService::register($request);
    }
}
