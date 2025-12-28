<?php

namespace App\Repositories;

use App\Models\Profile;

class ProfileRepository{

    /**
     * ユーザーIDでプロフィールを取得
     *
     * @param int $userId
     * @return Profile|null
     */
    public function findByUserId(int $userId): ?Profile
    {
        return Profile::where('user_id', $userId)->first();
    }

    /**
     * プロフィールを更新
     *
     * @param int $userId
     * @param array $data
     * @return Profile|null
     */
    public function updateOrCreate(int $userId, array $data): ?Profile
    {
        // user_idを含めて更新データを作成
        $dataWithUserId = array_merge(['user_id' => $userId], $data);

        return Profile::updateOrCreate(
            ['user_id' => $userId],
            $dataWithUserId
        );
    }

    /**
     * プロフィールを作成
     *
     * @param array $data
     * @return Profile
     */
    public function create(array $data): Profile
    {
        return Profile::create($data);
    }
}