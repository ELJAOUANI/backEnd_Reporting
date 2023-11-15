<?php

namespace App\Services;

use App\Models\items;
use Illuminate\Support\Str;

class ItemService
{
    static function show()
    {
        try {
            $items = items::all();

            return response()->json(['items' => $items], 200);
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
                'unite' => 'required|string',
                'quantity' => 'required|numeric',
                'price_unit' => 'required|numeric',
                'category_id' => 'required|numeric',
            ]);

            $item = items::create([
                'item_name' => Str::title($request->name),
                'item_code' => Str::upper($request->code),
                'unite' => Str::upper($request->unite),
                'quantity' => $request->quantity,
                'price_unit' => $request->price_unit,
                'type' => $request->type ? $request->type : 'neweracom',
                'category_id' => $request->category_id,
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
                'item_name' => $request->name ? Str::title($request->name) : $item->item_name,
                'item_code' => $request->code ? Str::upper($request->code) : $item->item_code,
                'unite' => $request->unite ? Str::upper($request->unite) : $item->unite,
                'quantity' => $request->quantity ? $request->quantity : $item->quantity,
                'price_unit' => $request->price_unit ? $request->price_unit : $item->price_unit,
                'type' => $request->type ? $request->type : $item->type,
                'category_id' => $request->category_id ? $request->category_id : $item->category_id,
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
