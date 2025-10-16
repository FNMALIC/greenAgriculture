"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScheduledPostsManager from "@/components/admin/ScheduledPostsManager";
import {
    Download,
    TrendingUp,
    FileText,
    Users,
    Tag,
    Eye,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    // Sample data - replace with real data from your API
    const stats = {
        totalPosts: 156,
        totalViews: 23890,
        totalUsers: 542,
        totalTags: 89,
        recentViews: 1234,
        viewsChange: 12.5,
        postsChange: -2.3
    };

    const viewsData = [
        { name: 'Jan', views: 4000 },
        { name: 'Feb', views: 3000 },
        { name: 'Mar', views: 5000 },
        { name: 'Apr', views: 4780 },
        { name: 'May', views: 5890 },
        { name: 'Jun', views: 4390 }
    ];

    const handleExportData = async () => {
        setIsExporting(true);
        try {
            const response = await fetch('/api/export-data');
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `blog-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            toast({
                title: "Success",
                description: "Data exported successfully!"
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to export data"
            });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export Data"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{stats.totalPosts}</div>
                            <div className={`flex items-center ${stats.postsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stats.postsChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                <span className="text-sm">{Math.abs(stats.postsChange)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                            <div className={`flex items-center ${stats.viewsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stats.viewsChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                <span className="text-sm">{Math.abs(stats.viewsChange)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
                        <Tag className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTags}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Views Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={viewsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="views"
                                            stroke="#2563eb"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div>
                    <ScheduledPostsManager />
                </div>
            </div>
        </div>
    );
}