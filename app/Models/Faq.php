<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'is_show',
    ];

    protected function isShow(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => (int) $value,
            set: fn (int $value) => (int) $value,
        );
    }
}
