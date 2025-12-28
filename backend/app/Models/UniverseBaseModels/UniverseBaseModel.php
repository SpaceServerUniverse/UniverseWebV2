<?php

namespace App\Models\UniverseBaseModels;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UniverseBaseModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UniverseBaseModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UniverseBaseModel query()
 * @mixin \Eloquent
 */
class UniverseBaseModel extends Model {
    protected $connection = 'universe';
}
