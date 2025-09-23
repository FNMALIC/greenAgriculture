'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Lightbulb, TrendingUp, Target, Zap, Loader2 } from 'lucide-react'

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;




// Markdown rendering component
const MarkdownRenderer = ({ content }) => {
    const renderMarkdown = (text) => {
        // Replace **bold** with <strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Replace *italic* with <em>
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Replace ### headers with <h3>
        text = text.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-900">$1</h3>');

        // Replace ## headers with <h2>
        text = text.replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2 text-gray-900">$1</h2>');

        // Replace # headers with <h1>
        text = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2 text-gray-900">$1</h1>');

        // Replace bullet points with proper list items
        const lines = text.split('\n');
        let inList = false;
        const processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.match(/^[\s]*[-*+]\s/)) {
                if (!inList) {
                    processedLines.push('<ul class="list-disc list-inside ml-4 mt-2 mb-2 space-y-1">');
                    inList = true;
                }
                const listItem = line.replace(/^[\s]*[-*+]\s/, '');
                processedLines.push(`<li class="text-gray-800">${listItem}</li>`);
            } else if (line.match(/^[\s]*\d+\.\s/)) {
                if (!inList) {
                    processedLines.push('<ol class="list-decimal list-inside ml-4 mt-2 mb-2 space-y-1">');
                    inList = true;
                }
                const listItem = line.replace(/^[\s]*\d+\.\s/, '');
                processedLines.push(`<li class="text-gray-800">${listItem}</li>`);
            } else {
                if (inList) {
                    processedLines.push('</ul>');
                    inList = false;
                }
                if (line.trim()) {
                    processedLines.push(`<p class="mb-2">${line}</p>`);
                } else {
                    processedLines.push('<br>');
                }
            }
        }

        if (inList) {
            processedLines.push('</ul>');
        }

        return processedLines.join('\n');
    };

    return (
        <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
    );
};
const geminiApiConfig = {
    getHeaders: () => ({
        'Content-Type': 'application/json',
    }),

    // Format message for Gemini API
    formatPayload: (message, history = []) => {
        // Build conversation context with system instruction
        const systemInstruction = "You are an expert business advisor. Your goal is to help entrepreneurs grow your businesses. Provide actionable, strategic advice. Be concise and helpful.";

        // Create contents array with conversation history
        const contents = [];

        // Add system context as the first user message if history is empty
        if (history.length === 0) {
            contents.push({
                role: "user",
                parts: [{ text: `${systemInstruction}\n\n${message}` }]
            });
        } else {
            // Add conversation history with proper roles
            history.forEach((turn) => {
                if (turn.type === 'user') {
                    contents.push({
                        role: "user",
                        parts: [{ text: turn.content }]
                    });
                } else if (turn.type === 'bot') {
                    contents.push({
                        role: "model",
                        parts: [{ text: turn.content }]
                    });
                }
            });

            // Add current user message
            contents.push({
                role: "user",
                parts: [{ text: message }]
            });
        }

        return {
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.9,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };
    }
};

// Actual API call function to Gemini
const makeGeminiRequest = async (message, conversationHistory) => {
    if (!GEMINI_API_KEY) {
        console.error("Gemini API key is not set.");
        throw new Error("AI service is not configured. Missing API key.");
    }

    try {
        const payload = geminiApiConfig.formatPayload(message, conversationHistory);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: geminiApiConfig.getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error Details:', errorData);
            let errorMessage = `AI API error: ${response.status}`;
            if (errorData && errorData.error) {
                errorMessage += ` - ${errorData.error.message || errorData.error}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // The response structure for Gemini is data.candidates[0].content.parts[0].text
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            let generatedText = data.candidates[0].content.parts[0].text.trim();
            return generatedText;
        } else {
            console.error('Unexpected AI API response structure:', data);
            return "I apologize, but I received an unexpected response from the AI.";
        }
    } catch (error) {
        console.error('Gemini API Call Error:', error);
        // Provide a more user-friendly error message based on the caught error
        if (error.message.includes("quota") || error.message.includes("limit")) {
            throw new Error("The AI service has reached its usage limit. Please try again later.");
        }
        throw new Error(error.message || "I'm having trouble connecting to my knowledge base right now.");
    }
};

export default function AIAssistantInterface() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: "Hello! I'm your AI business advisor powered by Google Gemini. I'm here to help you power up your business. What challenge are you facing today?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessageContent = inputValue; // Store before clearing
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: userMessageContent,
            timestamp: new Date()
        }

        // Add user message and clear input
        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)

        try {
            // Prepare conversation history for context
            // Keep only last few messages for context to avoid overly long prompts
            const conversationHistory = messages.slice(-6).map(msg => ({type: msg.type, content: msg.content}));

            // Call the Gemini API
            const response = await makeGeminiRequest(userMessageContent, conversationHistory);

            const botMessage = {
                id: Date.now() + 1, // Ensure unique ID
                type: 'bot',
                content: response,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: error.message || "I apologize, but I'm having trouble connecting. Please try again.",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const quickPrompts = [
        { icon: TrendingUp, text: "How can I scale my business?", category: "Growth" },
        { icon: Target, text: "What's my target market strategy?", category: "Marketing" },
        { icon: Lightbulb, text: "I need innovation ideas", category: "Innovation" },
        { icon: Zap, text: "How to improve efficiency?", category: "Operations" }
    ]

    const handleQuickPrompt = (prompt) => {
        setInputValue(prompt)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Enterprise AI Business Advisor</h1>
                            <p className="text-sm text-gray-600">Meet our AI Business Advisor - powered by cutting-edge Google Gemini technology
                                to provide you with instant, expert-level business insights 24/7."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar with Quick Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Insights</h3>
                            <div className="space-y-3">
                                {quickPrompts.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickPrompt(prompt.text)}
                                        className="w-full p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <prompt.icon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{prompt.category}</div>
                                                <div className="text-xs text-gray-600">{prompt.text}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {GEMINI_API_KEY && GEMINI_MODEL && (
                                <p className="mt-4 text-xs text-gray-400">
                                    Using model: <span className="font-mono">{GEMINI_MODEL}</span>
                                </p>
                            )}
                            {!GEMINI_API_KEY && (
                                <p className="mt-4 text-xs text-red-500">
                                    Gemini API Key not configured.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Main Chat Interface */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-180px)] md:h-[600px] flex flex-col">
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.type === 'bot' && (
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                                                message.type === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            {message.type === 'bot' ? (
                                                <MarkdownRenderer content={message.content} />
                                            ) : (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                            )}
                                            <div className={`text-xs mt-2 ${
                                                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        {message.type === 'user' && (
                                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                                <span className="text-sm text-gray-600">Business advisor analyzing...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="border-t p-4">
                                <div className="flex gap-3">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Ask me about business strategy, marketing, operations, finance..."
                                            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="mt-3 text-xs text-gray-500 text-center">
                                    Specialized Business Consulting • Secure & Confidential • Powered by Google Gemini
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}