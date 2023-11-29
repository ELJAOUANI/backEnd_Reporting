<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technicien extends Model
{
    use HasFactory , SoftDeletes;
    protected $fillable = [
        'name',
        'email',
        'city_id',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

}
