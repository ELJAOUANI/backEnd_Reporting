<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthService
{
    static function login($request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (Auth::attempt(['email' => Str::title($request->email), 'password' => $request->password])) {
            $user = User::with('roles')->find(Auth::user()->id);
            $token = $user->createToken($request->email)->accessToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    static function register($request)
    {
        try {
            DB::beginTransaction();
            Role::firstOrCreate(['name' => 'BackOffice', 'guard_name' => 'api']);

            $request->validate([
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'role' => 'required|string',
            ]);

            $user = User::create([
                'last_name' => Str::title($request->last_name),
                'first_name' => Str::title($request->first_name),
                'email' => Str::lower($request->email),
                'password' => bcrypt($request->password),
            ]);

            $user->assignRole($request->role);

            $token = $user->createToken($request->email)->accessToken;

            DB::commit();
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => 'error ' . $th->getMessage()], 500);
        }
    }
}
