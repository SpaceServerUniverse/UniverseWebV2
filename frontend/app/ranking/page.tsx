"use client"
import { useState, useEffect } from "react";
import { FaClock, FaCoins, FaCrown, FaMedal, FaStar, FaTrophy, FaFish, FaHammer, FaCube, FaTree, FaGem, FaSkull, FaSign } from "react-icons/fa";
import { TbSwords } from "react-icons/tb";
import { LuPickaxe } from "react-icons/lu";
import { apiRequest } from "@/utils/api";
import { User } from "@/types/user";

type RankingType = "level" | "money" | "login" | "block_break" | "block_place" | "fishing" | "player_kill" | "mob_kill" | "diamond_ore" | "wood_break";

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<RankingType>("level");
  const [rankings, setRankings] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const response = await apiRequest(`/api/rankings?type=${activeTab}&limit=10`);
        const data = await response.json();
        setRankings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [activeTab]);

  const getValue = (user: User): number => {
    switch (activeTab) {
      case "level":
        return user.player_level?.player_normal_level?.level || 0;
      case "money":
        return user.money?.money || 0;
      case "login":
        return user.count?.player_count?.login || 0;
      case "block_break":
        return user.count?.life_count?.block_break || 0;
      case "block_place":
        return user.count?.life_count?.block_place || 0;
      case "fishing":
        return user.count?.life_count?.fishing || 0;
      case "player_kill":
        return user.count?.kill_death_count?.player_kill || 0;
      case "mob_kill":
        return user.count?.kill_death_count?.mob_kill || 0;
      case "diamond_ore":
        return user.count?.ore_count?.diamond_ore || 0;
      case "wood_break":
        return user.count?.life_count?.wood_break || 0;
      default:
        return 0;
    }
  };

  const formatValue = (value: number) => {
    switch (activeTab) {
      case "level":
        return `Lv. ${value}`;
      case "money":
        return `${value.toLocaleString()} コイン`;
      case "login":
        return `${value} 回`;
      case "block_break":
      case "block_place":
      case "wood_break":
        return `${value.toLocaleString()} 個`;
      case "fishing":
        return `${value.toLocaleString()} 匹`;
      case "player_kill":
        return `${value.toLocaleString()} 人`;
      case "mob_kill":
        return `${value.toLocaleString()} 体`;
      case "diamond_ore":
        return `${value.toLocaleString()} 個`;
      default:
        return value.toLocaleString();
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case "level":
        return <FaStar className="w-5 h-5" />;
      case "money":
        return <FaCoins className="w-5 h-5" />;
      case "login":
        return <FaClock className="w-5 h-5" />;
      case "block_break":
        return <FaHammer className="w-5 h-5" />;
      case "block_place":
        return <FaCube className="w-5 h-5" />;
      case "fishing":
        return <FaFish className="w-5 h-5" />;
      case "player_kill":
        return <TbSwords className="w-5 h-5" />;
      case "mob_kill":
        return <FaSkull className="w-5 h-5" />;
      case "diamond_ore":
        return <FaGem className="w-5 h-5" />;
      case "wood_break":
        return <FaTree className="w-5 h-5" />;
    }
  };

  const getTabName = () => {
    switch (activeTab) {
      case "level":
        return "レベル";
      case "money":
        return "所持金";
      case "login":
        return "ログイン回数";
      case "block_break":
        return "ブロック破壊数";
      case "block_place":
        return "ブロック設置数";
      case "fishing":
        return "魚釣り数";
      case "player_kill":
        return "PvPキル数";
      case "mob_kill":
        return "Mobキル数";
      case "diamond_ore":
        return "ダイヤ採掘数";
      case "wood_break":
        return "木材破壊数";
    }
  };

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            プレイヤーランキング
          </h1>
          <p className="text-blue-300">
            サーバートップのプレイヤーたち
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("level")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "level"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/50"
                : "bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/40"
            }`}
          >
            <FaStar className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">レベル</span>
          </button>
          <button
            onClick={() => setActiveTab("money")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "money"
                ? "bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-500 shadow-lg shadow-yellow-500/50"
                : "bg-yellow-900/20 border-yellow-500/30 hover:bg-yellow-900/40"
            }`}
          >
            <FaCoins className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">所持金</span>
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "login"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500 shadow-lg shadow-cyan-500/50"
                : "bg-cyan-900/20 border-cyan-500/30 hover:bg-cyan-900/40"
            }`}
          >
            <FaClock className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">ログイン</span>
          </button>
          <button
            onClick={() => setActiveTab("block_break")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "block_break"
                ? "bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 shadow-lg shadow-orange-500/50"
                : "bg-orange-900/20 border-orange-500/30 hover:bg-orange-900/40"
            }`}
          >
            <FaHammer className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">破壊</span>
          </button>
          <button
            onClick={() => setActiveTab("block_place")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "block_place"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-500 shadow-lg shadow-green-500/50"
                : "bg-green-900/20 border-green-500/30 hover:bg-green-900/40"
            }`}
          >
            <FaCube className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">設置</span>
          </button>
          <button
            onClick={() => setActiveTab("fishing")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "fishing"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500 shadow-lg shadow-blue-500/50"
                : "bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40"
            }`}
          >
            <FaFish className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">釣り</span>
          </button>
          <button
            onClick={() => setActiveTab("player_kill")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "player_kill"
                ? "bg-gradient-to-r from-red-600 to-rose-600 border-red-500 shadow-lg shadow-red-500/50"
                : "bg-red-900/20 border-red-500/30 hover:bg-red-900/40"
            }`}
          >
            <TbSwords className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">PvP</span>
          </button>
          <button
            onClick={() => setActiveTab("mob_kill")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "mob_kill"
                ? "bg-gradient-to-r from-gray-600 to-slate-600 border-gray-500 shadow-lg shadow-gray-500/50"
                : "bg-gray-900/20 border-gray-500/30 hover:bg-gray-900/40"
            }`}
          >
            <FaSkull className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">Mob</span>
          </button>
          <button
            onClick={() => setActiveTab("diamond_ore")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "diamond_ore"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400 shadow-lg shadow-cyan-400/50"
                : "bg-cyan-900/20 border-cyan-400/30 hover:bg-cyan-900/40"
            }`}
          >
            <FaGem className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">ダイヤ</span>
          </button>
          <button
            onClick={() => setActiveTab("wood_break")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              activeTab === "wood_break"
                ? "bg-gradient-to-r from-amber-700 to-orange-700 border-amber-600 shadow-lg shadow-amber-600/50"
                : "bg-amber-900/20 border-amber-600/30 hover:bg-amber-900/40"
            }`}
          >
            <FaTree className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">木材</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl py-20">読み込み中...</div>
        ) : rankings.length === 0 ? (
          <div className="text-center text-white text-xl py-20">データがありません</div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {top3.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 2nd Place */}
                {top3.length >= 2 && (
                  <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 border-2 border-gray-400/50 backdrop-blur-sm p-6 shadow-lg shadow-gray-500/20 md:order-1 order-2 rounded-xl">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center border-4 border-gray-300 shadow-lg shadow-gray-400/50 overflow-hidden">
                            <img
                              src={`https://mc-heads.net/avatar/${top3[1].uuid}/100`}
                              alt={top3[1].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white shadow-lg">
                            <FaMedal className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {top3[1].custom_name?.custom_name || top3[1].name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-gray-300 mb-2">
                        {getIcon()}
                        <span className="font-bold">{formatValue(getValue(top3[1]))}</span>
                      </div>
                      <div className="text-6xl font-bold text-gray-400">2</div>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                <div className="bg-gradient-to-br from-yellow-600/40 to-amber-700/40 border-2 border-yellow-400/50 backdrop-blur-sm p-6 shadow-2xl shadow-yellow-500/30 md:order-2 order-1 md:scale-110 rounded-xl">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-2xl shadow-yellow-400/50 animate-pulse overflow-hidden">
                          <img
                            src={`https://mc-heads.net/avatar/${top3[0].uuid}/120`}
                            alt={top3[0].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-white shadow-lg">
                          <FaCrown className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {top3[0].custom_name?.custom_name || top3[0].name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-yellow-200 mb-2">
                      {getIcon()}
                      <span className="font-bold text-lg">{formatValue(getValue(top3[0]))}</span>
                    </div>
                    <div className="text-7xl font-bold text-yellow-300">1</div>
                  </div>
                </div>

                {/* 3rd Place */}
                {top3.length >= 3 && (
                  <div className="bg-gradient-to-br from-orange-700/40 to-orange-900/40 border-2 border-orange-600/50 backdrop-blur-sm p-6 shadow-lg shadow-orange-500/20 md:order-3 order-3 rounded-xl">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center border-4 border-orange-500 shadow-lg shadow-orange-600/50 overflow-hidden">
                            <img
                              src={`https://mc-heads.net/avatar/${top3[2].uuid}/100`}
                              alt={top3[2].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white shadow-lg">
                            <FaTrophy className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {top3[2].custom_name?.custom_name || top3[2].name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-orange-300 mb-2">
                        {getIcon()}
                        <span className="font-bold">{formatValue(getValue(top3[2]))}</span>
                      </div>
                      <div className="text-6xl font-bold text-orange-500">3</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Rankings 4-10 */}
            {rest.length > 0 && (
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10 rounded-xl">
                <div className="divide-y divide-blue-500/20">
                  {rest.map((player, index) => (
                    <div
                      key={player.id}
                      className="p-4 hover:bg-blue-900/20 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-white border-2 border-blue-400 shadow-lg shadow-blue-500/30">
                          {index + 4}
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={`https://mc-heads.net/avatar/${player.uuid}/50`}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">
                            {player.custom_name?.custom_name || player.name}
                          </h4>
                          <div className="flex items-center gap-2 text-blue-300 text-sm">
                            {getIcon()}
                            <span>{formatValue(getValue(player))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}