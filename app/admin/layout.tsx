"use client"
import React from 'react';
import { AlertCircle, Layout, FileText, Users, Settings,Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation'

const Sidebar = () => {
    const { data: session, status } = useSession()
    const router= useRouter()
    const menuItems = [
        { icon: Layout, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: FileText, label: 'Posts', href: '/admin/posts' },
        { icon: Users, label: 'Users', href: '/admin/users' },
        { icon: Calendar, label: 'Events', href: '/admin/events' },
        { icon: Users, label: 'Mentorship', href: '/admin/mentorship' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ];
    if(session?.user.role == 'user' ) {
        router.push('/')
    }

    return (
        <div className="min-h-screen w-64 bg-gray-900 text-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Blog Admin</h1>
            </div>
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
            <div className="absolute bottom-4">
                <Button
                    variant="ghost"
                    className="text-white hover:text-red-400"
                    onClick={() => signOut()}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100 min-h-screen">
                {children}
            </main>
        </div>
    );
}