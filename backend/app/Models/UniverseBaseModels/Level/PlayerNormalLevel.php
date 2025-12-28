<?php

namespace App\Models\UniverseBaseModels\Level;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use App\Models\UniverseBaseModels\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $exp
 * @property int $level
 * @property int $level_mode_total_exp
 * @property int $exp_for_next_level
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereExp($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereExpForNextLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereLevelModeTotalExp($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerNormalLevel whereUserId($value)
 * @mixin \Eloquent
 */
class PlayerNormalLevel extends UniverseBaseModel {
    use HasFactory;

    public function user():belongsTo{
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
