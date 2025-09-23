"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: string;
    capacity: number;
    registeredParticipants: number;
    status: string;
    image: string;
    tags: string[];
}

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Circles */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>

            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>

            {/* Animated Triangles */}
            <div className="absolute top-32 right-40 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-blue-300 opacity-30 transform rotate-12 animate-spin" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-40 right-16 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white opacity-40 transform -rotate-45 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>

                </div>
    );
};

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('all');
    const [status, setStatus] = useState('upcoming');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '6',
                ...(type !== 'all' && { type }),
                status
            });

            const res = await fetch(`/api/events?${queryParams}`);
            const data = await res.json();
            setEvents(data.events);
            setTotalPages(data.pagination.pages);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [page, type, status]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-16">
                <AnimatedBackground />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Community Events</h1>
                    <p className="text-xl text-blue-100">
                        Join our workshops, hackathons, and meetups to learn, collaborate, and grow together.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-4">
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Event Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="workshop">Workshops</SelectItem>
                                <SelectItem value="hackathon">Hackathons</SelectItem>
                                <SelectItem value="meetup">Meetups</SelectItem>
                                <SelectItem value="conference">Conferences</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {formatDate(event.date)}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {event.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-2" />
                                            {event.registeredParticipants} / {event.capacity} participants
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {event.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Button
                                        className="w-full mt-6"
                                        disabled={event.status !== 'upcoming' || event.registeredParticipants >= event.capacity}
                                    >
                                        {event.status !== 'upcoming' ? 'Event ' + event.status :
                                            event.registeredParticipants >= event.capacity ? 'Fully Booked' :
                                                'Register Now'}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default EventsPage;
