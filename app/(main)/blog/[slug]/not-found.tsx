export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Post Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    The post you're looking for doesn't exist or has been removed.
                </p>

                <a
                    href="/blog"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Return to Blog
                </a>
            </div>
        </div>
    );
}
