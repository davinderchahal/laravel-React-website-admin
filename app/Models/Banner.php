<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'btn_text',
        'btn_link',
        'show_btn',
    ];

    protected function showBtn(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => (int) $value,
            set: fn (int $value) => (int) $value,
        );
    }
}
