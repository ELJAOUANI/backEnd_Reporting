<?php

namespace App\Http\Controllers;

use App\Services\ReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function show()
    {
        return ReportService::show();
    }

    public function store(Request $request)
    {
        return ReportService::store($request);
    }

    public function update(Request $request)
    {
        return ReportService::update($request);
    }

    public function delete($id)
    {
        return ReportService::delete($id);
    }

    public function restore($id)
    {
        return ReportService::restore($id);
    }

    public function destroy($id)
    {
        return ReportService::destroy($id);
    }
}
