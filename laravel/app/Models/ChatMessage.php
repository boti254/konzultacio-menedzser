<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'message',
    ];

    public function fromUser(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function toUser(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
