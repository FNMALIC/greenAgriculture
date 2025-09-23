"use client"
import React, { useState } from 'react';
import { Search, BookOpen, Video, Code, Download, ExternalLink ,  Book} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Circles */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>

            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>

            {/* Animated Triangles */}
            <div className="absolute top-32 right-40 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-blue-300 opacity-30 transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-40 right-16 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white opacity-40 transform -rotate-45 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>

        </div>
    );
};
const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const generateColorPattern = () => {
        const colors = [
            'bg-gradient-to-br from-blue-500 to-purple-500',
            'bg-gradient-to-br from-green-400 to-blue-500',
            'bg-gradient-to-br from-pink-500 to-orange-500',
            'bg-gradient-to-br from-yellow-400 to-red-500',
            'bg-gradient-to-br from-indigo-500 to-purple-500',
            'bg-gradient-to-br from-teal-400 to-blue-500',
            'bg-gradient-to-br from-red-500 to-pink-500',
            'bg-gradient-to-br from-orange-400 to-pink-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const categories = [
        { id: 'all', name: 'All Resources', icon: BookOpen },
        { id: 'tutorials', name: 'Business', icon: Video },
        { id: 'code', name: 'Self Help', icon: Code },
        { id: 'downloads', name: 'Downloads', icon: Download },
        // { id: 'books', name: 'Books', icon: Book },
    ];

    const resources = [
        {
            id: 1,
            title: "Think Like a Billionaire",
            description: "Discover the mindset and strategies that billionaires use to build extraordinary wealth and success.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Think%20Like%20a%20Billionaire",
            colorPattern: generateColorPattern(),
        },
        {
            id: 2,
            title: "Sell Like Crazy",
            description: "Master the art of selling with proven techniques that can transform your business and sales results.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Sell%20Like%20Crazy",
            colorPattern: generateColorPattern(),
        },
        {
            id: 3,
            title: "Cashvertising",
            description: "Learn powerful advertising techniques that trigger buying behavior and increase sales.",
            category: "code",
            level: "Advanced",
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Cashvertising",
            colorPattern: generateColorPattern(),
        },
        {
            id: 4,
            title: "How to Sell to Nigerians",
            description: "A specialized guide for understanding and succeeding in the Nigerian market.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20How%20to%20Sell%20to%20Nigerians"
        },
        {
            id: 5,
            title: "The Psychology of Wealth",
            description: "Explore the mindset and psychological principles behind creating and maintaining wealth.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Psychology%20of%20Wealth"
        },
        {
            id: 6,
            title: "Half of a Yellow Sun",
            description: "Award-winning novel that tells a compelling story set during the Nigerian Civil War.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Half%20of%20a%20Yellow%20Sun"
        },
        {
            id: 7,
            title: "The Millionaire Fastlane",
            description: "Discover the unconventional path to building wealth and achieving financial freedom.",
            category: "code",
            level: "Advanced",
            colorPattern: generateColorPattern(),
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Millionaire%20Fastlane"
        },
        {
            id: 8,
            title: "The Millionaire Next Door",
            description: "Learn the surprising secrets about wealth in America and the habits of wealthy individuals.",
            category: "tutorials",
            level: "Beginner",
            colorPattern: generateColorPattern(),
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Millionaire%20Next%20Door"
        },
        {
            id: 9,
            title: "The Rules of Wealth",
            description: "A personal code for prosperity and plenty, offering practical rules for building wealth.",
            category: "tutorials",
            colorPattern: generateColorPattern(),
            level: "Intermediate",
            type: "Book",
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Rules%20of%20Wealth"
        },
        {
            id: 10,
            title: "Change Has to Make Big Things",
            description: "Understanding how significant changes can lead to major breakthroughs in life and business.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Change%20Has%20to%20Make%20Big%20Things"
        },
        {
            id: 11,
            title: "The Power of Focus",
            description: "Learn how to concentrate your energy and attention to achieve extraordinary results.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Power%20of%20Focus"
        },
        {
            id: 12,
            title: "Believe You Can",
            description: "Build self-confidence and develop a winning mindset to achieve your goals.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Believe%20You%20Can"
        },
        {
            id: 13,
            title: "The Rules of Entrepreneurship",
            description: "Essential principles for starting and growing a successful business venture.",
            category: "code",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Rules%20of%20Entrepreneurship"
        },
        {
            id: 14,
            title: "Make Your Contacts Count",
            description: "Master the art of networking and building valuable professional relationships.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Make%20Your%20Contacts%20Count"
        },
        {
            id: 15,
            title: "The Psychology of Money",
            description: "Understand the mental and emotional aspects of managing money and building wealth.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Psychology%20of%20Money"
        },
        {
            id: 16,
            title: "Small Business Big Money",
            description: "Learn strategies for turning a small business into a profitable enterprise.",
            category: "code",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Small%20Business%20Big%20Money"
        },
        {
            id: 17,
            title: "Screw It, Let's Do It Expanded",
            description: "Richard Branson's expanded lessons on life and business success.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Screw%20It,%20Let's%20Do%20It%20Expanded"
        },
        {
            id: 18,
            title: "The 1-Page Marketing Plan",
            description: "Simplify your marketing strategy with a focused, effective one-page plan.",
            category: "code",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%201-Page%20Marketing%20Plan"
        },
        {
            id: 19,
            title: "Crushing It",
            description: "Gary Vaynerchuk's guide to building your personal brand and business in the digital age.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Crushing%20It"
        },
        {
            id: 20,
            title: "Becoming Facebook",
            description: "The inside story of Facebook's journey to becoming a social media giant.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Becoming%20Facebook"
        },
        {
            id: 21,
            title: "The Truth Shall Make You Rich",
            description: "Discover how honesty and integrity can be powerful tools in building sustainable wealth.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Truth%20Shall%20Make%20You%20Rich"
        },
        {
            id: 22,
            title: "Influence, The Psychology of Persuasion",
            description: "Learn the six universal principles of influence and how to use them ethically.",
            category: "downloads",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Influence,%20The%20Psychology%20of%20Persuasion"
        },
        {
            id: 23,
            title: "Emotional Intelligence",
            description: "Understanding and developing your emotional intelligence for better relationships and leadership.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Emotional%20Intelligence"
        },
        {
            id: 24,
            title: "Elon Musk",
            description: "The entrepreneurial journey and innovative thinking of Tesla and SpaceX founder.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Elon%20Musk"
        },
        {
            id: 25,
            title: "Go Pro",
            description: "Master the art of network marketing and build a successful business.",
            category: "code",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Go%20Pro"
        },
        {
            id: 26,
            title: "Becoming",
            description: "Michelle Obama's personal journey and insights on leadership and public service.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Becoming"
        },
        {
            id: 27,
            title: "The Richest Man in Babylon",
            description: "Ancient principles of wealth creation that remain relevant today.",
            category: "tutorials",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Richest%20Man%20in%20Babylon"
        },
        {
            id: 28,
            title: "Rich Dad Poor Dad",
            description: "Learn about financial literacy and building wealth through assets.",
            category: "tutorials",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Rich%20Dad%20Poor%20Dad"
        },
        {
            id: 29,
            title: "How to Win Customers",
            description: "Strategies for attracting and retaining loyal customers in your business.",
            category: "code",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20How%20to%20Win%20Customers"
        },
        {
            id: 30,
            title: "The Science of Money",
            description: "Understanding the fundamental principles behind money and wealth creation.",
            category: "downloads",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Science%20of%20Money"
        },
        {
            id: 31,
            title: "Cashflow Quadrant",
            description: "Robert Kiyosaki's guide to financial freedom through different income sources.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Cashflow%20Quadrant"
        },
        {
            id: 32,
            title: "Make Today Count",
            description: "Maximize your potential by making the most of each day.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Make%20Today%20Count"
        },
        {
            id: 33,
            title: "How to Win Friends and Influence People",
            description: "Dale Carnegie's timeless advice on building relationships and influencing others.",
            category: "tutorials",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20How%20to%20Win%20Friends%20and%20Influence%20People"
        },
        {
            id: 34,
            title: "Sometimes You Win, Sometimes You Learn",
            description: "Turn losses into learning experiences and grow from setbacks.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Sometimes%20You%20Win,%20Sometimes%20You%20Learn"
        },
        {
            id: 35,
            title: "Expert Secrets",
            description: "Transform your knowledge into a profitable business venture.",
            category: "code",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Expert%20Secrets"
        },
        {
            id: 36,
            title: "The Smart Money Tribe",
            description: "African women's guide to building wealth and financial independence.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Smart%20Money%20Tribe"
        },
        {
            id: 37,
            title: "The 100 Startup",
            description: "Launch a successful business with minimal investment and maximum impact.",
            category: "code",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20100%20Startup"
        },
        {
            id: 38,
            title: "The Monk Who Sold His Ferrari",
            description: "A spiritual journey to finding your purpose and living with greater fulfillment.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Monk%20Who%20Sold%20His%20Ferrari"
        },
        {
            id: 39,
            title: "If You Want to be Rich and Happy",
            description: "Balance wealth creation with personal fulfillment and happiness.",
            category: "downloads",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),
            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20If%20You%20Want%20to%20be%20Rich%20and%20Happy"
        },
        {
            id: 40,
            title: "Increase Your Financial IQ",
            description: "Boost your financial intelligence and make better money decisions.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Increase%20Your%20Financial%20IQ"
        },
        {
            id: 41,
            title: "The Business School",
            description: "Essential lessons for business success and entrepreneurship.",
            category: "code",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Business%20School"
        },
        {
            id: 42,
            title: "Rich Woman",
            description: "Financial education specifically designed for women entrepreneurs.",
            category: "tutorials",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Rich%20Woman"
        },
        {
            id: 43,
            title: "Rich Dad's Conspiracy of the Rich",
            description: "Expose of the financial system and strategies for financial success.",
            category: "downloads",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Rich%20Dad's%20Conspiracy%20of%20the%20Rich"
        },
        {
            id: 44,
            title: "Guide to Investing",
            description: "Comprehensive guide to investment strategies and wealth building.",
            category: "tutorials",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Guide%20to%20Investing"
        },
        {
            id: 45,
            title: "Success Stories",
            description: "Inspiring tales of achievement and the lessons behind them.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Success%20Stories"
        },
        {
            id: 46,
            title: "Why You Want to be Rich & The Power of Habit",
            description: "Combining wealth motivation with habit formation for success.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Why%20You%20Want%20to%20be%20Rich%20&%20The%20Power%20of%20Habit"
        },
        {
            id: 47,
            title: "Leading without Authority",
            description: "How to influence and lead regardless of your position.",
            category: "downloads",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Leading%20without%20Authority"
        },
        {
            id: 48,
            title: "Atomic Habits",
            description: "Build good habits and break bad ones with proven systems.",
            category: "tutorials",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Atomic%20Habits"
        },
        {
            id: 49,
            title: "The Talent Masters",
            description: "Develop and nurture talent in your organization.",
            category: "code",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20The%20Talent%20Masters"
        },
        {
            id: 50,
            title: "How to Lead Smart People",
            description: "Strategies for effectively leading intelligent and talented teams.",
            category: "downloads",
            level: "Advanced",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20How%20to%20Lead%20Smart%20People"
        },
        {
            id: 51,
            title: "Getting Started with Web Development",
            description: "A comprehensive guide for beginners starting their journey in web development with focus on HTML, CSS, and JavaScript.",
            category: "tutorials",
            level: "Beginner",
            type: "Guide",
            colorPattern: generateColorPattern(),

            link: "/resources/web-dev-guide"
        },
        {
            id: 52,
            title: "Python for Data Science",
            description: "Learn how to use Python for data analysis, visualization, and machine learning with practical examples.",
            category: "tutorials",
            level: "Intermediate",
            type: "Course",
            colorPattern: generateColorPattern(),

            link: "/resources/python-data-science"
        },
        {
            id: 53,
            title: "React Component Library",
            description: "A collection of reusable React components built by the Codees community for faster development.",
            category: "code",
            level: "Advanced",
            type: "Code",
            colorPattern: generateColorPattern(),

            link: "/resources/react-components"
        },
        {
            id: 54,
            title: "Think Like a Billionaire",
            description: "Learn the mindset and strategies of billionaires to achieve extraordinary success.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Think%20Like%20a%20Billionaire"
        },
        {
            id: 55,
            title: "Sell Like Crazy",
            description: "Master the art of selling with proven techniques and strategies.",
            category: "tutorials",
            level: "Intermediate",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Sell%20Like%20Crazy"
        },
        {
            id: 56,
            title: "Convenant Wealth",
            description: "Discover principles for building lasting wealth through spiritual insights.",
            category: "downloads",
            level: "Beginner",
            type: "Book",
            colorPattern: generateColorPattern(),

            link: "https://wa.me/+237697122421?text=I'm%20interested%20in%20the%20book:%20Convenant%20Wealth"
        }

    ];

    const filteredResources = resources.filter(resource =>
        (activeCategory === 'all' || resource.category === activeCategory) &&
        (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-blue-900 text-white py-16">
                <AnimatedBackground/>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
                        <p className="text-xl text-blue-200 mb-8">
                            Explore our curated collection of tutorials, guides, and tools to enhance your technical skills
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder="Search resources..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                className={`flex items-center space-x-2 ${
                                    activeCategory === category.id
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600"
                                }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{category.name}</span>
                            </Button>
                        );
                    })}
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
                            <div className={`h-40 ${resource.colorPattern} rounded-t-lg`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                        {resource.level}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{resource.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{resource.type}</span>
                                    <Button
                                        variant="outline"
                                        className="flex items-center space-x-2"
                                        onClick={() => window.location.href = resource.link}
                                    >
                                        <span>Access</span>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;