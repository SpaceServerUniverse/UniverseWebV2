export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            サーバーに入るには
          </h1>
          <p className="text-blue-300">
            SpaceServerUniverseへの参加方法
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-500/30 backdrop-blur-sm p-8 shadow-lg shadow-blue-500/20 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">サーバー情報</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">サーバーアドレス</h3>
              <p className="text-white bg-blue-950/50 px-4 py-2 rounded-lg font-mono">
                準備中
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">バージョン</h3>
              <p className="text-white">
                準備中
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/30 backdrop-blur-sm p-8 shadow-lg shadow-purple-500/20 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">参加方法</h2>
          <ol className="space-y-4 text-white">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold mb-1">Minecraftを起動</h3>
                <p className="text-blue-300">
                  対応バージョンのMinecraftを起動してください
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold mb-1">マルチプレイを選択</h3>
                <p className="text-blue-300">
                  メニューから「マルチプレイ」を選択してください
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold mb-1">サーバーを追加</h3>
                <p className="text-blue-300">
                  上記のサーバーアドレスを入力してサーバーを追加してください
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
