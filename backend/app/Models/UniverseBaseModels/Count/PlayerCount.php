<?php

namespace App\Models\UniverseBaseModels\Count;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $count_id
 * @property int $login
 * @property int $consecutive_login
 * @property string $last_login_date
 * @property-read \App\Models\UniverseBaseModels\Count\Count $count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount whereConsecutiveLogin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount whereCountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount whereLastLoginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PlayerCount whereLogin($value)
 * @mixin \Eloquent
 */
class PlayerCount extends UniverseBaseModel
{
    use HasFactory;

    public function count():BelongsTo{
        return $this->belongsTo(Count::class);
    }
}
