<?php

namespace App\Services;

use App\Repositories\ProfileRepository;

class ProfileService{

    private ProfileRepository $profileRepository;

    public function __construct(ProfileRepository $profileRepository) {
        $this->profileRepository = $profileRepository;
    }

    public function findByUserId(int $userId){
        return $this->profileRepository->findByUserId($userId);
    }

    public function updateProfile(int $userId, array $data){
        // バリデーション済みのデータのみを使用
        $allowedFields = ['introduction', 'show_last_login'];
        $filteredData = array_filter($data, function($key) use ($allowedFields) {
            return in_array($key, $allowedFields);
        }, ARRAY_FILTER_USE_KEY);

        return $this->profileRepository->updateOrCreate($userId, $filteredData);
    }
}