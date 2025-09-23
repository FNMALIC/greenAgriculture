import React from "react";
import {CheckCircle, Code, Heart, TrendingUp, Users} from "lucide-react";
import {Card} from "@/components/ui/card";

const ProgramOverview = () => {
    const pricingPlans = [
        {
            name: "First Month Free Mentorship",
            price: "Free",
            description: "Perfect for getting started with basic mentorship support",
            features: [
                "1 mentor matching",
                "Monthly group sessions",
                "Access to community resources",
                "Email support"
            ],
            buttonText: "Get Started Free",
            popular: false
        },
        {
            name: "Premium Mentorship",
            price: "XAF 29,500/month",
            description: "Comprehensive mentorship with personalized guidance",
            features: [
                "Multiple mentor matching",
                "Weekly 1-on-1 sessions",
                "Priority mentor selection",
                "Advanced progress tracking",
                "Direct messaging with mentors",
                "2 free e-books selected based on your goal",
                "Career development workshops",
                "Resume & portfolio reviews",
                "24/7 support"
            ],
            buttonText: "Start Premium",
            popular: true
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Choose Your Mentorship Plan</h2>
                    <p className="text-xl text-gray-600">
                        Select the plan that best fits your career development needs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <Card key={index} className={`p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                                </div>
                                <p className="text-gray-600">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`w-full py-3 px-6 rounded-md font-medium transition-colors duration-300 ${
                                    plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                {plan.buttonText}
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default ProgramOverview;