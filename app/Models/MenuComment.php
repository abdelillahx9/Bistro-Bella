<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuComment extends Model
{
    use HasFactory;

    protected $table = 'menu_comments';

    protected $fillable = [
        'menu_id',
        'user_id',
        'comment',
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
