"use client"
import { motion } from "motion/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAccessibleIcon, FaServer, FaUser } from "react-icons/fa";

export default function Home() {

    const [players, setPlayers] = useState<number>(0)
    const [maxPlayers, setMaxPlayers] = useState<number>(0)
    const [online, setOnline] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMCStatus = async () => {
        setLoading(true)
        try {
            const response = await axios.get("https://api.mcsrvstat.us/3/e.r1nd0.dev:49153")
            const isOnline = Boolean(response.data?.online)
            setOnline(isOnline)
            if (isOnline) {
                setPlayers(response.data.players?.online ?? 0)
                setMaxPlayers(response.data.players?.max ?? 0)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMCStatus();
    }, [])
    return (
        <>
            <main className="min-h-screen bg-[#0a0a1a]">
                <section>
                    <div
                        id="main-section"
                        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
                    >
                        <div className="w-full max-w-4xl px-6 py-16 text-center">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                key="h1-container"
                                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4  bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            >
                                SpaceServer
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                key="h2-container"
                                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4  bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            >
                                - Universe -
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2 }}
                                key="contents-container"
                            >
                                <p className="text-lg sm:text-xl text-white mb-10">
                                    宇宙を舞台にした、新たな生活を体験しよう
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2 }}
                                key="buttons-container">
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 border-b-4 border-blue-800 hover:border-purple-800 transition-all shadow-lg shadow-blue-500/50
                                                rounded-xl"
                                    >
                                        サーバーに参加
                                    </button>
                                    <button
                                        className="bg-white/10 hover:bg-white/20 text-white border-2 border-cyan-400/50 px-8 py-2 shadow-lg shadow-cyan-500/30 rounded-xl"
                                    >
                                        詳細を確認する
                                    </button>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>
                <section>
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 backdrop-blur-sm p-6 shadow-lg shadow-blue-500/20 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-lg shadow-lg shadow-cyan-500/50">
                                        <FaServer className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-blue-300 text-sm">サーバー状態</p>
                                        <p className="text-2xl font-bold text-cyan-400">{loading ? "Loading..." :
                                            online ? (
                                                <span className="text-lime-500">
                                                    オンライン
                                                </span>
                                            ) : (
                                                <span className="text-red-500">
                                                    オフライン
                                                </span>
                                            )
                                        }</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-sm p-6 shadow-lg shadow-purple-500/20 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-lg shadow-lg shadow-purple-500/50">
                                        <FaUser className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-purple-300 text-sm">オンライン</p>
                                        <p className="text-2xl font-bold text-white">
                                            {loading ? "Loading..." : players + "/" + maxPlayers}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/30 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/20 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-4 rounded-lg shadow-lg shadow-cyan-500/50">
                                        <FaAccessibleIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-cyan-300 text-sm">バージョン</p>
                                        <p className="text-2xl font-bold text-white">1.21.10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
