<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'title',
        'due',
        'done',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
