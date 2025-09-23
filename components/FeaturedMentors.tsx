"use client"

import React, {useEffect, useState} from "react";
import {ArrowRight, CheckCircle, Code, Heart, MapPin, Star, TrendingUp, User, Users} from "lucide-react";
import {Card} from "@/components/ui/card";

const FeaturedMentors = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        try {
            const response = await fetch('/api/mentor/register?status=approved&limit=4');
            if (response.ok) {
                const data = await response.json();
                setMentors(data.mentors || []);
            }
        } catch (error) {
            console.error('Error fetching mentors:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading mentors...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Meet Our Top Mentors</h2>
                    <p className="text-xl text-gray-600">
                        Learn from industry leaders who are shaping Cameroon's  landscape
                    </p>
                </div>

                {mentors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No approved mentors available yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.map((mentor, index) => (
                            <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300 bg-white">
                                <div className="text-center mb-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-blue-100 flex items-center justify-center">
                                            <User className="h-10 w-10 text-blue-600" />
                                        </div>
                                        <span className="absolute -top-1 -right-1 px-2 py-1 text-xs rounded-full bg-green-500 text-white">
                                            Verified
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{mentor.firstName} {mentor.lastName}</h3>
                                    <p className="text-blue-600 font-medium">{mentor.role}</p>
                                    <p className="text-sm text-gray-500">{mentor.company}</p>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Experience</span>
                                        <span className="font-medium">{mentor.experience}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Location</span>
                                        <span className="font-medium flex items-center">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {mentor.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Rating</span>
                                        <span className="font-medium flex items-center">
                                            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                                            {mentor.rating || 'New'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Mentees</span>
                                        <span className="font-medium">{mentor.totalMentees || 0}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-3">{mentor.expertise}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {mentor.skills?.slice(0, 3).map((skill, skillIndex) => (
                                            <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Request Mentorship
                                </button>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button className="inline-flex items-center px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                        View All Mentors <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};


export default FeaturedMentors;