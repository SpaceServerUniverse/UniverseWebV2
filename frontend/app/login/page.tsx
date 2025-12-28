"use client"
import { FaLock, FaUser } from "react-icons/fa";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { login, isAuthenticated, isLoading: authLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push("/dashboard")
        }
    }, [authLoading, isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await login(name, password)
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ログインに失敗しました')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <main className="min-h-screen bg-[#0a0a1a]">
            <section>
                <div
                    id="main-section"
                    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        key="login-form"
                        className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12  mt-10">
                        <form onSubmit={handleSubmit}>
                            <div className="w-full max-w-md bg-gradient-to-br from-blue-950/80 to-purple-950/80 border-2 border-blue-500/30 backdrop-blur-md shadow-2xl shadow-blue-500/20 rounded-xl">
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            LOGIN
                                        </h1>
                                        <p className="text-blue-200">
                                            アカウントにログインしてください
                                        </p>
                                    </div>

                                    {/* Login Form */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="username"
                                                className="text-blue-200 flex items-center gap-2"
                                            >
                                                <FaUser className="w-4 h-4" />
                                                ユーザー名
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="ユーザー名を入力"
                                                className="bg-[#0a0a1a]/80 border-blue-500/30 text-white placeholder:text-gray-600 focus:border-cyan-400 h-12 shadow-inner rounded-xl w-full ps-3"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}

                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="password"
                                                className="text-blue-200 flex items-center gap-2"
                                            >
                                                <FaLock className="w-4 h-4" />
                                                パスワード
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="パスワードを入力"
                                                className="bg-[#0a0a1a]/80 border-blue-500/30 text-white placeholder:text-gray-600 focus:border-cyan-400 h-12 shadow-inner rounded-xl w-full ps-3"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="mt-0 py-0 text-white">※注意<br />
                                            <br />Minecraftサーバー内でパスワードを登録してください。
                                            <br />パスワードは何度でも変更することができます。
                                            <br />パスワードはハッシュ化され、安全に保存されるので第三者に閲覧されることはありません。
                                            <br />/password [パスワード]</p>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm"
                                            >
                                                {error}
                                            </motion.div>
                                        )}
                                        <button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 border-b-4 border-blue-800 hover:border-purple-800 transition-all shadow-lg shadow-blue-500/50 rounded-xl"
                                            disabled = {isLoading}
                                        >
                                            {isLoading ? "ロード中...": "ログイン"}
                                            
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
