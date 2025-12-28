"use client"
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendar, FaClock, FaCoins, FaFish } from "react-icons/fa";
import { LuPickaxe } from "react-icons/lu";
import { TbSwords } from "react-icons/tb";
import { apiRequest } from "@/utils/api";
import { User } from "@/types/user";

interface PlayerDetailPageProps {
  playerId: number | null;
  onBack: () => void;
}

export function PlayerDetailPage({ playerId, onBack }: PlayerDetailPageProps) {
  const [player, setPlayer] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!playerId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await apiRequest(`/api/users/${playerId}`);
        if (!response.ok) {
          throw new Error('プレイヤーが見つかりませんでした');
        }
        const data = await response.json();
        setPlayer(data);
      } catch (err) {
        console.error("Failed to fetch player:", err);
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-white mb-4">{error || 'プレイヤーが見つかりませんでした'}</h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
          >
            検索ページに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all shadow-lg shadow-blue-500/10 px-4 py-2 rounded-lg"
        >
          <FaArrowLeft className="w-4 h-4 text-white" />
          <span className="text-white">戻る</span>
        </button>

        {/* Player Header */}
        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/20 mb-8 rounded-xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img
                src={`https://mc-heads.net/avatar/${player.uuid}/200`}
                alt={player.name}
                className="w-32 h-32 rounded-lg border-4 border-blue-500/50 shadow-lg shadow-blue-500/30"
              />
              <div className="flex-1">
                {player.custom_name?.custom_name && (
                  <div className="mb-2">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-bold shadow-lg shadow-purple-500/50">
                      {player.custom_name.custom_name}
                    </span>
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {player.name}
                </h1>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-sm font-bold shadow-lg shadow-blue-500/30">
                    Lv. {player.player_level?.player_normal_level?.level || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCoins className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold text-white">
                    {player.money?.money?.toLocaleString() || 0} コイン
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TbSwords className="w-6 h-6 text-red-400" />
            戦闘
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/30 backdrop-blur-sm p-4 shadow-lg shadow-red-500/10 rounded-lg">
              <p className="text-red-300 text-sm mb-1">プレイヤーキル数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.kill_death_count?.player_kill || 0}<span className="text-sm ml-1">人</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/30 backdrop-blur-sm p-4 shadow-lg shadow-green-500/10 rounded-lg">
              <p className="text-green-300 text-sm mb-1">mobキル数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.kill_death_count?.mob_kill || 0}<span className="text-sm ml-1">体</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30 backdrop-blur-sm p-4 shadow-lg shadow-purple-500/10 rounded-lg">
              <p className="text-purple-300 text-sm mb-1">エンドラキル数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.kill_death_count?.ender_dragon_kill || 0}<span className="text-sm ml-1">匹</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border-2 border-gray-500/30 backdrop-blur-sm p-4 shadow-lg shadow-gray-500/10 rounded-lg">
              <p className="text-gray-300 text-sm mb-1">ウィザーキル数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.kill_death_count?.wither_kill || 0}<span className="text-sm ml-1">匹</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border-2 border-red-500/30 backdrop-blur-sm p-4 shadow-lg shadow-red-500/10 rounded-lg">
              <p className="text-red-300 text-sm mb-1">デス数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.kill_death_count?.death || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
          </div>
        </div>

        {/* Lifestyle Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaFish className="w-6 h-6 text-cyan-400" />
            生活
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/30 backdrop-blur-sm p-4 shadow-lg shadow-cyan-500/10 rounded-lg">
              <p className="text-cyan-300 text-sm mb-1">釣り数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.life_count?.fishing || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/30 backdrop-blur-sm p-4 shadow-lg shadow-orange-500/10 rounded-lg">
              <p className="text-orange-300 text-sm mb-1">ブロック破壊数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.life_count?.block_break?.toLocaleString() || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-lime-900/30 border-2 border-green-500/30 backdrop-blur-sm p-4 shadow-lg shadow-green-500/10 rounded-lg">
              <p className="text-green-300 text-sm mb-1">ブロック設置数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.life_count?.block_place?.toLocaleString() || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-2 border-pink-500/30 backdrop-blur-sm p-4 shadow-lg shadow-pink-500/10 rounded-lg">
              <p className="text-pink-300 text-sm mb-1">花設置数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.life_count?.flower_place || 0}<span className="text-sm ml-1">束</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/30 backdrop-blur-sm p-4 shadow-lg shadow-amber-500/10 rounded-lg">
              <p className="text-amber-300 text-sm mb-1">木材破壊数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.life_count?.wood_break || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
          </div>
        </div>

        {/* Ore Mining Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <LuPickaxe className="w-6 h-6 text-gray-400" />
            鉱石破壊数
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-2 border-gray-600/30 backdrop-blur-sm p-4 shadow-lg shadow-gray-600/10 rounded-lg">
              <p className="text-gray-300 text-sm mb-1">石炭</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.coal_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-400/30 to-gray-500/30 border-2 border-gray-400/30 backdrop-blur-sm p-4 shadow-lg shadow-gray-400/10 rounded-lg">
              <p className="text-gray-200 text-sm mb-1">鉄</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.iron_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 border-2 border-yellow-500/30 backdrop-blur-sm p-4 shadow-lg shadow-yellow-500/10 rounded-lg">
              <p className="text-yellow-300 text-sm mb-1">金</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.gold_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/30 to-blue-700/30 border-2 border-blue-500/30 backdrop-blur-sm p-4 shadow-lg shadow-blue-500/10 rounded-lg">
              <p className="text-blue-300 text-sm mb-1">ラピスラズリ</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.lapis_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-600/30 to-red-700/30 border-2 border-red-500/30 backdrop-blur-sm p-4 shadow-lg shadow-red-500/10 rounded-lg">
              <p className="text-red-300 text-sm mb-1">レッドストーン</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.redstone_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/30 to-emerald-700/30 border-2 border-emerald-500/30 backdrop-blur-sm p-4 shadow-lg shadow-emerald-500/10 rounded-lg">
              <p className="text-emerald-300 text-sm mb-1">エメラルド</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.emerald_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 border-2 border-cyan-400/30 backdrop-blur-sm p-4 shadow-lg shadow-cyan-400/10 rounded-lg">
              <p className="text-cyan-300 text-sm mb-1">ダイヤモンド</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.diamond_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-600/30 to-orange-800/30 border-2 border-orange-600/30 backdrop-blur-sm p-4 shadow-lg shadow-orange-600/10 rounded-lg">
              <p className="text-orange-300 text-sm mb-1">銅</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.ore_count?.copper_ore || 0}<span className="text-sm ml-1">個</span>
              </p>
            </div>
          </div>
        </div>

        {/* Login Stats */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaCalendar className="w-6 h-6 text-blue-400" />
            ログイン関連
          </h2>
          <div className={`grid grid-cols-1 ${player.profile?.show_last_login === 1 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-500/30 backdrop-blur-sm p-4 shadow-lg shadow-blue-500/10 rounded-lg">
              <p className="text-blue-300 text-sm mb-1">ログイン日数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.player_count?.login || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-2 border-purple-500/30 backdrop-blur-sm p-4 shadow-lg shadow-purple-500/10 rounded-lg">
              <p className="text-purple-300 text-sm mb-1">連続ログイン日数</p>
              <p className="text-2xl font-bold text-white">
                {player.count?.player_count?.consecutive_login || 0}<span className="text-sm ml-1">回</span>
              </p>
            </div>
            {player.profile?.show_last_login === 1 && (
              <div className="bg-gradient-to-br from-cyan-900/30 to-sky-900/30 border-2 border-cyan-500/30 backdrop-blur-sm p-4 shadow-lg shadow-cyan-500/10 rounded-lg">
                <div className="flex items-start gap-2">
                  <FaClock className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <p className="text-cyan-300 text-sm mb-1">最終ログイン日時</p>
                    <p className="text-lg font-bold text-white">
                      {player.count?.player_count?.last_login_date
                        ? new Date(player.count.player_count.last_login_date).toLocaleString('ja-JP')
                        : '不明'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Next.jsルーティング用のデフォルトエクスポート
export default function PlayerPage({ params }: { params: { id: string } }) {
  const playerId = parseInt(params.id, 10);

  return (
    <PlayerDetailPage
      playerId={playerId}
      onBack={() => window.history.back()}
    />
  );
}