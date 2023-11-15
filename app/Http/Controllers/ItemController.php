<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Services\ItemService;

class ItemController extends Controller
{
    public function show()
    {
        return ItemService::show();
    }

    public function store(Request $request)
    {
        return ItemService::store($request);
    }

    public function get($id)
    {
        return ItemService::get($id);
    }

    public function update(Request $request, $id)
    {
        return ItemService::update($id, $request);
    }

    public function delete($id)
    {
        return ItemService::delete($id);
    }

    public function restore($id)
    {
        return ItemService::restore($id);
    }

    public function destroy($id)
    {
        return ItemService::destroy($id);
    }
}
