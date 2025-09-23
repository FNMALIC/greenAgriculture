"use client"
import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, User, Mail, Lock, Users, Code, ArrowRight, CheckCircle, Github, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {signIn} from "next-auth/react";
import { toast } from '@/hooks/use-toast';
import {useRouter} from "next/navigation";

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

const LoginForm = ({ onSwitchToRegister, onBackToHome }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        console.log(result)


        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        } else {
            toast({
                variant: "default",
                title: "login successfully",
                // description: result.error,
            });
            router.push("/");
        }
        setLoading(false);
        console.log('Login:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your Codees account</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
                </button>
            </div>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <Github className="h-5 w-5" />
                    </button>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <Linkedin className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign up now
                    </button>
                </p>
            </div>

            <button
                onClick={onBackToHome}
                className="mt-6 w-full flex items-center justify-center text-sm text-gray-500 hover:text-gray-700"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to homepage
            </button>
        </Card>
    );
};

const RegisterForm = ({ onSwitchToLogin, onBackToHome }) => {
    const [formData, setFormData] = useState({
       name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        company: '',
        interests: []
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const interestOptions = [
        'Web Development',
        'Mobile Development',
        'AI/ML',
        'Blockchain',
        'IoT',
        'Cybersecurity',
        'DevOps',
        'Entrepreneurship',
        'Other'
    ];

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setLoading(true);
        // Simulate API call
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast({
                variant: "default",
                title: "login successfull",
                // description: result.error,
            });
            setTimeout(() => {
                onSwitchToLogin();
            }, 1500);
            router.refresh();
        }
        else {
            toast({
                variant: "destructive",
                title: "Error during login",
            });
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    return (
        <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Codees Cameroon</h2>
                <p className="text-gray-600">Create your account and become part of our community</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                           Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="John"
                                required
                            />
                        </div>
                    </div>

               </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Create password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Confirm password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company/Organization (Optional)
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Your company"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Areas of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {interestOptions.map(interest => (
                            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.interests.includes(interest)}
                                    onChange={() => handleInterestChange(interest)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{interest}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                    </label>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>Create Account <CheckCircle className="ml-2 h-5 w-5" /></>
                    )}
                </button>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign in instead
                    </button>
                </p>
            </div>

            <button
                onClick={onBackToHome}
                className="mt-6 w-full flex items-center justify-center text-sm text-gray-500 hover:text-gray-700"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to homepage
            </button>
        </Card>
    );
};

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleBackToHome = () => {
        // In a real app, this would navigate to the home page
        console.log('Navigate to home page');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center p-4 relative">
            <AnimatedBackground />

            <div className="w-full flex items-center justify-center relative z-10">
                {isLogin ? (
                    <LoginForm
                        onSwitchToRegister={() => setIsLogin(false)}
                        onBackToHome={handleBackToHome}
                    />
                ) : (
                    <RegisterForm
                        onSwitchToLogin={() => setIsLogin(true)}
                        onBackToHome={handleBackToHome}
                    />
                )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm z-10">
                <p>&copy; 2025 Codees Cameroon. Building Cameroon's Tech Future.</p>
            </div>
        </div>
    );
};

export default AuthPage;