<?php

namespace App\Models\UniverseBaseModels\Level;

use App\Library\Level\Level;
use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $user_id
 * @property int $total_exp
 * @property int $level_mode
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read \App\Models\UniverseBaseModels\Level\PlayerNormalLevel|null $player_normal_level
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereLevelMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereTotalExp($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerLevel whereUserId($value)
 * @mixin \Eloquent
 */
class PlayerLevel extends UniverseBaseModel {
    use HasFactory;

    public function getLevelMode():Level{
        return Level::getLevelModeToEnum((int)$this->levelmode);
    }

    public function player_level_mode_relation(): hasOne {
        $level = $this->getLevelMode();
        return match ($level) {
            default => $this->player_normal_level()
        };
    }

    public function player_normal_level(): HasOne {
        return $this->hasOne(PlayerNormalLevel::class, 'user_id', 'user_id');
    }
}
