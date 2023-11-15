<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'serie_number',
        'operation',
        'type_of_operation',
        'address',
        'city_id',
        'secteur',
        'technicien_id',
        'date_of_operation',
        'sr',
        'order_number',
    ];


    public function items()
    {
        return $this->belongsToMany(Items::class,'report_items','report_id','item_id')->withPivot('quantity');
    }
}
