"use client"


import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"


export default function PostsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [posts, setPosts] = useState<any[]>([]);
    const [deletePostId, setDeletePostId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/posts?admin=true');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch posts');
            }

            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch posts",
            });
        } finally {
            setIsLoading(false);
        }
    };


    const handleDelete = async () => {
        if (!deletePostId) return;

        const postToDelete = posts.find(post => post._id === deletePostId);
        if (!postToDelete) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/posts/${postToDelete.slug}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Post deleted successfully",
                });
                fetchPosts();
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete post",
            });
        }
        setIsLoading(false);
        setDeletePostId(null);
    };
    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Posts</h1>
                <Button onClick={() => router.push('/admin/posts/new')}>
                    <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
            </div>

            {isLoading ? (
                <div className="text-center py-10">
                    <p>Loading posts...</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No posts found</p>
                    <Button
                        onClick={() => router.push('/admin/posts/new')}
                        className="mt-4"
                    >
                        Create your first post
                    </Button>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Scheduled</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : post.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.status}
                </span>
                                </TableCell>
                                <TableCell>
                                    {post.status === 'scheduled' && post.scheduledAt 
                                        ? new Date(post.scheduledAt).toLocaleString()
                                        : '-'
                                    }
                                </TableCell>
                                <TableCell>{post.author.name}</TableCell>
                                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => router.push(`/admin/posts/${post.slug}/edit`)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setDeletePostId(post._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}


            <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}