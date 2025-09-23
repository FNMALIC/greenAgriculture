"use client"
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Code, Users, Calendar, BookOpen, Star, CheckCircle, ArrowRight, Quote, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation'
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

const LoadingSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
                <Card key={index} className="h-full animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

const RecentPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);
    const [postsPerView, setPostsPerView] = useState(3);

    const router  = useRouter()

    // Handle responsive posts per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPostsPerView(1); // Mobile: 1 post
            } else if (window.innerWidth < 1024) {
                setPostsPerView(2); // Tablet: 2 posts
            } else {
                setPostsPerView(3); // Desktop: 3 posts
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // In real implementation, this would be:
                const res = await fetch(`/api/posts?limit=9&page=1`);
                const data = await res.json();
                setPosts(data.posts);

                setError(null);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Reset current index when posts per view changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [postsPerView]);

    const maxIndex = Math.max(0, posts.length - postsPerView);

    const nextSlide = () => {
        setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handlePostClick = (slug) => {

        router.push(`/blog/${slug}`)
;
    };

    if (loading) {
        return (
            <div className="space-y-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">Loading latest posts...</span>
                </div>
                <LoadingSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 px-4">
                <div className="text-red-600 mb-4">
                    <svg className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No posts available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="relative px-4 sm:px-6 lg:px-8">
            {/* Carousel Container */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / postsPerView)}%)` }}
                >
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className={`flex-shrink-0 px-2 sm:px-3 lg:px-4 ${
                                postsPerView === 1 ? 'w-full' :
                                    postsPerView === 2 ? 'w-1/2' : 'w-1/3'
                            }`}
                        >
                            <Card
                                className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
                                onClick={() => handlePostClick(post.slug)}
                            >
                                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200 rounded-t-lg">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col h-full">
                                    <p className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center gap-1">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3 flex-grow mb-4">{post.excerpt}</p>
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                                            {post.tags?.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-full hover:bg-blue-100 transition-colors duration-200"
                                                >
                          {tag}
                        </span>
                                            ))}
                                            {post.tags?.length > 2 && (
                                                <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-500 text-xs sm:text-sm rounded-full">
                          +{post.tags.length - 2}
                        </span>
                                            )}
                                        </div>
                                        <button
                                            className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePostClick(post.slug);
                                            }}
                                        >
                                            Read More <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows - Hidden on mobile */}
            {posts.length > postsPerView && (
                <>
                    <button
                        onClick={prevSlide}
                        className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
                        disabled={currentIndex === maxIndex}
                    >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-blue-600" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {posts.length > postsPerView && (
                <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? 'bg-blue-600 w-6 sm:w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Mobile swipe navigation buttons */}
            {posts.length > postsPerView && (
                <div className="flex justify-center gap-4 mt-4 sm:hidden">
                    <button
                        onClick={prevSlide}
                        className="bg-white rounded-full p-2 shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-200"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-white rounded-full p-2 shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-200"
                        disabled={currentIndex === maxIndex}
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            )}
        </div>
    );
};

const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Brice Kamkang",
            role: "Software Developer",
            company: "#####",
            image: "/api/placeholder/80/80",
            content: "I really like what they do",
            rating: 5
        },
        {
            name: "Frank Diaga",
            role: "Entrepreneur",
            company: "#####",
            image: "/api/placeholder/80/80",
            content: "The best. Where quality and price have taken up residence",
            rating: 5
        },
        // {
        //     name: "Sarah Biya",
        //     role: "Data Scientist",
        //     company: "Cameroon Bank",
        //     image: "/api/placeholder/80/80",
        //     content: "Codees Cameroon's workshops and hackathons helped me transition from traditional banking to fintech. The learning never stops!",
        //     rating: 5
        // }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">What Our Community Says</h2>
                    <p className="text-xl text-gray-600">Real stories from real members</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-60" />
                            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowWeWorkSection = () => {
    const steps = [
        {
            icon: <Users className="h-8 w-8" />,
            title: "Connect & Network",
            description: "Join our vibrant community of developers, entrepreneurs, and tech enthusiasts across Cameroon."
        },
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: "Learn & Grow",
            description: "Access workshops, tutorials, and mentorship programs designed to enhance your technical skills."
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: "Build & Innovate",
            description: "Collaborate on projects, participate in hackathons, and turn your ideas into reality."
        },
        {
            icon: <CheckCircle className="h-8 w-8" />,
            title: "Launch & Scale",
            description: "Get support to launch your projects and scale your solutions with community backing."
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How We Work</h2>
                    <p className="text-xl text-gray-600">Our proven approach to building Cameroon's tech ecosystem</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center group relative">
                            <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const CounterAnimation = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const TrustedBySection = () => {
    const stats = [
        { number: 500, label: "Active Members", suffix: "+" },
        { number: 50, label: "Tech Companies", suffix: "+" },
        { number: 100, label: "Projects Launched", suffix: "+" },
        { number: 25, label: "Events Hosted", suffix: "+" }
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by the Community</h2>
                    <p className="text-gray-600">Growing stronger together</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                <CounterAnimation end={stat.number} />{stat.suffix}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CollaboratorsCarousel = () => {
    const collaborators = [
        { name: "TechHub Cameroon", logo: "/api/placeholder/120/60" },
        { name: "Startup Cameroon", logo: "/api/placeholder/120/60" },
        { name: "Digital Academy", logo: "/api/placeholder/120/60" },
        { name: "Innovation Lab", logo: "/api/placeholder/120/60" },
        { name: "Code Academy", logo: "/api/placeholder/120/60" },
        { name: "Tech Incubator", logo: "/api/placeholder/120/60" }
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Collaborators</h2>
                    <p className="text-gray-600">Working together with amazing partners</p>
                </div>
                <div className="overflow-hidden">
                    <div className="flex animate-scroll space-x-12">
                        {[...collaborators, ...collaborators].map((collaborator, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <img 
                                    src={collaborator.logo} 
                                    alt={collaborator.name}
                                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Animated Background */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white relative">
                <AnimatedBackground />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                            <span className="block">Codees Cameroon</span>
                            <span className="block text-blue-200 mt-2">Building Cameroon's Tech Future</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                            A community of entrepreneurs, innovators, and tech enthusiasts working together to foster
                            technological growth and innovation in Cameroon.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:text-lg transition-colors duration-300">
                                Join Community
                            </button>
                            <button className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 md:text-lg transition-colors duration-300">
                                Upcoming Events
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <TrustedBySection />

            {/* Collaborators Carousel */}
            <CollaboratorsCarousel />

            {/* How We Work Section */}
            <HowWeWorkSection />

            {/* Testimonials Section */}
            <TestimonialSection />

            {/* Recent Posts Section with Carousel */}
            <section className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                        Community Updates
                    </h2>
                    <RecentPosts />
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                            View All Updates <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Join Codees Cameroon?</h2>
                        <p className="text-xl text-blue-200 mb-8">
                            Be part of a community that's shaping the future of technology in Cameroon
                        </p>
                        <button className="inline-flex items-center px-8 py-3 rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors duration-300">
                            Get Started <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;