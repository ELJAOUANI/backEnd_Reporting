<?php

namespace App\Services;

use App\Models\Technicien;
use Illuminate\Support\Str;

class TechniciensService
{

    static function show()
    {
        try {
            $techniciens = Technicien::with("city")->get();

            return response()->json(['techniciens' => $techniciens], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    static function store($request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string',
                'city_id' => 'required|numeric'
            ]);

            $techniciens = Technicien::create([
                'name' => Str::title($request->name),
                'email' => $request->email,
                'city_id' => $request->city_id
            ]);

            return response()->json(['techniciens' => $techniciens], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function update($request, $id)
    {
        try {
            $techniciens = Technicien::findOrFail($id);

            $techniciens->update([
                'name' => $request->name ? Str::title($request->name) : $techniciens->name,
                'email' => $request->email ? $request->email : $techniciens->email,
                'city_id' => $request->city_id ? $request->city_id : $techniciens->city_id,
            ]);

            $techniciens->refresh();

            return response()->json(['techniciens' => $techniciens], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function get($id)
    {
        try {
            $technicien = Technicien::with("city")->findOrFail($id);

            return response()->json(['techniciens' => $technicien], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    static function delete($id)
    {
        try {
            $techniciens = Technicien::findOrFail($id);

            $techniciens->delete();

            return response()->json(['techniciens' => $techniciens], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    static function restore($id)
    {
        try {
            $techniciens = Technicien::withTrashed()->findOrFail($id);

            $techniciens->restore();

            return response()->json(['item' => $techniciens], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function destroy($id)
    {
        try {
            $techniciens = Technicien::findOrFail($id);

            $techniciens->forceDelete();

            return response()->json(['item' => $techniciens], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
