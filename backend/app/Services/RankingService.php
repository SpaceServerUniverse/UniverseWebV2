<?php

namespace App\Services;

use App\Repositories\RankingRepository;

class RankingService {

    private RankingRepository $rankingRepository;

    public function __construct(RankingRepository $rankingRepository) {
        $this->rankingRepository = $rankingRepository;
    }

    public function getRanking(string $type, int $limit = 10) {
        return $this->rankingRepository->getRanking($type, $limit);
    }
}