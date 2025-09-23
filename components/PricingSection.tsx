import React from "react";
import {Code, Heart, TrendingUp, Users} from "lucide-react";
import {Card} from "@/components/ui/card";

const PricingSection = () => {
    const benefits = [
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Accelerated Career Growth",
            description: "Fast-track your professional development with personalized guidance from industry experts."
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Network Expansion",
            description: "Build meaningful connections within Cameroon's thriving tech community."
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: "Technical Skills",
            description: "Master cutting-edge technologies through hands-on projects and real-world applications."
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Personal Development",
            description: "Develop soft skills, leadership qualities, and professional confidence."
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Join Our Mentorship Program?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our structured mentorship program has helped over 500 professionals advance their careers
                        and contributed to the growth of 50+ successful startups in Cameroon.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4 text-blue-600">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </Card>
                    ))}
                </div>

                {/* Program Stats */}
                <div className="bg-gray-50 rounded-lg p-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
                            <p className="text-gray-600">Mentees Supported</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">150+</h3>
                            <p className="text-gray-600">Active Mentors</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">85%</h3>
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">12</h3>
                            <p className="text-gray-600">Month Program</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default PricingSection;