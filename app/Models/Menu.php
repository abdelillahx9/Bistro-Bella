<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image_path',
        'is_vegetarian',
        'is_gluten_free',
        'is_available',
    ];

    public function category()
    {
        return $this->belongsTo(MenuCategory::class, 'category_id');
    }
}
