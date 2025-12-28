"use client"

import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSave, FaUser } from "react-icons/fa";

interface Profile {
  id: number;
  user_id: number;
  introduction: string;
  show_last_login: number;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [introduction, setIntroduction] = useState("");
  const [showLastLogin, setShowLastLogin] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setIntroduction(data.introduction || "");
          setShowLastLogin(data.show_last_login === 1);
        }
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await apiRequest("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          introduction,
          show_last_login: showLastLogin,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setSaveMessage("プロフィールを保存しました");
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage("保存に失敗しました");
      }
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      setSaveMessage("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white text-xl py-20">
            読み込み中...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            プロフィール設定
          </h1>
          <p className="text-blue-300">プロフィール情報を編集できます</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave}>
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-500/30 backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-blue-500/20 rounded-xl mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg shadow-lg shadow-blue-500/50">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  基本プロフィール
                </h2>
                <p className="text-blue-300 text-sm">
                  他のプレイヤーに表示される情報
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-6">
              <label className="block text-white font-bold mb-2">
                自己紹介
              </label>
              <textarea
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full bg-blue-950/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400/50 transition-colors resize-none"
                rows={5}
                maxLength={500}
                placeholder="よろしくお願いします！"
              />
              <div className="text-blue-300/70 text-sm mt-2 text-right">
                {introduction.length} / 500
              </div>
            </div>

            {/* Show Last Login */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLastLogin}
                  onChange={(e) => setShowLastLogin(e.target.checked)}
                  className="w-5 h-5 bg-blue-950/50 border-2 border-blue-500/30 rounded focus:outline-none focus:ring-2 focus:ring-blue-400/50 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                <div>
                  <span className="text-white font-bold">
                    最終ログイン日時を表示する
                  </span>
                  <p className="text-blue-300/70 text-sm">
                    他のプレイヤーがあなたのプロフィールを見たときに最終ログイン日時を表示します
                  </p>
                </div>
              </label>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                {saveMessage && (
                  <div
                    className={`text-sm font-medium ${
                      saveMessage.includes("成功") || saveMessage.includes("保存しました")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {saveMessage}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-blue-500 rounded-lg font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave className="w-4 h-4" />
                {isSaving ? "保存中..." : "保存する"}
              </button>
            </div>
          </div>
        </form>

        {/* Back to Dashboard */}
        <div className="text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            ← ダッシュボードに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
