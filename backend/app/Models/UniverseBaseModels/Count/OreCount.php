<?php

namespace App\Models\UniverseBaseModels\Count;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $count_id
 * @property int $coal_ore
 * @property int $iron_ore
 * @property int $gold_ore
 * @property int $lapis_ore
 * @property int $redstone_ore
 * @property int $emerald_ore
 * @property int $diamond_ore
 * @property int $copper_ore
 * @property-read \App\Models\UniverseBaseModels\Count\Count $count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereCoalOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereCopperOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereCountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereDiamondOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereEmeraldOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereGoldOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereIronOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereLapisOre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OreCount whereRedstoneOre($value)
 * @mixin \Eloquent
 */
class OreCount extends UniverseBaseModel
{
    use HasFactory;

    public function count():BelongsTo{
        return $this->belongsTo(Count::class);
    }
}
