"use client"
import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Code, Users, Calendar, BookOpen, Lightbulb, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from "next/link";
const FloatingElements = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Code Symbols */}
            <div className="absolute top-20 left-10 text-6xl text-blue-200 opacity-30 animate-pulse font-mono">{'{'}</div>
            <div className="absolute top-32 right-16 text-4xl text-blue-300 opacity-40 animate-bounce font-mono" style={{animationDuration: '3s'}}>{'<>'}</div>
            <div className="absolute bottom-40 left-20 text-5xl text-blue-200 opacity-30 animate-ping font-mono" style={{animationDuration: '4s'}}>{'}'}</div>
            <div className="absolute top-1/2 right-1/4 text-3xl text-blue-300 opacity-35 animate-pulse font-mono" style={{animationDuration: '2s'}}>{'</>'}</div>

            {/* Binary Numbers */}
            <div className="absolute top-40 left-1/3 text-2xl text-blue-200 opacity-25 animate-float font-mono">01001</div>
            <div className="absolute bottom-32 right-1/3 text-xl text-blue-300 opacity-30 animate-float font-mono" style={{animationDelay: '1s'}}>11010</div>
            <div className="absolute top-60 left-1/4 text-lg text-blue-200 opacity-20 animate-float font-mono" style={{animationDelay: '2s'}}>10110</div>

            {/* Geometric Shapes */}
            <div className="absolute top-24 right-1/2 w-16 h-16 border-2 border-blue-300 rounded-full opacity-20 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-20 left-1/2 w-12 h-12 bg-blue-200 opacity-25 transform rotate-45 animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-80 right-20 w-8 h-8 bg-blue-300 rounded-full opacity-30 animate-ping" style={{animationDuration: '5s'}}></div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

const SearchSuggestions = () => {

    const popularPages = [
        { title: "Upcoming Events", icon: <Calendar className="h-5 w-5" />, path: "/events" },
        { title: "Learning Resources", icon: <BookOpen className="h-5 w-5" />, path: "/resources" },
        { title: "Project Showcase", icon: <Code className="h-5 w-5" />, path: "/projects" },
        { title: "Blog Posts", icon: <Lightbulb className="h-5 w-5" />, path: "/blog" },
        { title: "Contact Us", icon: <MessageCircle className="h-5 w-5" />, path: "/contact" }
    ];



    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">

            {/* Popular Pages */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {popularPages.map((page, index) => (
                        <Link
                            key={index}
                            href={page.path}
                            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 text-left group"

                        >
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                                {page.icon}
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {page.title}
                            </span>
                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-500 transition-colors duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const NotFoundPage = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const handleGoBack = () => {
        // In a real app, this would use router.back() or window.history.back()
        console.log('Going back');
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
            <FloatingElements />

            <div className="relative z-10 min-h-screen flex flex-col">

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* 404 Animation */}
                        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="mb-8">
                                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
                                    404
                                </h1>
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                                    <Code className="h-8 w-8 text-blue-600 animate-pulse" />
                                    <div className="h-1 w-16 bg-gradient-to-l from-blue-600 to-transparent rounded-full"></div>
                                </div>
                            </div>

                            <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Oops! Page Not Found
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    The page you're looking for seems to have wandered off into the digital wilderness.
                                    But don't worry, we're here to help you find your way back to the amazing content
                                    and community at Codees Cameroon!
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <Home className="h-5 w-5" />
                                        Back to Home
                                    </Link>
                                    <button
                                        onClick={handleGoBack}
                                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        Previous Page
                                    </button>
                                </div>
                            </div>

                            {/* Search and Suggestions */}
                            <div className={`transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-12`}>
                                <SearchSuggestions />
                            </div>
                        </div>

                      </div>
                </main>


            </div>
        </div>
    );
};

export default NotFoundPage;