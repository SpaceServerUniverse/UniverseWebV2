<?php

namespace App\Models\UniverseBaseModels\Count;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $count_id
 * @property int $fishing
 * @property int $block_break
 * @property int $block_place
 * @property int $flower_place
 * @property int $wood_break
 * @property int $gacha
 * @property int $gacha_rarity_count
 * @property int $gacha_ceiling_count
 * @property-read \App\Models\UniverseBaseModels\Count\Count $count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereBlockBreak($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereBlockPlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereCountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereFishing($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereFlowerPlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereGacha($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereGachaCeilingCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereGachaRarityCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LifeCount whereWoodBreak($value)
 * @mixin \Eloquent
 */
class LifeCount extends UniverseBaseModel
{
    use HasFactory;

    public function count():BelongsTo{
        return $this->belongsTo(Count::class);
    }
}
