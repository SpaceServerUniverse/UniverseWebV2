<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // カスタムPersonalAccessTokenモデルを使用（デフォルトのDB接続を使用するため）
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
