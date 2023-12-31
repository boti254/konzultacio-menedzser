<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;
    public $timestamps = false;

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
