import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {notFound} from "next/navigation";
import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import BlogJsonLd from "@/components/BlogJsonLd";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import InteractiveActions from "@/components/InteractiveActions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import AuthenticatedComments from "@/components/AuthenticatedComments";
import {Metadata} from "next";

async function getPost(slug: string) {
    try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
            throw new Error('API URL not configured');
        }

        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`)

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.status}`);
        }

        const data = await res.json();
        if (!data) {
            throw new Error('No data received');
        }

        return data;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}

type Props = {
    params: {
        slug: any;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not-Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
    }
}

export default async function BlogPost({ params }: Props) {
      const p = await params;
    const post = await getPost(p.slug);
    const session = await getServerSession(authOptions);

    if (!post) {
        notFound();
    }

    const components = {
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
            </h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-900 dark:text-gray-100 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
            </h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
            </h3>
        ),
        h4: ({ children }: { children: React.ReactNode }) => (
            <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
            </h4>
        ),
        p: ({ children }: { children: React.ReactNode }) => {
            const hasDiv = React.Children.toArray(children).some(
                child => React.isValidElement(child) &&
                    (child.type === 'div' || child.props?.className?.includes('my-6'))
            );

            if (hasDiv) {
                return <div className="mb-6">{children}</div>;
            }

            return (
                <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
                    {children}
                </p>
            );
        },
        a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
            <a
                href={href}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 transition-colors duration-200"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-outside mb-6 ml-6 space-y-3">
                {children}
            </ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-outside mb-6 ml-6 space-y-3">
                {children}
            </ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {children}
            </li>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-6 py-4 my-8 italic text-gray-800 dark:text-gray-200 rounded-r-lg">
                {children}
            </blockquote>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic text-gray-800 dark:text-gray-200">
                {children}
            </em>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold text-gray-900 dark:text-gray-100">
                {children}
            </strong>
        ),
        hr: () => (
            <hr className="my-12 border-gray-300 dark:border-gray-700" />
        ),
        table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <th className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                {children}
            </th>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                {children}
            </td>
        ),
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-medium">
                        {match[1].toUpperCase()}
                    </div>
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="!mt-0 !rounded-none"
                        showLineNumbers
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-mono text-blue-600 dark:text-blue-400" {...props}>
                    {children}
                </code>
            );
        },
        img: ({ src, alt }: { src?: string; alt?: string }) => {
            if (!src) return null;

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

            return (
                <div className="my-10">
                    <Image
                        // src={src}
                        src={src || undefined}
                        alt={alt || ''}
                        width={800}
                        height={400}
                        className="rounded-xl shadow-lg"
                    />
                    {alt && (
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                            {alt}
                        </p>
                    )}
                </div>
            );
        },
    };

    return (
        <>
            <BlogJsonLd post={post} />

            {/* Hero Section */}
            <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />

                <article className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Header */}
                    <header className="pt-12 pb-8">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Category Badge */}
                            {post.category && (
                                <div className="mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                        {post.category}
                                    </span>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            {post.excerpt && (
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={post.author.avatar || undefined }

                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {post.author.name}
                                        </p>
                                        <p className="text-sm">{post.author.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <time dateTime={post.publishedAt}>
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                    {post.views && (
                                        <>
                                            <span>•</span>
                                            <span>{post.views.toLocaleString()} views</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="max-w-5xl mx-auto">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </header>
                </article>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Table of Contents - Desktop Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-8">
                            <TableOfContents content={post.content} />
                            <ShareButtons
                                title={post.title}
                                url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${p.slug}`}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        {/* Interactive Actions Bar */}
                        <div className="mb-8">
                            <InteractiveActions
                                postSlug={p.slug}
                                session={session}
                                initialLikes={post.likes || 0}
                                initialBookmarks={post.bookmarks || 0}
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-xl dark:prose-invert max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                rehypePlugins={[rehypeRaw]}
                                components={components}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Tags */}
                        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-wrap gap-3 mb-8">
                                {post.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </footer>

                        {/* Mobile Share Buttons */}
                        <div className="lg:hidden mb-8">
                            <ShareButtons
                                title={post.title}
                                url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${p.slug}`}
                            />
                        </div>

                        {/* Comments Section */}
                        <AuthenticatedComments
                            postSlug={p.slug}
                            session={session}
                        />
                    </main>
                </div>
            </div>


        </>
    );
}
