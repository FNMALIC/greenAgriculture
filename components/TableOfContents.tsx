'use client'

import { useState, useEffect } from 'react'
import { ChevronRightIcon, ListIcon } from 'lucide-react'

interface TocItem {
    id: string
    title: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Extract headings from markdown content
        const headingRegex = /^(#{1,4})\s+(.+)$/gm
        const items: TocItem[] = []
        let match

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length
            const title = match[2].trim()
            const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

            items.push({
                id,
                title,
                level
            })
        }

        setTocItems(items)
    }, [content])

    useEffect(() => {
        // Intersection Observer to track active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-100px 0% -80% 0%',
                threshold: 0
            }
        )

        // Observe all headings
        const headings = document.querySelectorAll('h1, h2, h3, h4')
        headings.forEach((heading) => observer.observe(heading))

        return () => observer.disconnect()
    }, [])

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    if (tocItems.length === 0) return null

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <ListIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Table of Contents
                    </h3>
                </div>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <ChevronRightIcon
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                            isVisible ? 'rotate-90' : ''
                        }`}
                    />
                </button>
            </div>

            {isVisible && (
                <nav className="space-y-1">
                    {tocItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToHeading(item.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                                activeId === item.id
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                            style={{
                                paddingLeft: `${0.75 + (item.level - 1) * 0.75}rem`,
                                fontSize: item.level === 1 ? '0.95rem' : item.level === 2 ? '0.9rem' : '0.85rem'
                            }}
                        >
                            <span className="block truncate">
                                {item.title}
                            </span>
                        </button>
                    ))}
                </nav>
            )}

            {/* Reading Progress Bar */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Reading Progress</span>
                    <span id="reading-progress">0%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        id="progress-bar"
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-200"
                        style={{ width: '0%' }}
                    />
                </div>
            </div>

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        // Reading progress functionality
                        function updateReadingProgress() {
                            const article = document.querySelector('article');
                            if (!article) return;
                            
                            const scrollTop = window.scrollY;
                            const docHeight = article.offsetHeight;
                            const winHeight = window.innerHeight;
                            const scrollPercent = scrollTop / (docHeight - winHeight);
                            const scrollPercentRounded = Math.round(scrollPercent * 100);
                            
                            const progressBar = document.getElementById('progress-bar');
                            const progressText = document.getElementById('reading-progress');
                            
                            if (progressBar && progressText) {
                                const percent = Math.min(100, Math.max(0, scrollPercentRounded));
                                progressBar.style.width = percent + '%';
                                progressText.textContent = percent + '%';
                            }
                        }
                        
                        window.addEventListener('scroll', updateReadingProgress);
                        window.addEventListener('resize', updateReadingProgress);
                    `
                }}
            />
        </div>
    )
}