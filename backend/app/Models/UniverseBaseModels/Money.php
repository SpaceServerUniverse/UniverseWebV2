<?php

namespace App\Models\UniverseBaseModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $money
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\UniverseBaseModels\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money whereMoney($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Money whereUserId($value)
 * @mixin \Eloquent
 */
class Money extends UniverseBaseModel {
    use HasFactory;

    protected $fillable = [
        "money"
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
