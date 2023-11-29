<?php

namespace App\Services;

use App\Models\Technicien;

class TechnicienService
{
    static function show()
    {
        try {
            $techniciens = Technicien::withCount('reports')->with('city')->get();
            return response()->json([
                'listOfTechniciens' => $techniciens,
                'count' => $techniciens->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
