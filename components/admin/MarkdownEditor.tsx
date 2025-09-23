"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Bold,
    Italic,
    Code,
    Link2,
    Image as ImageIcon,
    ListOrdered,
    List,
    Quote,
    Heading1,
    Heading2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function MarkdownEditor({
                                           content,
                                           onChange,
                                           onBlur
                                       }: {
    content: string;
    onChange: (content: string) => void;
    onBlur?: () => void;
}) {
    const [tab, setTab] = useState('edit');
    const { toast } = useToast();

    const insertText = (before: string, after = '') => {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = content.substring(0, start) +
            before +
            (selectedText || 'text') +
            after +
            content.substring(end);

        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                start + before.length + (selectedText || 'text').length
            );
        }, 0);
    };

    const components = {
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
                {children}
            </h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-4 text-gray-900 dark:text-gray-100">
                {children}
            </h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-2xl font-semibold mt-5 mb-3 text-gray-900 dark:text-gray-100">
                {children}
            </h3>
        ),
        h4: ({ children }: { children: React.ReactNode }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                {children}
            </h4>
        ),
        p: ({ children }: { children: React.ReactNode }) => {
            // Check if children contains a div element
            const hasDiv = React.Children.toArray(children).some(
                child => React.isValidElement(child) &&
                    (child.type === 'div' || child.props?.className?.includes('my-6'))
            );

            // If there's a div inside, render a div instead of p
            if (hasDiv) {
                return <div className="mb-4">{children}</div>;
            }

            return (
                <p className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
                    {children}
                </p>
            );
        },
        a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
                {children}
            </a>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                {children}
            </ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 ml-4 space-y-2">
                {children}
            </ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="text-gray-800 dark:text-gray-200">
                {children}
            </li>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
                {children}
            </blockquote>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">
                {children}
            </em>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold">
                {children}
            </strong>
        ),
        hr: () => (
            <hr className="my-8 border-gray-300 dark:border-gray-700" />
        ),
        table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {children}
            </th>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {children}
            </td>
        ),
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <div className="my-4">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-md"
                        showLineNumbers
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm" {...props}>
                    {children}
                </code>
            );
        },
        img: ({ src, alt }: { src?: string; alt?: string }) => {
            if (!src) return null; // Don't render if no src

            // Handle external images (like badges) with regular img tag
            if (src.startsWith('http') &&
                (src.includes('shields.io') || src.includes('badges.io'))) {
                return (
                    <img
                        src={src}
                        alt={alt || ''}
                        className="inline-block"
                    />
                );
            }

            // Handle internal images with Next/Image
            return (
                <div className="my-6">
                    <Image
                        src={src}
                        alt={alt || ''}
                        width={800}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            );
        },
    };

    const handleImageUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();

                    if (data.url) {
                        insertText(`![${file.name}](${data.url})`);
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
                }
            }
        };

        input.click();
    };

    const toolbar = [
        { icon: <Heading1 className="h-4 w-4" />, action: () => insertText('# '), title: 'Heading 1' },
        { icon: <Heading2 className="h-4 w-4" />, action: () => insertText('## '), title: 'Heading 2' },
        { icon: <Bold className="h-4 w-4" />, action: () => insertText('**', '**'), title: 'Bold' },
        { icon: <Italic className="h-4 w-4" />, action: () => insertText('*', '*'), title: 'Italic' },
        { icon: <Code className="h-4 w-4" />, action: () => insertText('\n```\n', '\n```\n'), title: 'Code Block' },
        { icon: <Link2 className="h-4 w-4" />, action: () => insertText('[', '](url)'), title: 'Link' },
        { icon: <ImageIcon className="h-4 w-4" />, action: handleImageUpload, title: 'Image' },
        { icon: <ListOrdered className="h-4 w-4" />, action: () => insertText('1. '), title: 'Numbered List' },
        { icon: <List className="h-4 w-4" />, action: () => insertText('- '), title: 'Bullet List' },
        { icon: <Quote className="h-4 w-4" />, action: () => insertText('> '), title: 'Quote' },
    ];

    return (
        <div className="border rounded-md">
            <div className="border-b p-2 flex flex-wrap gap-2">
                {toolbar.map((item, index) => (
                    <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={item.action}
                        title={item.title}
                        type="button"
                    >
                        {item.icon}
                    </Button>
                ))}
            </div>

            <Tabs value={tab} onValueChange={setTab} className="min-h-[400px]">
                <TabsList className="m-2">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="m-0">
                    <textarea
                        value={content}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className="w-full h-[400px] p-4 focus:outline-none resize-none font-mono"
                        placeholder="Write your content here... Use Markdown for formatting."
                    />
                </TabsContent>

                <TabsContent value="preview" className="m-0">
                    <div className="p-4">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            rehypePlugins={[rehypeRaw]}
                            components={components}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}