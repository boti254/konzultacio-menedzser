<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pair extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'teacher_id',
        'student_id',
        'accepted',
    ];

    public function teacher(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function student(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
