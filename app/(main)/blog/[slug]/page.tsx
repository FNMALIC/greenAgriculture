import BlogPost from "@/components/BlogPost";
import {Metadata} from "next";


type Props = {
    params: {
        slug: string;
    };
};

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


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
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




export default function Page({ params }: Props) {
    // console.log(await params())
    return (
        <>
            {/*{params}*/}
        <BlogPost params={params}  />
        </>
    );
}
