<?php

namespace App\Services;

use App\Models\items;
use Illuminate\Support\Str;

class ItemService
{
    static function show()
    {
        try {
            $items = items::with('category')->get();
            $count = items::count();
            return response()->json([
                'items' => $items,
                'count' => $count
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function store($request)
    {
        try {
            $request->validate([
                'item_name' => 'required|string',
                'item_code' => 'required|string',
                'unite' => 'required|string',
                'quantity' => 'required|numeric',
                'price_unit' => 'required|numeric',
                'type' => 'required|string',
                'category' => 'required|numeric',
                // 'price' => 'required|numeric',
            ]);

            $item = items::create([
                'item_name' => Str::title($request->item_name),
                'item_code' => Str::upper($request->item_code),
                'unite' => Str::upper($request->unite),
                'quantity' => $request->quantity,
                'price_unit' => $request->price_unit,
                'type' => $request->type ? $request->type : 'neweracom',
                'category_id' => $request->category,
                // 'price' => $request->price,
            ]);

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    static function update($id, $request)
    {
        try {
            $item = items::findOrFail($id);

            $item->update([
                'item_name' => $request->item_name ? Str::title($request->item_name) : $item->item_name,
                'item_code' => $request->item_code ? Str::upper($request->item_code) : $item->item_code,
                'unite' => $request->unite ? Str::upper($request->unite) : $item->unite,
                'quantity' => $request->quantity ? $request->quantity : $item->quantity,
                'price_unit' => $request->price_unit ? $request->price_unit : $item->price_unit,
                'type' => $request->type ? $request->type : $item->type,
                'category' => $request->category ? $request->category : $item->category,
            ]);

            $item->refresh();

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function get($id)
    {
        try {
            $item = items::findOrFail($id);

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function delete($id)
    {
        try {
            $item = items::findOrFail($id);

            $item->delete();

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function restore($id)
    {
        try {
            $item = items::withTrashed()->findOrFail($id);

            $item->restore();

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function destroy($id)
    {
        try {
            $item = items::findOrFail($id);

            $item->forceDelete();

            return response()->json(['item' => $item], 200);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
