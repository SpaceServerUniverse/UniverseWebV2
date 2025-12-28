<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService{

    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function findById(int $user_id){
        return $this->userRepository->findById($user_id);
    }

    public function search(string $query){
        return $this->userRepository->search($query);
    }
}
