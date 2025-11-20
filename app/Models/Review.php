<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rating',
        'comment',
        'is_featured',
        'is_hidden',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_featured' => 'boolean',
        'is_hidden' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
