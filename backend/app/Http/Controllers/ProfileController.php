<?php

namespace App\Http\Controllers;

use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController {

    private ProfileService $profileService;

    public function __construct(ProfileService $profileService) {
        $this->profileService = $profileService;
    }

    /**
     * プロフィールを取得
     */
    public function show(Request $request) {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $profile = $this->profileService->findByUserId($user->id);

        if (!$profile) {
            return response()->json(['error' => 'Profile not found'], 404);
        }

        return response()->json($profile);
    }

    /**
     * プロフィールを更新
     */
    public function update(Request $request) {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // バリデーション
        $validator = Validator::make($request->all(), [
            'introduction' => 'nullable|string|max:500',
            'show_last_login' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors()
            ], 422);
        }

        try {
            $profile = $this->profileService->updateProfile($user->id, $request->all());
            return response()->json($profile);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update profile',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}