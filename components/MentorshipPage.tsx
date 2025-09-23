"use client"
import React,{ useState }  from 'react';

import MentorshipHero from "@/components/MentorshipHero";
import ProgramOverview from './ProgramOverview';
import PricingSection from './PricingSection';
import FeaturedMentors from "@/components/FeaturedMentors";
import { HowItWorks } from "@/components/HowItWorks";
import ApplicationForm from "@/components/ApplicationForm";
import { ArrowRight, Star } from 'lucide-react';
import { Card } from './ui/card';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Mbombe",
            role: "Junior Developer",
            company: "TechHub Cameroon",
            image: "/api/placeholder/80/80",
            quote: "The mentorship program completely transformed my career. My mentor helped me transition from a bootcamp graduate to a confident full-stack developer in just 8 months.",
            rating: 5
        },
        {
            name: "David Kamga",
            role: "Product Manager",
            company: "MTN Cameroon",
            image: "/api/placeholder/80/80",
            quote: "Having a mentor who understood the local tech landscape was invaluable. The guidance I received helped me land my dream job and negotiate a better salary.",
            rating: 5
        },
        {
            name: "Grace Ndenge",
            role: "Startup Founder",
            company: "EduTech Solutions",
            image: "/api/placeholder/80/80",
            quote: "My mentor's experience in fundraising and business strategy was crucial for my startup's success. We raised our seed round thanks to their guidance.",
            rating: 5
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">What Our Community Says</h2>
                    <p className="text-xl text-gray-600">
                        Real stories from mentees who have transformed their careers
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="p-6 bg-white">
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-gray-600 mb-6">
                                "{testimonial.quote}"
                            </blockquote>
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

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "How does the mentor matching process work?",
            answer: "Our matching algorithm considers your goals, experience level, industry interests, and preferred communication style. You'll be presented with 3-5 compatible mentors to choose from, and you can view their profiles and expertise before making a selection."
        },
        {
            question: "What's the difference between free and premium mentorship?",
            answer: "Free mentorship includes basic matching, monthly group sessions, and community access. Premium mentorship offers weekly 1-on-1 sessions, priority mentor selection, career workshops, resume reviews, and direct messaging with mentors."
        },
        {
            question: "How long does the mentorship program last?",
            answer: "Our standard program runs for 12 months, but you can extend or continue with different mentors based on your evolving needs. Many participants continue informal relationships with their mentors even after the formal program ends."
        },
        {
            question: "Can I become a mentor if I'm still early in my career?",
            answer: "Absolutely! We believe in peer mentorship. If you have 2+ years of experience or specialized knowledge in a particular area, you can mentor someone who's earlier in their journey. It's a great way to give back and develop leadership skills."
        },
        {
            question: "What if I'm not satisfied with my mentor match?",
            answer: "We offer rematch options if the initial pairing isn't working well. Simply contact our support team, and we'll help you find a better fit. Your success is our priority, and we want to ensure you have a productive mentoring relationship."
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about our mentorship program
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="p-6">
                            <button
                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                className="w-full text-left flex justify-between items-center"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                <ArrowRight className={`h-5 w-5 text-gray-400 transform transition-transform ${
                                    openFAQ === index ? 'rotate-90' : ''
                                }`} />
                            </button>
                            {openFAQ === index && (
                                <div className="mt-4 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MentorshipProgram = () => {
    return (
        <div className="min-h-screen bg-white">
            <MentorshipHero />
            <ProgramOverview />
            <PricingSection />
            <FeaturedMentors />
            <HowItWorks />
            <ApplicationForm />
            <Testimonials />
            <FAQ />

        </div>
    );
};

export default MentorshipProgram;