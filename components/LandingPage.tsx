"use client"
import React, { useState } from 'react';
import {
    ArrowRight,
    Building2,
    ShoppingCart,
    Menu,
    X,
    ChevronDown,
    Github,
    Twitter,
    Linkedin,
    CheckCircle
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [referralEmail, setReferralEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState('');

    const features = [
        {
            title: "Financial Management",
            description: "Comprehensive financial tools for accounting, budgeting, and reporting",
            icon: "💰"
        },
        {
            title: "Inventory Control",
            description: "Real-time inventory tracking and management system",
            icon: "📦"
        },
        {
            title: "HR Management",
            description: "Complete employee management and payroll solution",
            icon: "👥"
        },
        {
            title: "Analytics Dashboard",
            description: "Advanced reporting and business intelligence tools",
            icon: "📊"
        }
    ];

    const handleReferralSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // API call would go here
            setFormMessage('Thanks! We\'ll send your referral link shortly.');
            setReferralEmail('');
        } catch (error) {
            setFormMessage('Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="/" className="text-2xl font-bold text-blue-600">OneERP</a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
                            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
                            <a href="#referral" className="text-gray-600 hover:text-blue-600">Referral Program</a>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b">
                        <div className="px-4 py-2 space-y-2">
                            <a href="#features" className="block text-gray-600 hover:text-blue-600 py-2">Features</a>
                            <a href="#pricing" className="block text-gray-600 hover:text-blue-600 py-2">Pricing</a>
                            <a href="#referral" className="block text-gray-600 hover:text-blue-600 py-2">Referral Program</a>
                            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl mx-auto text-center relative">
                        <div className="inline-block animate-bounce mb-4">
              <span className="px-4 py-2 rounded-full bg-blue-500/30 text-sm">
                🚀 Now Available for Enterprise & Commerce
              </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                            Transform Your Enterprise with OneERP
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Streamline operations, boost productivity, and drive growth with our comprehensive ERP solution
                        </p>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl inline-block mb-8 border border-white/20">
                            <p className="font-bold text-2xl">Special Launch Offer 🎉</p>
                            <p className="text-lg">Get 6 Months Free Access</p>
                            <p className="text-sm text-blue-200">Limited time offer for new registrations</p>
                        </div>
                    </div>
                </div>
                <div className="h-32 bg-gradient-to-b from-transparent to-white"></div>
            </div>

            {/* Features Grid */}
            <div id="features" className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Business</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                            <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Referral Section */}
            <div id="referral" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">Join Our Referral Program</h2>
                        <p className="text-gray-600 mb-8">
                            Earn rewards for every successful referral. Share OneERP with other businesses and grow together.
                        </p>
                        <form onSubmit={handleReferralSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={referralEmail}
                                    onChange={(e) => setReferralEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Get Referral Link'}
                                </button>
                            </div>
                            {formMessage && (
                                <p className="text-sm text-green-600">{formMessage}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div id="pricing" className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Solution</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="flex items-center mb-4">
                                    <Building2 className="w-8 h-8 text-blue-600 mr-2" />
                                    <h3 className="text-2xl font-bold">Enterprise</h3>
                                </div>
                                <p className="mb-6 text-gray-600">Complete ERP solution for large enterprises</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>Full module access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>Custom integrations</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>24/7 support</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={() => window.location.href = 'https://enterprise.onerp.online/'}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 transition-colors">
                                <div className="flex items-center mb-4">
                                    <ShoppingCart className="w-8 h-8 text-green-600 mr-2" />
                                    <h3 className="text-2xl font-bold">Commerce</h3>
                                </div>
                                <p className="mb-6 text-gray-600">Specialized solution for commercial operations</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>E-commerce integration</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>Inventory management</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span>Order processing</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={() => window.location.href = 'https://commerce.onerp.online/'}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                                >
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">OneERP</h3>
                            <p className="text-gray-400">Transforming enterprises with powerful ERP solutions.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                                <li><a href="#referral" className="text-gray-400 hover:text-white">Referral Program</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Github className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} OneERP. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;