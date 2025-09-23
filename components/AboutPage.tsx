// import React from 'react';
// import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AboutPage = () => {
    const skills = {
        programming: ['Python (Django)', 'JavaScript (Next.js)', 'TypeScript', 'PHP'],
        webDev: ['HTML', 'CSS', 'Bootstrap', 'Tailwind', 'Express.js', 'Django', 'Next.js'],
        mobile: ['Flutter'],
        databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
        tools: ['Docker', 'Git (GitFlow)', 'Mocha (Testing)']
    };

    const achievements = [
        {
            year: '2024',
            title: '1st Place - GETEC National Competition',
            description: 'Agricultural section winner at the national competition in Cameroon'
        },
        {
            year: '2022',
            title: '2nd Place - Meathon SDK Games',
            description: 'Regional competition achievement'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Wolonwo Fonkou Nixon
                    </h1>
                    <p className="text-xl text-gray-600">
                        Software Developer | AI & Electronics Enthusiast
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
                    <div className="prose prose-lg max-w-none">
                        <p>
                            I'm a 23-year-old software developer specializing in web development, with experience in building dynamic and static websites. My expertise extends to mobile technologies like Flutter, and I'm proficient in containerization using Docker. Beyond software development, I've explored electronics, including a notable stereo vision project for detecting road obstacles.
                        </p>
                        <p className="mt-4">
                            Currently focused on:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Building my portfolio website/blog (may be am done with this .... 😂) </li>
                            <li>Learning DevOps and advanced Docker usage</li>
                            <li>Making contributions to open-source projects (2025 goal)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, items]) => (
                        <Card key={category} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                                    {category.replace(/([A-Z])/g, ' $1').trim()}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-sm">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Achievements Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Achievements</h2>
                <div className="space-y-6">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-900 text-lg font-semibold">
                    {achievement.year}
                  </span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {achievement.title}
                                    </h3>
                                    <p className="mt-1 text-gray-600">{achievement.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Let&#39;s Connect</h2>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 mb-4">
                        I'm always interested in connecting with fellow developers and discussing new opportunities. Feel free to reach out!
                    </p>
                    <div className="flex items-center space-x-4">
                        <a
                            href="mailto:nixonfonkou@gmail.com"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Email Me
                        </a>
                        <a
                            href="https://github.com/FNMALIC"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            View GitHub Profile
                        </a>
                    </div>
                </div>
            </section>

            {/* Fun Fact Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
                    <p className="text-lg text-gray-800">
                        <span className="font-semibold">Fun Fact:</span> I&#39;m a Doom enthusiast! 🎮
                    </p>
                </div>
            </section>
        </div>
    );
};

 // AboutPage;