"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, Play } from 'lucide-react';

export default function ScheduledPostsManager() {
    const [isPublishing, setIsPublishing] = useState(false);
    const { toast } = useToast();

    const publishScheduledPosts = async () => {
        setIsPublishing(true);
        try {
            const response = await fetch('/api/posts/scheduled', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to publish scheduled posts');
            }

            toast({
                title: "Success",
                description: data.message,
            });

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to publish scheduled posts",
            });
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Scheduled Posts
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                    Manually trigger publishing of scheduled posts that are due.
                </p>
                <Button 
                    onClick={publishScheduledPosts}
                    disabled={isPublishing}
                    className="w-full"
                >
                    <Play className="mr-2 h-4 w-4" />
                    {isPublishing ? 'Publishing...' : 'Publish Scheduled Posts'}
                </Button>
            </CardContent>
        </Card>
    );
}
