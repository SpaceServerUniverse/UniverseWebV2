<?php

namespace App\Repositories;

use App\Models\UniverseBaseModels\User;
use Illuminate\Database\Eloquent\Collection;

class RankingRepository {

    /**
     * ランキングを取得
     *
     * @param string $type
     * @param int $limit
     * @return Collection
     */
    public function getRanking(string $type, int $limit = 10): Collection {
        $query = User::query()
            ->with([
                "profile",
                "money",
                "player_level",
                "player_level.player_normal_level",
                "user_position.position",
                "count.kill_death_count",
                "count.life_count",
                "count.ore_count",
                "count.player_count",
                "custom_name"
            ]);

        switch ($type) {
            case 'level':
                // レベルランキング
                $query->join('player_normal_levels', 'users.id', '=', 'player_normal_levels.user_id')
                    ->orderBy('player_normal_levels.level', 'desc')
                    ->orderBy('player_normal_levels.exp', 'desc')
                    ->select('users.*');
                break;

            case 'money':
                // 所持金ランキング
                $query->join('money', 'users.id', '=', 'money.user_id')
                    ->orderBy('money.money', 'desc')
                    ->select('users.*');
                break;

            case 'login':
                // ログイン回数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('player_counts', 'counts.id', '=', 'player_counts.count_id')
                    ->orderBy('player_counts.login', 'desc')
                    ->select('users.*');
                break;

            case 'block_break':
                // ブロック破壊数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('life_counts', 'counts.id', '=', 'life_counts.count_id')
                    ->orderBy('life_counts.block_break', 'desc')
                    ->select('users.*');
                break;

            case 'block_place':
                // ブロック設置数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('life_counts', 'counts.id', '=', 'life_counts.count_id')
                    ->orderBy('life_counts.block_place', 'desc')
                    ->select('users.*');
                break;

            case 'fishing':
                // 釣り回数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('life_counts', 'counts.id', '=', 'life_counts.count_id')
                    ->orderBy('life_counts.fishing', 'desc')
                    ->select('users.*');
                break;

            case 'player_kill':
                // プレイヤーキル数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('kill_death_counts', 'counts.id', '=', 'kill_death_counts.count_id')
                    ->orderBy('kill_death_counts.player_kill', 'desc')
                    ->select('users.*');
                break;

            case 'mob_kill':
                // Mobキル数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('kill_death_counts', 'counts.id', '=', 'kill_death_counts.count_id')
                    ->orderBy('kill_death_counts.mob_kill', 'desc')
                    ->select('users.*');
                break;

            case 'diamond_ore':
                // ダイヤ採掘数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('ore_counts', 'counts.id', '=', 'ore_counts.count_id')
                    ->orderBy('ore_counts.diamond_ore', 'desc')
                    ->select('users.*');
                break;

            case 'wood_break':
                // 木材破壊数ランキング
                $query->join('counts', 'users.id', '=', 'counts.user_id')
                    ->join('life_counts', 'counts.id', '=', 'life_counts.count_id')
                    ->orderBy('life_counts.wood_break', 'desc')
                    ->select('users.*');
                break;

            default:
                // デフォルトはレベルランキング
                $query->join('player_normal_levels', 'users.id', '=', 'player_normal_levels.user_id')
                    ->orderBy('player_normal_levels.level', 'desc')
                    ->orderBy('player_normal_levels.exp', 'desc')
                    ->select('users.*');
                break;
        }

        return $query->limit($limit)->get();
    }
}