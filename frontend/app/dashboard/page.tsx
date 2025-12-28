"use client"

import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/user";
import { apiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAward, FaCoins, FaStar, FaUser } from "react-icons/fa";
import { FaTradeFederation } from "react-icons/fa6";

export default function DashboardPage() {
    const router = useRouter()
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<User>()

    const getUser = async () => {
        try {
            const response = await apiRequest(`/api/getTopPageUser`)

            if (response.ok) {
                const data = await response.json()
                setUser(data)
            }
        } catch (error) {
            console.error('ユーザー取得エラー:', error)
            router.push('/')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }

        getUser();
    }, [authLoading, isAuthenticated, router])


    const nextExp = user?.player_level?.player_normal_level ? user?.player_level?.player_normal_level?.exp + user?.player_level?.player_normal_level?.exp_for_next_level : 0;
    const expPercentage = user?.player_level?.player_normal_level?.exp_for_next_level
        ? Math.min(100, (user?.player_level?.player_normal_level?.exp / nextExp * 100))
        : 0;

    return (
        <div className="min-h-screen bg-[#0a0a1a] py-8 px-4 pt-[100px]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" >
                                ダッシュボード
                            </h1>
                            <p className="text-blue-300" >
                                ようこそ、{user?.name}さん
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/settings")}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-blue-500 rounded-lg font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all text-sm"
                        >
                            プロフィール編集
                        </button>
                    </div>
                </div>

                {/* Player Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Money Card */}
                    <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30 backdrop-blur-sm p-6 shadow-lg shadow-yellow-500/20 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-yellow-600 to-amber-600 p-3 rounded-lg shadow-lg shadow-yellow-500/50">
                                <FaCoins className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-yellow-300 text-sm" >所持金</p>
                                <p className="text-2xl font-bold text-white" >
                                    {user?.money?.money.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-sm p-6 shadow-lg shadow-purple-500/20 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg shadow-lg shadow-purple-500/50">
                                <FaStar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-purple-300 text-sm" >レベル</p>
                                <p className="text-2xl font-bold text-white" >
                                    {user?.player_level?.player_normal_level?.level}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/20 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-lg shadow-lg shadow-cyan-500/50">
                                <FaTradeFederation className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-cyan-300 text-sm" >プレイ時間</p>
                                <p className="text-2xl font-bold text-white" >
                                    {user?.user_position?.position?.name ?? "鯖民"}
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-cyan-200/70" >
                            役職
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30 backdrop-blur-sm p-6 shadow-lg shadow-green-500/20 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-lg shadow-lg shadow-green-500/50">
                                <FaAward className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-green-300 text-sm" >実績</p>
                                <p className="text-2xl font-bold text-white" >
                                    0
                                </p>
                            </div>
                        </div>
                        <div className="text-sm text-green-200/70" >
                            達成した実績
                        </div>
                    </div>
                </div>

                {/* Experience Progress */}
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 backdrop-blur-sm p-6 mb-8 shadow-lg shadow-blue-500/20 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg shadow-lg shadow-blue-500/50">
                            <FaUser className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-blue-300 text-sm" >経験値</p>
                                <p className="text-white text-sm" >
                                    {(user?.player_level?.player_normal_level?.exp.toLocaleString() ?? 0)} / {(user?.player_level?.player_normal_level?.exp_for_next_level.toLocaleString() ?? 0)} EXP
                                </p>
                            </div>
                            <div className="w-full bg-blue-950/50 rounded-full h-4 overflow-hidden border border-blue-500/30">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50 rounded-xl"
                                    style={{ width: `${expPercentage}%` }}
                                />
                            </div>
                            <p className="text-blue-200/70 text-xs mt-2" >
                                次のレベルまであと {((user?.player_level?.player_normal_level?.exp_for_next_level ?? 0) - (user?.player_level?.player_normal_level?.exp ?? 0)).toLocaleString()} EXP
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-sm p-6 shadow-lg shadow-purple-500/10 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4" >
                            最近のアクティビティ
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                                <div>
                                    <p className="text-white text-sm" >
                                        惑星「ネプチューンα」を発見
                                    </p>
                                    <p className="text-purple-300/70 text-xs mt-1">2時間前</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                <div>
                                    <p className="text-white text-sm" >
                                        レベル42に到達
                                    </p>
                                    <p className="text-purple-300/70 text-xs mt-1">5時間前</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                <div>
                                    <p className="text-white text-sm" >
                                        実績「宇宙探検家」を獲得
                                    </p>
                                    <p className="text-purple-300/70 text-xs mt-1">1日前</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/10 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4" >
                            統計情報
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                                <span className="text-cyan-200" >発見した惑星</span>
                                <span className="text-white font-bold">12</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                                <span className="text-cyan-200" >建設した基地</span>
                                <span className="text-white font-bold">5</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                                <span className="text-cyan-200" >倒したボス</span>
                                <span className="text-white font-bold">8</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                                <span className="text-cyan-200" >採掘した鉱石</span>
                                <span className="text-white font-bold">2,547</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
