<?php

namespace App\Services;

use App\Models\Report;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReportService
{

    static function show()
    {
        try {
            $reports = Report::with('items' , 'technicien','city')->get();
            $count = Report::count();
            return response()->json([
                'reports' => $reports ,
                'count' => $count  
            ], 200);
           
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    static function store($request)
    {
        try {

            
            DB::beginTransaction();
            $request->validate([
                'serie_number' => 'required|string',
                'operation' => 'required|string',
                'type_of_operation' => 'required|string',
                'address' => 'required|string',
                'city_id' => 'required|integer',
                'secteur' => 'required|string',
                'technicien_id' => 'required|integer',
                'date_of_operation' => 'required|date',
            ]);

            $report = Report::create([
                'serie_number' => $request->serie_number,
                'operation' => Str::title($request->operation),
                'type_of_operation' => Str::title($request->type_of_operation),
                'address' => Str::title($request->address),
                'city_id' => $request->city_id,
                'secteur' => Str::upper($request->secteur),
                'technicien_id' => $request->technicien_id,
                'date_of_operation' => $request->date_of_operation,
                'sr' => $request->sr,
                'order_number' => $request->order_number,
            ]);

            foreach ($request->items as $item) {
                $report->items()->attach(
                    $item['id'],
                    ['quantity' => $item['qte']]
                );
            }

            $report->load('items');
            $report->refresh();

            DB::commit();

            return response()->json(['report' => $report], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    static function update($request)
    {
        try {


            $report = Report::findOrFail($request->id);
            $request->validate([
                'serie_number' => 'required|string',
                'operation' => 'required|string',
                'type_of_operation' => 'required|string',
                'address' => 'required|string',
                'city_id' => 'required|integer',
                'secteur' => 'required|string',
                'technicien_id' => 'required|integer',
                'date_of_operation' => 'required|date',
            ]);

            $report->update([
                'serie_number' => $request->serie_number,
                'operation' => Str::title($request->operation),
                'type_of_operation' => Str::title($request->type_of_operation),
                'address' => Str::title($request->address),
                'city_id' => $request->city_id,
                'secteur' => Str::upper($request->secteur),
                'technicien_id' => $request->technicien_id,
                'date_of_operation' => $request->date_of_operation,
                'sr' => $request->sr,
                'order_number' => $request->order_number,
            ]);


            $itemsData = [];
            foreach ($request->items as $item) {
                $itemId = $item['id'];
                $quantity = $item['qte'];

                // Update the quantity for the specified item in the pivot table
                $itemsData[$itemId] = ['quantity' => $quantity];
            }

            $report->items()->sync($request->items);

            // Optionally, you can reload the items relationship if needed
            $report->load('items');


            $report->refresh();
            DB::commit();

            return response()->json(['report' => $report], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    static function delete($id)
    {
        try {
            $report = Report::findOrFail($id);

            $report->delete();

            return response()->json(['report' => $report], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    static function restore($id)
    {
        try {
            $report = Report::withTrashed()->findOrFail($id);

            $report->restore();

            return response()->json(['report' => $report], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    static function destroy($id)
    {
        try {
            $report = Report::withTrashed()->findOrFail($id);

            $report->forceDelete();

            return response()->json(['report' => $report], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
    static function get($id)
    {
        try {
            $report = Report::findOrFail($id);

            return response()->json(['report' => $report], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
