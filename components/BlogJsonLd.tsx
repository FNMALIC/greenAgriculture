// components/BlogJsonLd.tsx
export default function BlogJsonLd({ post }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.title,
                    description: post.excerpt,
                    author: {
                        "@type": "Person",
                        name: post.author.name,
                    },
                    datePublished: post.publishedAt,
                    dateModified: post.updatedAt,
                    image: post.coverImage,
                    publisher: {
                        "@type": "Organization",
                        name: "Your Blog Name",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://yourdomain.com/logo.png"
                        }
                    }
                })
            }}
        />
    )
}