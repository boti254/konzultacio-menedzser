<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
    ];

    public function fromUser(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function toUser(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
