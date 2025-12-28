<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController {

    private UserService $userService;

    public function __construct(UserService  $userService) {
        $this->userService = $userService;
    }

    public function getTopPageUser(Request $request) {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $userData = $this->userService->findById($user->id);

        return response()->json($userData);
    }

    public function search(Request $request) {
        $query = $request->input('query') ?? '';
        $users = $this->userService->search($query);
        return response()->json($users);
    }

    public function show($id) {
        $user = $this->userService->findById($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user);
    }
}
