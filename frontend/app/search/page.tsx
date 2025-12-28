"use client"
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { apiRequest } from "@/utils/api";
import { User } from "@/types/user";
import { PlayerDetailPage } from "../player/[id]/page";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPlayers, setAllPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const playersPerPage = 50;

  // APIからプレイヤーデータを取得
  const fetchPlayers = async (query: string) => {
    setLoading(true);
    try {
      const response = await apiRequest(`/api/users/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log("API Response:", data);
      if (Array.isArray(data)) {
        setAllPlayers(data);
      } else {
        console.error("API did not return an array:", data);
        setAllPlayers([]);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
      setAllPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // 検索クエリが変更されたら検索を実行
  useEffect(() => {
    // 初回ロード時（searchQueryが空）即座にロード
    if (searchQuery === "") {
      fetchPlayers(searchQuery);
      return;
    }

    const timer = setTimeout(() => {
      fetchPlayers(searchQuery);
    }, 300); // デバウンス

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPlayers = allPlayers;

  // ページネーション計算
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex);

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 検索時にページをリセット
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ページ番号の配列を生成
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // 詳細ページが選択されている場合は詳細ページを表示
  if (selectedPlayerId !== null) {
    return <PlayerDetailPage playerId={selectedPlayerId} onBack={() => setSelectedPlayerId(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-8 px-4  pt-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" >
            プレイヤー検索
          </h1>
          <p className="text-blue-300" >
            プレイヤーを検索してプロフィールを確認
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              placeholder="プレイヤー名を入力..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-6 bg-gradient-to-br from-blue-950/80 to-purple-950/80 border-2 border-blue-500/30 text-white placeholder:text-blue-300/50 focus:border-cyan-400 shadow-lg shadow-blue-500/20 backdrop-blur-sm rounded-xl"

            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-blue-300" >
            {loading ? "検索中..." : `${filteredPlayers.length} 人のプレイヤーが見つかりました`}
          </p>
        </div>

        {/* Player Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {currentPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-blue-500/10 hover:shadow-cyan-500/30 overflow-hidden rounded-lg"
              >
                <div className="aspect-square overflow-hidden bg-gray-800">
                  <img
                    src={`https://mc-heads.net/avatar/${player.uuid}/100`}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="font-bold text-white truncate text-xs" >
                    {player.custom_name?.custom_name || player.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm p-12 text-center shadow-lg shadow-blue-500/10 rounded-xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2" >
                プレイヤーが見つかりませんでした
              </h3>
              <p className="text-blue-300" >
                別のキーワードで検索してみてください
              </p>
            </div>
          )
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all shadow-lg shadow-blue-500/10 disabled:opacity-30 disabled:cursor-not-allowed p-3 ${
                currentPage === 1 ? '' : 'hover:shadow-cyan-500/30'
              } rounded-xl`}
            >
              <FaChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex gap-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-4 py-2 text-blue-300">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`min-w-[48px] px-4 py-2 border-2 backdrop-blur-sm transition-all rounded-xl ${
                      page === currentPage
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 shadow-lg shadow-blue-500/50 text-white font-bold'
                        : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 hover:border-cyan-400/50 text-blue-300 hover:shadow-cyan-500/30 rounded-xl'
                    }`}

                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all shadow-lg shadow-blue-500/10 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-xl ${
                currentPage === totalPages ? '' : 'hover:shadow-cyan-500/30'
              }`}
            >
              <FaChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}