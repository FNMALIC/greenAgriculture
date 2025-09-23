export interface SearchResult {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: string;
    author: {
        name: string;
        image?: string;
    };
    tags: string[];
    createdAt: Date;
}

export interface SearchResponse {
    results: SearchResult[];
    totalResults: number;
    page: number;
    totalPages: number;
}

export interface SearchError {
    message: string;
    status: number;
}