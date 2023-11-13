<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function index(){
        return CategoryService::index();
    }

    public function store(Request $request)
    {
        return CategoryService::store($request);
    }

    public function update(Request $request, $id)
    {
        return CategoryService::update($request, $id);
    }

    public function get($id)
    {
        return CategoryService::get($id);
    }

    public function delete($id)
    {
        return CategoryService::delete($id);
    }
}
