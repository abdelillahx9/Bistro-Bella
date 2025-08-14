<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuFavorite extends Model
{
    use HasFactory;

    protected $table = 'menu_favorites';

    protected $fillable = [
        'menu_id',
        'user_id',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
