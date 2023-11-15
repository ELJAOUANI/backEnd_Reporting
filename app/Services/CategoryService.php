<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{

    static function show()
    {
        try {
            $categories = Category::all();

            return response()->json(['categories' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function store($request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'code' => 'required|string',
            ]);

            $category = Category::create([
                'name' => Str::title($request->name),
                'code' => Str::upper($request->code),
            ]);

            return response()->json(['category' => $category], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function update($request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->update([
                'name' => $request->name ? Str::title($request->name) : $category->name,
                'code' => $request->code ? Str::upper($request->code) : $category->code,
            ]);

            $category->refresh();

            return response()->json(['category' => $category], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function get($id)
    {
        try {
            $category = Category::findOrFail($id);

            return response()->json(['category' => $category], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    static function delete($id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->delete();

            return response()->json(['category' => $category], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
