"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const postSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title cannot be more than 200 characters'),
    slug: z.string().min(1, 'Slug is required'),
    content: z.string().min(1, 'Content is required'),
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt cannot be more than 500 characters'),
    coverImage: z.string().optional(),
    status: z.enum(['draft', 'published']),
    tags: z.string(),
    author: z.object({
        name: z.string().default('fnmalic'),
        image: z.string().optional()
    }).optional()
});

export default function CreatePost() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            coverImage: '',
            status: 'draft',
            tags: '',
        },
    });

    // Update form content field when markdown content changes
    useEffect(() => {
        form.setValue('content', markdownContent, {
            shouldValidate: true
        });
    }, [markdownContent, form]);

    const onSubmit = async (values: z.infer<typeof postSchema>) => {
        try {
            setIsLoading(true);

            // Format the data to match the model
            const postData = {
                ...values,
                tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                author: {
                    name: 'fnmalic'
                }
            };

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create post');
            }

            toast({
                title: "Success",
                description: "Post created successfully",
            });

            router.push('/admin/posts');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create post",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        // Add loading state for upload
        setIsLoading(true);
        
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Upload failed');
            }
    
            const data = await response.json();
    
            if (data.url) {
                form.setValue('coverImage', data.url);
                toast({
                    title: "Success",
                    description: "Image uploaded successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to upload image",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
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
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <div className="flex items-center space-x-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                    />
                                    {isLoading && <span className="text-sm text-gray-500">Uploading...</span>}
                                    {form.watch('coverImage') && (
                                        <img
                                            src={form.watch('coverImage')}
                                            alt="Cover preview"
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                    )}
                                </div>
                            </FormItem>

                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <MarkdownEditor
                                    content={markdownContent}
                                    onChange={setMarkdownContent}
                                    onBlur={() => form.trigger('content')} // Add this line
                                />
                                <FormMessage>{form.formState.errors.content?.message}</FormMessage>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="excerpt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Excerpt</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-6">
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
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Published</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags (comma separated)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Creating...' : 'Create Post'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/admin/posts')}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}