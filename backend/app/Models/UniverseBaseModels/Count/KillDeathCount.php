<?php

namespace App\Models\UniverseBaseModels\Count;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $count_id
 * @property int $player_kill
 * @property int $mob_kill
 * @property int $ender_dragon_kill
 * @property int $wither_kill
 * @property int $death
 * @property-read \App\Models\UniverseBaseModels\Count\Count $count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereCountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereDeath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereEnderDragonKill($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereMobKill($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount wherePlayerKill($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|KillDeathCount whereWitherKill($value)
 * @mixin \Eloquent
 */
class KillDeathCount extends UniverseBaseModel {
    use HasFactory;

    public function count(): BelongsTo {
        return $this->belongsTo(Count::class);
    }
}
