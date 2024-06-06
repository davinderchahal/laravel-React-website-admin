<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'sec1_tagline',
        'sec1_title',
        'sec2_tagline',
        'sec2_title',
        'video_sec_title',
        'video_sec_link',
        'video_sec_btn_text',
        'video_sec_btn_link',
        'video_sec_banner',
    ];
}
