<?php

namespace App\Models\UniverseBaseModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int $id
 * @property int $user_id
 * @property string $display_custom_tag
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName whereDisplayCustomTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomName whereUserId($value)
 * @mixin \Eloquent
 */
class CustomName extends UniverseBaseModel{

    use HasFactory;
}
