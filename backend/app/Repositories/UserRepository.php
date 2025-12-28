<?php

namespace App\Repositories;

use App\Models\UniverseBaseModels\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository{

    /**
     * メールアドレスでユーザーを検索
     *
     * @param string $email
     * @return User|null
     */
    public function findByName(string $name): ?User
    {
        return User::where('name', $name)->first();
    }

    /**
     * IDでユーザーを検索
     *
     * @param int $id
     * @return User|null
     */
    public function findById(int $id): ?User
    {
        return User::query()->with([
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
        ])->find($id);
    }

    /**
     * 新しいユーザーを作成
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * ユーザーを更新
     *
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }

    /**
     * 全ユーザーを取得
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return \App\Models\UniverseBaseModels\User::all();
    }

    /**
     * ユーザーを削除
     *
     * @param User $user
     * @return bool|null
     */
    public function delete(User $user): ?bool
    {
        return $user->delete();
    }

    /**
     * ユーザー名で検索（部分一致）
     * クエリが空の場合は全ユーザーを返す
     *
     * @param string $query
     * @return Collection
     */
    public function search(string $query): Collection
    {
        $queryBuilder = User::query()
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

        if (!empty($query)) {
            $queryBuilder->where('name', 'like', '%' . $query . '%');
        }

        return $queryBuilder->get();
    }

}
