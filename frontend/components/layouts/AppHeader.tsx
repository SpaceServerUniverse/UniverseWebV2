"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AppHeader() {
    const { isAuthenticated } = useAuth()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const topPageItems = [
        { href: "/login", label: "ログイン" },
        { href: "/about", label: "サーバーに入るには" },
    ]

    const authItems = [
        { href: "/dashboard", label: "ダッシュボード" },
        { href: "/search", label: "検索" },
        //{ href: "/shop", label: "ショップ" },
        //{ href: "/friend", label: "フレンド" },
        { href: "/ranking", label: "ランキング" },
        { href: "/settings", label: "設定" },
    ]

    const guestItems = [
        { href: "/about", label: "サーバーに入るには" },
        { href: "/login", label: "ログイン" },
    ]

    const navItems = pathname === "/" ? topPageItems : isAuthenticated ? authItems : guestItems

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-sky-400/20 bg-gradient-to-r from-[#070814]/95 via-[#0b1328]/95 to-[#07131c]/95 backdrop-blur">
                <div className="absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
                <div className="container mx-auto px-4 py-4 md:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-white text-sm md:text-xl tracking-wide">
                            <Link href="/" className="inline-flex items-center gap-2">
                                <span className="font-semibold">SpaceServerUniverse</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <nav className="hidden md:flex items-center gap-2 lg:gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <button
                                type="button"
                                aria-expanded={isMenuOpen}
                                aria-label="メニューを開く"
                                className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/10"
                                onClick={() => setIsMenuOpen((open) => !open)}
                            >
                                <span className="sr-only">menu</span>
                                <div className="flex flex-col gap-1">
                                    <span className={`h-0.5 w-5 rounded-full bg-white transition ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                                    <span className={`h-0.5 w-5 rounded-full bg-white transition ${isMenuOpen ? "opacity-0" : ""}`} />
                                    <span className={`h-0.5 w-5 rounded-full bg-white transition ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ${
                            isMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
