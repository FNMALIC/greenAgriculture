"use client"
import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ShoppingCart, Camera, BookOpen, Users, LogOut, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Logo from "../public/logo.png"
import { useSession, signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Nav = () => {
    const { data: session, status } = useSession()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' })
    }

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between px-4 py-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-[#28B4A3]">CropLink</span>
                        <Image src={Logo} alt={"CropLink logo"}  width={30} height={30}/>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/marketplace" className="flex items-center space-x-1 text-gray-600 hover:text-[#28B4A3]">
                            <ShoppingCart className="h-4 w-4" />
                            <span>Marketplace</span>
                        </Link>
                        <Link href="/gallery" className="flex items-center space-x-1 text-gray-600 hover:text-[#28B4A3]">
                            <Camera className="h-4 w-4" />
                            <span>Gallery</span>
                        </Link>
                        <Link href="/blog" className="flex items-center space-x-1 text-gray-600 hover:text-[#28B4A3]">
                            <BookOpen className="h-4 w-4" />
                            <span>Blog</span>
                        </Link>
                        {/*<Link href="/resources" className="flex items-center space-x-1 text-gray-600 hover:text-[#28B4A3]">*/}
                        {/*    <Users className="h-4 w-4" />*/}
                        {/*    <span>Community</span>*/}
                        {/*</Link>*/}
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                            {isSearchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className="absolute right-0 top-12 z-50 bg-white shadow-lg rounded-md p-2"
                                >
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-64"
                                    />
                                </form>
                            )}
                        </div>

                        {/* Authentication Section */}
                        {status === "loading" ? (
                            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10 rounded-full bg-[#28B4A3] text-white hover:bg-[#0D8B7C]"
                                    >
                                        {session.user?.name ? getInitials(session.user.name) : "U"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuItem className="cursor-default">
                                        <User className="mr-2 h-4 w-4" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{session.user?.name}</span>
                                            <span className="text-xs text-gray-500">{session.user?.email}</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/auth/join">
                                <Button className="bg-[#28B4A3] hover:bg-[#0D8B7C] text-white">
                                    Join CropLink
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden px-4 py-2 space-y-2 border-t">
                        <Link href="/marketplace" className="flex items-center space-x-2 py-2 text-gray-600">
                            <ShoppingCart className="h-4 w-4" />
                            <span>Marketplace</span>
                        </Link>
                        <Link href="/gallery" className="flex items-center space-x-2 py-2 text-gray-600">
                            <Camera className="h-4 w-4" />
                            <span>Gallery</span>
                        </Link>
                        <Link href="/blog" className="flex items-center space-x-2 py-2 text-gray-600">
                            <BookOpen className="h-4 w-4" />
                            <span>Blog</span>
                        </Link>
                        <Link href="/resources" className="flex items-center space-x-2 py-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Community</span>
                        </Link>
                        <form onSubmit={handleSearch} className="py-2">
                            <Input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>

                        {/* Mobile Authentication Section */}
                        {status === "loading" ? (
                            <div className="py-2">
                                <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ) : session ? (
                            <div className="py-2 space-y-2">
                                <div className="flex items-center space-x-2 py-2 text-gray-600">
                                    <div className="h-8 w-8 rounded-full bg-[#28B4A3] text-white flex items-center justify-center text-sm font-medium">
                                        {session.user?.name ? getInitials(session.user.name) : "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{session.user?.name}</span>
                                        <span className="text-xs text-gray-500">{session.user?.email}</span>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleSignOut}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </Button>
                            </div>
                        ) : (
                            <Link href="/auth/join" className="block py-2">
                                <Button className="w-full bg-[#28B4A3] hover:bg-[#0D8B7C] text-white">
                                    Join CropLink
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}