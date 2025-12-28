import type {Metadata} from "next";
import "./globals.css";
import AppHeader from "@/components/layouts/AppHeader";
import {notoSansJp} from "@/app/ui/fonts";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
    title: "UniverseWeb",
    description: "SpaceServerUniverseをWebから！",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode; }>) {
    return (
        <html lang="ja">
            <body className={notoSansJp.variable}>
                <AuthProvider>
                    <AppHeader/>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
