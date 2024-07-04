<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;


    public function subsubcategories()
    {
        return $this->hasMany(Subsubcategory::class,'subcategory_id','id');
    }
}
