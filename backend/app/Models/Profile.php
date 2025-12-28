<?php

namespace App\Models;

use App\Models\UniverseBaseModels\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string $introduction
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $show_last_login
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereIntroduction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereShowLastLogin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile whereUserId($value)
 * @mixin \Eloquent
 */
class Profile extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "introduction" , "show_last_login"];

    protected $connection = 'mysql';

    public function user():belongsTo{
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
