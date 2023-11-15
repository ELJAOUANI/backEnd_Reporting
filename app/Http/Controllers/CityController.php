<?php

namespace App\Http\Controllers;

use App\Services\CityService;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function show()
    {
        return CityService::show();
    }

    public function store(Request $request)
    {
        return CityService::store($request);
    }

    public function get($id)
    {
        return CityService::get($id);
    }

    public function update(Request $request, $id)
    {
        return CityService::update($request, $id);
    }

    public function delete($id)
    {
        return CityService::delete($id);
    }
}
