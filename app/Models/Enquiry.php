<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\Integer;

class Enquiry extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'is_attended',
    ];


    protected function casts(): array
    {
        return [
            'is_attended' => Integer::class,
        ];
    }
}
