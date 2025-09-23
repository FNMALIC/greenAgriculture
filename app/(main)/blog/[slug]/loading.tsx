// app/blog/[slug]/loading.tsx
export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <div className="relative w-full h-[400px] mb-8 bg-gray-200 rounded-lg"></div>
            <div className="max-w-3xl mx-auto">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}