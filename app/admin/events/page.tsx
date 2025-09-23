"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar, Badge, X } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    location: z.string().min(1, "Location is required"),
    type: z.enum(["workshop", "conference", "meetup", "hackathon", "other"]),
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    image: z.string(),
    organizer: z.string().min(1, "Organizer is required"),
    tags: z.array(z.string()),
    requirements: z.array(z.string()),
    agenda: z.array(z.object({
        time: z.string(),
        activity: z.string()
    }))
});

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'workshop' | 'conference' | 'meetup' | 'other';
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    capacity: number;
    createdAt: Date;
    image: string;
    organizer: string;
    tags: string[];
    requirements: string[];
    agenda: { time: string; activity: string; }[];
}
export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [newRequirement, setNewRequirement] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newAgendaItem, setNewAgendaItem] = useState({ time: '', activity: '' });

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            type: 'workshop',
            capacity: 0,
            status: 'upcoming',
            image: '/api/placeholder/400/300',
            organizer: '',
            tags: [],
            requirements: [],
            agenda: []
        }
    });
    const fetchEvents = async (page = 1) => {
        try {
            const response = await fetch(`/api/events?page=${page}&limit=10`);
            if (!response.ok) throw new Error('Failed to fetch events');
            const data = await response.json();
            setEvents(data.events);
            setTotalPages(data.pagination.pages);
            setCurrentPage(page);
        } catch (err) {
            setError('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateEvent = async (data: any) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to create event');

            await fetchEvents();
            setIsDialogOpen(false);
            form.reset();
        } catch (err) {
            setError('Failed to create event');
        }
    };

    const handleUpdateEvent = async (data: any) => {
        if (!selectedEvent) return;

        try {
            const response = await fetch(`/api/events/${selectedEvent._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to update event');

            await fetchEvents();
            setIsDialogOpen(false);
            setSelectedEvent(null);
            form.reset();
        } catch (err) {
            setError('Failed to update event');
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete event');

            await fetchEvents();
        } catch (err) {
            setError('Failed to delete event');
        }
    };

    const onSubmit = (data: any) => {
        if (selectedEvent) {
            handleUpdateEvent(data);
        } else {
            handleCreateEvent(data);
        }
    };
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) throw new Error('Upload failed');
    
            const data = await response.json();
    
            if (data.url) {
                form.setValue('image', data.url);
            }
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const addRequirement = () => {
        if (newRequirement.trim()) {
            const currentRequirements = form.getValues('requirements');
            form.setValue('requirements', [...currentRequirements, newRequirement.trim()]);
            setNewRequirement('');
        }
    };

    const addTag = () => {
        if (newTag.trim()) {
            const currentTags = form.getValues('tags');
            form.setValue('tags', [...currentTags, newTag.trim()]);
            setNewTag('');
        }
    };

    const addAgendaItem = () => {
        if (newAgendaItem.time && newAgendaItem.activity) {
            const currentAgenda = form.getValues('agenda');
            form.setValue('agenda', [...currentAgenda, { ...newAgendaItem }]);
            setNewAgendaItem({ time: '', activity: '' });
        }
    };

    const removeRequirement = (index: number) => {
        const currentReqs = form.getValues('requirements');
        form.setValue('requirements', currentReqs.filter((_, i) => i !== index));
    };

    // Agenda section
    const removeAgendaItem = (index: number) => {
        const currentAgenda = form.getValues('agenda');
        form.setValue('agenda', currentAgenda.filter((_, i) => i !== index));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;

    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Event Management</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => {
                            setSelectedEvent(null);
                            form.reset();
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedEvent ? 'Edit Event' : 'Create New Event'}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Basic Info Section */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="organizer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Organizer</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date and Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Location and Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="workshop">Workshop</SelectItem>
                                                    <SelectItem value="hackathon">Hackathon</SelectItem>
                                                    <SelectItem value="meetup">Meetup</SelectItem>
                                                    <SelectItem value="conference">Conference</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Capacity and Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} 
                                                       onChange={e => field.onChange(parseInt(e.target.value))}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Image Upload */}
                            <FormItem>
                                <FormLabel>Event Image</FormLabel>
                                <div className="flex items-center space-x-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {form.watch('image') && (
                                        <img
                                            src={form.watch('image')}
                                            alt="Event preview"
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                    )}
                                </div>
                            </FormItem>

                            {/* Tags */}
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {form.watch('tags').map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                            <X 
                                                className="w-3 h-3 ml-1 cursor-pointer" 
                                                onClick={() => {
                                                    const currentTags = form.getValues('tags');
                                                    form.setValue('tags', 
                                                        currentTags.filter((_, i) => i !== index)
                                                    );
                                                }}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Add a tag"
                                    />
                                    <Button type="button" onClick={addTag}>Add</Button>
                                </div>
                            </FormItem>

                            <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {form.watch('requirements').map((req, index) => (
                                <Badge key={index} variant="secondary">
                                    {req}
                                    <X 
                                        className="w-3 h-3 ml-1 cursor-pointer" 
                                        onClick={() => removeRequirement(index)}
                                    />
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                placeholder="Add a requirement"
                            />
                            <Button type="button" onClick={addRequirement}>Add</Button>
                        </div>
                    </FormItem>

                    {/* Agenda Section */}
                    <FormItem>
                        <FormLabel>Agenda</FormLabel>
                        <div className="space-y-2 mb-2">
                            {form.watch('agenda').map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span>{item.time}</span>
                                    <span>-</span>
                                    <span>{item.activity}</span>
                                    <X 
                                        className="w-3 h-3 cursor-pointer" 
                                        onClick={() => removeAgendaItem(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                type="time"
                                value={newAgendaItem.time}
                                onChange={(e) => setNewAgendaItem(prev => ({ ...prev, time: e.target.value }))}
                                placeholder="Time"
                            />
                            <Input
                                value={newAgendaItem.activity}
                                onChange={(e) => setNewAgendaItem(prev => ({ ...prev, activity: e.target.value }))}
                                placeholder="Activity"
                            />
                            <Button type="button" onClick={addAgendaItem}>Add</Button>
                        </div>
                    </FormItem>

                    <div className="flex justify-end space-x-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {selectedEvent ? 'Update Event' : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
</CardHeader>

<CardContent>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {events.map((event) => (
                <TableRow key={event._id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{new Date(`${event.date} ${event.time}`).toLocaleString()}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{event.status}</TableCell>
                    <TableCell className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSelectedEvent(event);
                                form.reset(event);
                                setIsDialogOpen(true);
                            }}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEvent(event._id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>

    {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => fetchEvents(page)}
                >
                    {page}
                </Button>
            ))}
        </div>
    )}
</CardContent>
</Card>
                                                    
    );
}