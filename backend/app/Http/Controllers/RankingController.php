<?php

namespace App\Http\Controllers;

use App\Services\RankingService;
use Illuminate\Http\Request;

class RankingController {

    private RankingService $rankingService;

    public function __construct(RankingService $rankingService) {
        $this->rankingService = $rankingService;
    }

    public function index(Request $request) {
        $type = $request->input('type') ?? 'level';
        $limit = $request->input('limit', 10);

        $rankings = $this->rankingService->getRanking($type, $limit);

        return response()->json($rankings);
    }
}