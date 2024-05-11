<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aztoken extends Model
{
    use HasFactory;

    protected $fillable = [
        'aztoken',
        'aztoken_key',
        'token_request',
        'aztoken_information',
        'status',
    ];

}
