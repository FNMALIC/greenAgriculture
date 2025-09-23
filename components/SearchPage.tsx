"use client"
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import React from "react";

export const SearchPage = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Posts</h1>
            <div className="max-w-xl mx-auto">
                <div className="flex gap-4">
                    <Input
                        type="search"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                    <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </div>
                {/* Add search results component here */}
            </div>
        </div>
    );
};