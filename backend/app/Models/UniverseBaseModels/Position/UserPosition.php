<?php

namespace App\Models\UniverseBaseModels\Position;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use App\Models\UniverseBaseModels\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $user_id
 * @property int $position_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\UniverseBaseModels\Position\Position|null $position
 * @property-read User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition wherePositionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserPosition whereUserId($value)
 * @mixin \Eloquent
 */
class UserPosition extends UniverseBaseModel
{
    use HasFactory;

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function position(): HasOne {
        return $this->hasOne(Position::class, "id", "position_id");
    }
}
