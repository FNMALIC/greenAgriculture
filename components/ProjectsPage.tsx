"use client";
import React, { useEffect, useState } from 'react';
import { Github, Globe, Star, GitBranch, Clock, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    stars: number;
    forks: number;
    lastUpdated: string;
    status: 'completed' | 'in-progress' | 'planned';
    featured?: boolean;
}

const ProjectsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);

     // Featured project - OneERP
     const featuredProjects: Project[] = [
        {
            id: 'onerp',
            title: 'OneERP',
            description: 'Comprehensive ERP solution for enterprise and commerce. Streamline operations, boost productivity, and drive growth with OneERP.',
            image: '/api/placeholder/1200/600',
            category: 'full-stack',
            technologies: ['Next.js', 'Python', 'Mongo', 'Docker'],
            // githubUrl: 'https://github.com/username/onerp',
            liveUrl: 'https://www.onerp.online',
            stars: 230,
            forks: 45,
            lastUpdated: '2024-01-20',
            status: 'completed',
            featured: true
        },
        {
            id: 'croplink',
            title: 'Croplink',
            description: 'CropLink is dedicated to transforming Cameroon\'s agricultural sector by combining cutting-edge technology with traditional farming practices.',
            image: '/api/placeholder/1200/600',
            category: 'full-stack',
            technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Flutter'],
            // githubUrl: 'https://github.com/username/project-atlas',
            liveUrl: 'https://croplink.org',
            stars: 0,
            forks: 0,
            lastUpdated: '2025-01-18',
            status: 'in-progress',
            featured: true
        }
    ];

    // Sample projects data - replace with your actual projects
    const projects: Project[] = [
        {
            id: '1',
            title: 'Community Events Platform',
            description: 'A full-stack web application for managing and hosting community events, featuring real-time updates and interactive registration.',
            image: '/api/placeholder/400/300',
            category: 'full-stack',
            technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
            githubUrl: 'http://github.com/username/events-platform',
            liveUrl: 'http://events-platform.demo',
            stars: 45,
            forks: 12,
            lastUpdated: '2024-01-15',
            status: 'completed'
        },
        {
            id: '2',
            title: 'Learning Resources Hub',
            description: 'A centralized platform for educational resources, featuring categorized content, search functionality, and user progress tracking.',
            image: '/api/placeholder/400/300',
            category: 'frontend',
            technologies: ['React', 'Redux', 'Material-UI'],
            githubUrl: 'https://github.com/username/learning-hub',
            stars: 28,
            forks: 8,
            lastUpdated: '2024-01-20',
            status: 'in-progress'
        }
    ];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => 
                prev === featuredProjects.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [featuredProjects.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => 
            prev === featuredProjects.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => 
            prev === 0 ? featuredProjects.length - 1 : prev - 1
        );
    };
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const FeaturedProjectSection = () => {
        const project = featuredProjects[currentSlide];
        
        return (
            <div className="relative w-full h-[600px] bg-gradient-to-b from-purple-900 to-purple-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="w-full md:w-2/3 text-white">
                        <div className="mb-4">
                            <span className="px-4 py-1 bg-purple-500 rounded-full text-sm font-medium">
                                Featured Project
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
                        <p className="text-xl text-gray-200 mb-6">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        
                        <div className="flex gap-4">
                            <Button
                                className="bg-white text-purple-900 hover:bg-gray-100"
                                onClick={() => window.open(project.liveUrl, '_blank')}
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                Get access
                            </Button>
                           
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    {featuredProjects.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>

                <button
                    className="absolute z-30 left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="absolute z-30 right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    onClick={nextSlide}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-gray-50">

             {/* Featured Project Carousel */}
             <FeaturedProjectSection />
          

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="full-stack">Full Stack</SelectItem>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                    }`}>
                                        {project.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-purple-100 text-purple-600 text-sm rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-1" />
                                        {project.stars}
                                    </div>
                                    <div className="flex items-center">
                                        <GitBranch className="w-4 h-4 mr-1" />
                                        {project.forks}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {new Date(project.lastUpdated).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 flex items-center justify-center gap-2"
                                        onClick={() => window.open(project.githubUrl, '_blank')}
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </Button>
                                    {project.liveUrl && (
                                        <Button
                                            className="flex-1 flex items-center justify-center gap-2"
                                            onClick={() => window.open(project.liveUrl, '_blank')}
                                        >
                                            <Globe className="w-4 h-4" />
                                            Live Demo
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;