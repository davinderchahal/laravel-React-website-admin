<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;
    protected $fillable = [
        'tagline',
        'title',
        'description',
        'box_title',
        'box_description',
        'service_list',
        'thumb_one',
        'thumb_two',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'service_list' => 'array',
        ];
    }
}
