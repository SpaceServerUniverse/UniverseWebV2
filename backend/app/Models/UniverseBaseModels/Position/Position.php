<?php

namespace App\Models\UniverseBaseModels\Position;

use App\Models\UniverseBaseModels\UniverseBaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int $id
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Position newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Position newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Position query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Position whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Position whereName($value)
 * @mixin \Eloquent
 */
class Position extends UniverseBaseModel {
    use HasFactory;

    const VALUE_BAN = 0;
    const VALUE_NORMAL = 1;
    const VALUE_VIP = 2;
    const VALUE_VIP_PLUS = 3;
    const VALUE_VIP_PLUS_PLUS = 4;

    const VALUE_STAFF = 100;
    const VALUE_DEVELOPER = 101;
    const VALUE_OWNER = 102;
}
