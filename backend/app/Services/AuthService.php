<?php

namespace App\Services;

use App\Models\UniverseBaseModels\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(string $name, string $password): array
    {
        $user = $this->userRepository->findByName($name);

        if (!$user) {
            throw ValidationException::withMessages([
                'name' => ['ユーザー名またはパスワードが正しくありません'],
            ]);
        }

        // $2a$ 形式のハッシュを $2y$ に変換してチェック(Laravelバージョン対応)
        $hash = $user->password;
        if (str_starts_with($hash, '$2a$')) {
            $hash = '$2y$' . substr($hash, 4);
        }

        if (!Hash::check($password, $hash)) {
            throw ValidationException::withMessages([
                'name' => ['ユーザー名またはパスワードが正しくありません'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'token' => $token,
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function getUserInfo(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
        ];
    }
}
