"use client";
import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const entrepreneurImages = {
  donald: '/images/picture1.jpg',
  david: '/images/david.jpg',
  maya: '/images/maya.jpg'
};

interface Entrepreneur {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    achievements: string[];
    blogUrl: string;
}
const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Circles */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>

            {/* Animated Triangles */}
            <div className="absolute top-32 right-40 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-blue-300 opacity-30 transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-40 right-16 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white opacity-40 transform -rotate-45 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>

            {/* Animated Rectangles */}
            <div className="absolute top-60 left-1/4 w-20 h-12 bg-blue-200 opacity-25 transform rotate-45 animate-pulse" style={{animationDuration: '2s'}}></div>
            <div className="absolute bottom-20 right-1/3 w-16 h-16 border-2 border-white opacity-30 transform rotate-12 animate-bounce" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-1/2 left-16 w-12 h-20 bg-blue-300 opacity-20 transform -rotate-12 animate-pulse" style={{animationDuration: '3s'}}></div>

            {/* Additional floating elements */}
            <div className="absolute top-80 right-1/4 w-8 h-8 bg-white rounded-full opacity-30 animate-ping" style={{animationDuration: '5s'}}></div>
            <div className="absolute bottom-60 left-1/2 w-14 h-14 border border-blue-200 transform rotate-45 opacity-25 animate-spin" style={{animationDuration: '10s'}}></div>
        </div>
    );
};


const EntrepreneursPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const featuredEntrepreneurs: Entrepreneur[] = [
        {
            id: 'entrepreneur1',
            name: 'Tedom Noutchogouin Donald',
            role: 'Tech Entrepreneur & Founder of HooYia',
            bio: 'From student to tech visionary, Donald founded HooYia while studying at NAHPI, revolutionizing Cameroon\'s IT sector. His company specializes in software development, data analysis, and AI solutions while training the next generation of African tech talent.',
            image: entrepreneurImages.donald,
            achievements: [
                'Founded HooYia - Innovative IT solutions company',
                '10,000+ YouTube subscribers on programming/AI',
                'Pioneered ML applications for African contexts',
                'Academic research in solar radiation forecasting'
            ],
            blogUrl: '/blog/tedom-donald-hooyia-transforming-african-tech'
        },
        {
            id: 'entrepreneur2',
            name: 'David Chen',
            role: 'Serial Entrepreneur & Investor',
            bio: 'With over 15 years of experience building and scaling tech startups, David has pioneered innovations in fintech and blockchain technology.',
            image: entrepreneurImages.david,
            achievements: ['5 Successful Exits', 'Angel Investor of the Year', 'Bestselling Author'],
            blogUrl: '/blog/david-chen'
        },
        {
            id: 'entrepreneur3',
            name: 'Maya Patel',
            role: 'Sustainable Business Pioneer',
            bio: 'Maya has dedicated her career to proving that profitability and sustainability can go hand in hand.',
            image: entrepreneurImages.maya,
            achievements: ['UN Sustainability Champion', 'Green Business Award', '$200M in impact investments'],
            blogUrl: '/blog/maya-patel'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % featuredEntrepreneurs.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredEntrepreneurs.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % featuredEntrepreneurs.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + featuredEntrepreneurs.length) % featuredEntrepreneurs.length);

    const FeaturedEntrepreneurSection = () => {
        const entrepreneur = featuredEntrepreneurs[currentSlide];
        
        return (
            <div className="relative w-full h-[600px] bg-gradient-to-r from-purple-900 to-indigo-800 overflow-hidden">
                <AnimatedBackground />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center">
                    {/* Left side - Text content */}
                    <div className="w-full md:w-1/2 text-white mb-8 md:mb-0 md:pr-8">
                        <div className="mb-4">
                            <span className="px-4 py-1 bg-purple-500 rounded-full text-sm font-medium">
                                Featured Entrepreneur
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">{entrepreneur.name}</h1>
                        <p className="text-xl font-medium text-purple-200 mb-3">{entrepreneur.role}</p>
                        <p className="text-lg text-gray-200 mb-6">{entrepreneur.bio}</p>
                        
                        <div className="flex flex-col gap-3 mb-8">
                            <h3 className="text-lg font-semibold">Notable Achievements:</h3>
                            <ul className="list-disc list-inside">
                                {entrepreneur.achievements.map((achievement, index) => (
                                    <li key={index} className="text-gray-200">{achievement}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <Link href={entrepreneur.blogUrl}>
                            <button className="flex items-center px-6 py-3 bg-white text-purple-900 rounded-md hover:bg-gray-100 transition-colors duration-300 font-medium">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Read Full Story
                            </button>
                        </Link>
                    </div>

                    {/* Right side - Image */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative w-64 h-64 md:w-96 md:h-96">
                                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white">
                                    <img
                                        src={entrepreneur.image}
                                        alt={entrepreneur.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/default-profile.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel controls */}
                <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    {featuredEntrepreneurs.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    className="absolute z-30 left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="absolute z-30 right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <FeaturedEntrepreneurSection />
        </div>
    );
};

export default EntrepreneursPage;