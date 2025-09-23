"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, Users, UserCheck, Clock, Star, Filter, Search, CheckCircle, XCircle } from 'lucide-react';
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';

interface Mentor {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    experience: string;
    expertise: string;
    skills: string[];
    availability: string;
    location?: string;
    bio?: string;
    rating: number;
    totalMentees: number;
    // activeMentees: string[];
    completedMentorships: number;
    status: 'pending' | 'approved' | 'rejected' | 'inactive';
    isVerified: boolean;
    applicationDate: Date;
    approvedDate?: Date;
    reviews: any[];
}

interface Mentee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    experience: string;
    goals: string;
    interests: string[];
    availability: string;
    planType: 'free' | 'premium';
    subscriptionStatus: string;
    currentMentor?: string;
    mentorshipHistory: any[];
    status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
    applicationDate: Date;
    approvedDate?: Date;
    totalSessions: number;
    completedSessions: number;
    location?: string;
    bio?: string;
}

interface Stats {
    totalMentors: number;
    totalMentees: number;
    activeMentorships: number;
    pendingApplications: number;
    totalSessions: number;
    averageRating: number;
}

export default function MentorshipAdminDashboard() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [mentees, setMentees] = useState<Mentee[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalMentors: 0,
        totalMentees: 0,
        activeMentorships: 0,
        pendingApplications: 0,
        totalSessions: 0,
        averageRating: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState<Mentor | Mentee | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - replace with actual API calls
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API calls
                await new Promise(resolve => setTimeout(resolve, 1000));


                const response = await fetch(`/api/mentor/register`);
                const res = await fetch(`/api/mentee/register`);

                const mentors = await response.json()
                const mentees = await res.json()

                console.log(mentees)
                setMentors(mentors.mentors);
                setMentees(mentees.mentees);

                console.log(mentors.mentors);
                setStats({
                    totalMentors: mentors.mentors.length,
                    totalMentees: mentees.mentees.length,
                    // activeMentorships: mockMentors.reduce((acc, m) => acc + m.activeMentees.length, 0),
                    activeMentorships : 0,
                    pendingApplications: mentors.mentors.filter(m => m.status === 'pending').length +
                        mentees.mentees.filter(m => m.status === 'pending').length,
                    totalSessions: mentees.mentees.reduce((acc, m) => acc + m.totalSessions, 0),
                    averageRating: mentors.mentors.reduce((acc, m) => acc + m.rating, 0) / mentors.mentors.length
                });
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusBadge = (status: string, isVerified?: boolean) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
            active: { color: 'bg-blue-100 text-blue-800', label: 'Active' },
            inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' }
        };

        return (
            <div className="flex items-center gap-2">
                <Badge className={statusConfig[status as keyof typeof statusConfig]?.color}>
                    {statusConfig[status as keyof typeof statusConfig]?.label}
                </Badge>
                {isVerified !== undefined && (
                    <Badge className={isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {isVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                )}
            </div>
        );
    };

// Replace the existing handleApprove function with this:
    const handleApprove = async (id: string, type: 'mentor' | 'mentee') => {
        try {
            const status = type === 'mentor' ? 'approved' : 'active';

            const response = await fetch(`/api/approuve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    userType: type,
                    status: status,
                })
            });

            if (!response.ok) throw new Error(`Failed to approve ${type}`);


            // For mentees, start mentor matching process
            if (type === 'mentee') {
                try {
                    await fetch(`/api/mentor/match`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            menteeId: id
                        })
                    });

                    toast.success(
                        `${type === 'mentor' ? 'Mentor' : 'Mentee'} approved successfully! 
                    📧 Please send an email notification to inform them of the approval. 
                    🔍 Mentor matching process has been initiated.`,
                        { duration: 6000 }
                    );
                } catch (matchError) {
                    toast.warning(
                        `Mentee approved successfully! 
                    📧 Please send an email notification to inform them of the approval. 
                    ⚠️ Mentor matching failed - please manually assign a mentor.`,
                        { duration: 6000 }
                    );
                }
            } else {
                toast.success(
                    `${type === 'mentor' ? 'Mentor' : 'Mentee'} approved successfully! 
                📧 Please send an email notification to inform them of the approval.`,
                    { duration: 5000 }
                );
            }

            // Refresh data after approval
            const mentorResponse = await fetch(`/api/mentor/register`);
            const menteeResponse = await fetch(`/api/mentee/register`);

            const mentorsData = await mentorResponse.json();
            const menteesData = await menteeResponse.json();

            setMentors(mentorsData.mentors);
            setMentees(menteesData.mentees);

            // Update stats
            setStats({
                totalMentors: mentorsData.mentors.length,
                totalMentees: menteesData.mentees.length,
                activeMentorships: 0,
                pendingApplications: mentorsData.mentors.filter(m => m.status === 'pending').length +
                    menteesData.mentees.filter(m => m.status === 'pending').length,
                totalSessions: menteesData.mentees.reduce((acc, m) => acc + m.totalSessions, 0),
                averageRating: mentorsData.mentors.reduce((acc, m) => acc + m.rating, 0) / mentorsData.mentors.length
            });

        } catch (err) {
            setError(`Failed to approve ${type}`);
        }
    };

    const handleReject = async (id: string, type: 'mentor' | 'mentee') => {
        try {
            const response = await fetch(`/api/approuve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    userType: type,
                    status: 'rejected'
                })
            });

            if (!response.ok) throw new Error(`Failed to reject ${type}`);

            // Refresh data after rejection
            const mentorResponse = await fetch(`/api/mentor/register`);
            const menteeResponse = await fetch(`/api/mentee/register`);

            const mentorsData = await mentorResponse.json();
            const menteesData = await menteeResponse.json();

            setMentors(mentorsData.mentors);
            setMentees(menteesData.mentees);

            // Update stats
            setStats({
                totalMentors: mentorsData.mentors.length,
                totalMentees: menteesData.mentees.length,
                activeMentorships: 0,
                pendingApplications: mentorsData.mentors.filter(m => m.status === 'pending').length +
                    menteesData.mentees.filter(m => m.status === 'pending').length,
                totalSessions: menteesData.mentees.reduce((acc, m) => acc + m.totalSessions, 0),
                averageRating: mentorsData.mentors.reduce((acc, m) => acc + m.rating, 0) / mentorsData.mentors.length
            });

        } catch (err) {
            setError(`Failed to reject ${type}`);
        }
    };
    const filteredMentors = mentors.filter(mentor => {
        const matchesSearch =
            mentor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || mentor.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const filteredMentees = mentees.filter(mentee => {
        const matchesSearch =
            mentee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ;
            // mentee.goals.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || mentee.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Mentorship Program Management</h1>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Mentors</p>
                                <p className="text-2xl font-bold">{stats.totalMentors}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Mentees</p>
                                <p className="text-2xl font-bold">{stats.totalMentees}</p>
                            </div>
                            <UserCheck className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Mentorships</p>
                                <p className="text-2xl font-bold">{stats.activeMentorships}</p>
                            </div>
                            <Clock className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending Applications</p>
                                <p className="text-2xl font-bold">{stats.pendingApplications}</p>
                            </div>
                            <Clock className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Sessions</p>
                                <p className="text-2xl font-bold">{stats.totalSessions}</p>
                            </div>
                            <Users className="h-8 w-8 text-indigo-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Rating</p>
                                <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="mentors">Mentors</TabsTrigger>
                    <TabsTrigger value="mentees">Mentees</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Mentor Applications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mentors.filter(m => m.status === 'pending').slice(0, 5).map(mentor => (
                                        <div key={mentor._id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{mentor.firstName} {mentor.lastName}</p>
                                                <p className="text-sm text-gray-600">{mentor.expertise}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button size="sm" onClick={() => handleApprove(mentor._id, 'mentor')}>
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => handleReject(mentor._id, 'mentor')}>
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Mentee Applications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mentees.filter(m => m.status === 'pending').slice(0, 5).map(mentee => (
                                        <div key={mentee._id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{mentee.firstName} {mentee.lastName}</p>
                                                {/*<p className="text-sm text-gray-600">{mentee.goals.substring(0, 50)}...</p>*/}
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button size="sm" onClick={() => handleApprove(mentee._id, 'mentee')}>
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => handleReject(mentee._id, 'mentee')}>
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="mentors">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mentor Management</CardTitle>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Search mentors..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-sm"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Expertise</TableHead>
                                            <TableHead>Experience</TableHead>
                                            <TableHead>Rating</TableHead>
                                            {/*<TableHead>Active Mentees</TableHead>*/}
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMentors.map((mentor) => (
                                            <TableRow key={mentor._id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{mentor.firstName} {mentor.lastName}</p>
                                                        <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentor.email}</TableCell>
                                                <TableCell>{mentor.expertise}</TableCell>
                                                <TableCell>{mentor.experience} years</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                                        {mentor.rating}
                                                    </div>
                                                </TableCell>
                                                {/*<TableCell>{mentor.activeMentees.length}</TableCell>*/}
                                                <TableCell>
                                                    {getStatusBadge(mentor.status, mentor.isVerified)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedItem(mentor);
                                                                setIsViewDialogOpen(true);
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {mentor.status === 'pending' && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleApprove(mentor._id, 'mentor')}
                                                                >
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleReject(mentor._id, 'mentor')}
                                                                >
                                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="mentees">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mentee Management</CardTitle>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Search mentees..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-sm"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            {/*<TableHead>Goals</TableHead>*/}
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Sessions</TableHead>
                                            <TableHead>Current Mentor</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredMentees.map((mentee) => (
                                            <TableRow key={mentee._id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{mentee.firstName} {mentee.lastName}</p>
                                                        <p className="text-sm text-gray-600">{mentee.role} at {mentee.company}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{mentee.email}</TableCell>
                                                {/*<TableCell>*/}
                                                {/*    <p className="text-sm">{mentee.goals.substring(0, 50)}...</p>*/}
                                                {/*</TableCell>*/}
                                                <TableCell>
                                                    <Badge className={mentee.planType === 'premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}>
                                                        {mentee.planType}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{mentee.completedSessions}/{mentee.totalSessions}</TableCell>
                                                <TableCell>
                                                    {mentee.currentMentor ? (
                                                        <span className="text-sm text-green-600">Assigned</span>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">None</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(mentee.status)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedItem(mentee);
                                                                setIsViewDialogOpen(true);
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {mentee.status === 'pending' && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleApprove(mentee._id, 'mentee')}
                                                                >
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleReject(mentee._id, 'mentee')}
                                                                >
                                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* View Detail Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedItem && 'firstName' in selectedItem ? 'Mentor' : 'Mentee'} Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <p>{selectedItem.firstName} {selectedItem.lastName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p>{selectedItem.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Experience</label>
                                    <p>{selectedItem?.experience} years</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Location</label>
                                    <p>{selectedItem?.location || 'Not specified'}</p>
                                </div>
                            </div>

                            {'expertise' in selectedItem ? (
                                // Mentor specific fields
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Expertise</label>
                                        <p>{selectedItem.expertise}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Skills</label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {selectedItem.skills.map((skill, index) => (
                                                <Badge key={index} variant="secondary">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Statistics</label>
                                        <div className="grid grid-cols-3 gap-4 mt-1">
                                            <div className="text-center p-2 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">Rating</p>
                                                <p className="font-medium">{selectedItem.rating}/5</p>
                                            </div>
                                            {/*<div className="text-center p-2 bg-gray-50 rounded">*/}
                                            {/*    <p className="text-sm text-gray-600">Active Mentees</p>*/}
                                            {/*    <p className="font-medium">{selectedItem.activeMentees.length}</p>*/}
                                            {/*</div>*/}
                                            <div className="text-center p-2 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">Completed</p>
                                                <p className="font-medium">{selectedItem.completedMentorships}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Mentee specific fields
                                <div className="space-y-4">
                                    {/*<div>*/}
                                    {/*    <label className="text-sm font-medium">Goals</label>*/}
                                    {/*    <p>{selectedItem.goals}</p>*/}
                                    {/*</div>*/}

                                    {/*<div>*/}
                                    {/*    <label className="text-sm font-medium">Interests</label>*/}
                                    {/*    <div className="flex flex-wrap gap-2 mt-1">*/}
                                    {/*        {selectedItem?.interests.map((interest, index) => (*/}
                                    {/*            <Badge key={index} variant="secondary">{interest}</Badge>*/}
                                    {/*        ))}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div>
                                        <label className="text-sm font-medium">Plan & Progress</label>
                                        <div className="grid grid-cols-3 gap-4 mt-1">
                                            <div className="text-center p-2 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">Plan</p>
                                                <p className="font-medium capitalize">{selectedItem.planType}</p>
                                            </div>
                                            <div className="text-center p-2 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">Sessions</p>
                                                <p className="font-medium">{selectedItem.completedSessions}/{selectedItem.totalSessions}</p>
                                            </div>
                                            <div className="text-center p-2 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">Subscription</p>
                                                <p className="font-medium capitalize">{selectedItem.subscriptionStatus}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium">Bio</label>
                                <p>{selectedItem?.bio || 'No bio provided'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Application Details</label>
                                <div className="grid grid-cols-2 gap-4 mt-1">
                                    <div>
                                        <p className="text-sm text-gray-600">Applied Date</p>
                                        <p>{new Date(selectedItem?.applicationDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <p className="capitalize">{selectedItem?.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}