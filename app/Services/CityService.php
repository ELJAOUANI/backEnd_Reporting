<?php

namespace App\Services;

use App\Models\City;
use Illuminate\Support\Str;

class CityService
{

    static function store($request)
    {
        try {
            $request->validate([
                'city_name' => 'required|string',
            ]);

            $city = City::firstOrCreate([
                'city_name' => Str::title($request->city_name),
            ], [
                'city_name' => Str::title($request->city_name),
            ]);

            if ($city->wasRecentlyCreated) {
                return response()->json(['city' => $city], 200);
            } else {
                return response()->json(['error' => 'City already exists'], 500);
            }
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function show()
    {
        try {
            $cities = City::all();

            return response()->json(['cities' => $cities], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function get($id)
    {
        try {
            $city = City::findOrFail($id);

            return response()->json(['city' => $city], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function update($request, $id)
    {
        try {
            $city = City::findOrFail($id);
            $request->validate([
                'city_name' => 'required|string',
            ]);

            $city->update([
                'city_name' => Str::title($request->city_name),
            ]);

            return response()->json(['city' => $city], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function delete(int $id)
    {
        try {
            $city = City::findOrFail($id);
            $city->delete();

            return response()->json(['city' => $city], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
