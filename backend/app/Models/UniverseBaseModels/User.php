<?php

namespace App\Models\UniverseBaseModels;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Profile;
use App\Models\UniverseBaseModels\Count\Count;
use App\Models\UniverseBaseModels\Level\PlayerLevel;
use App\Models\UniverseBaseModels\Position\UserPosition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property string|null $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Count|null $count
 * @property-read \App\Models\UniverseBaseModels\CustomName|null $custom_name
 * @property-read \App\Models\UniverseBaseModels\Money|null $money
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read PlayerLevel|null $player_level
 * @property-read Profile|null $profile
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @property-read UserPosition|null $user_position
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUuid($value)
 * @mixin \Eloquent
 */
class User extends UniverseBaseModel
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $connection = 'universe';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function profile(): HasOne {
        return $this->hasOne(Profile::class, "user_id");
    }

    public function money(): HasOne {
        return $this->hasOne(Money::class, "user_id");
    }

    public function player_level(): HasOne {
        return $this->hasOne(PlayerLevel::class, "user_id");
    }

    public function user_position():hasOne{
        return $this->hasOne(UserPosition::class, 'user_id');
    }

    public function count():hasOne{
        return $this->hasOne(Count::class, "user_id");
    }

    public function custom_name():hasOne{
        return $this->hasOne(CustomName::class, "user_id");
    }
}
