<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TechnicienService;

class TechnicienController extends Controller
{
    public function show()
    {
        return TechnicienService::show();
    }
}
