"use client"
import React, { useState, useEffect } from 'react';
import { ArrowUp, Bot, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
const ScrollButtons = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAIOpen, setIsAIOpen] = useState(false);

    // Check scroll position and update visibility
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Toggle AI assistant
    const toggleAI = () => {
        setIsAIOpen(!isAIOpen);
    };

    return (
        <>
            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
                {/* AI Assistant Button - Always visible */}
                <Button
                    variant={isAIOpen ? "default" : "secondary"}
                    size="icon"
                    onClick={toggleAI}
                    className="rounded-full shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white border-0"
                >
                    {isAIOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </Button>

                {/* Scroll to Top Button - Only visible when scrolled */}
                <div className={`transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={scrollToTop}
                        className="rounded-full shadow-lg hover:shadow-xl"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* AI Assistant Panel */}
            {isAIOpen && (
                <div className="fixed bottom-24 right-8 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-xl shadow-2xl border z-40 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b bg-blue-600 text-white rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="h-5 w-5" />
                                <h3 className="font-semibold">AI Business Advisor</h3>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleAI}
                                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-blue-100 text-sm mt-1">Powered by Google Gemini</p>
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-2">
                                <Bot className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Hello! I'm your AI business advisor. I can help you with:
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                <div className="text-sm font-medium text-blue-900">💡 Business Strategy</div>
                                <div className="text-xs text-blue-700">Get strategic advice for growth</div>
                            </button>

                            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                <div className="text-sm font-medium text-green-900">📈 Marketing Ideas</div>
                                <div className="text-xs text-green-700">Boost your marketing efforts</div>
                            </button>

                            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                <div className="text-sm font-medium text-purple-900">⚡ Operations</div>
                                <div className="text-xs text-purple-700">Improve efficiency & processes</div>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <Link
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            href="/ai"

                        >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Start Full Conversation
                        </Link>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            AI-powered • Secure & Confidential
                        </p>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isAIOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-30"
                    onClick={toggleAI}
                />
            )}
        </>
    );
};

export default ScrollButtons;