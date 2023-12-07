<?php

namespace App\Http\Controllers;

use App\Services\TechniciensService;
use Illuminate\Http\Request;


class TechnicienController extends Controller
{
    public function show()
    {
        return TechniciensService::show();
    }

    public function store(Request $request)
    {
        return TechniciensService::store($request);
    }

    public function update(Request $request, $id)
    {
        return TechniciensService::update($request, $id);
    }

    public function get($id)
    {
        return TechniciensService::get($id);
    }

    public function delete($id)
    {
        return TechniciensService::delete($id);
    }
    public function restore($id)
    {
        return TechniciensService::restore($id);
    }
    public function destroy($id)
    {
        return TechniciensService::destroy($id);
    }
}
