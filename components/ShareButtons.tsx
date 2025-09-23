'use client'

import { useState } from 'react'
import {
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    LinkIcon,
    MailIcon,
} from 'lucide-react'

interface ShareButtonsProps {
    title: string
    url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    const ShareButton = ({
                             href,
                             icon: Icon,
                             label,
                             className = ""
                         }: {
        href?: string
        icon: any
        label: string
        className?: string
    }) => (
        <button
            onClick={href ? () => window.open(href, '_blank', 'noopener,noreferrer') : copyToClipboard}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
            title={`Share on ${label}`}
        >
            <Icon className="w-5 h-5" />
        </button>
    )

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Share this article
            </h3>

            <div className="grid grid-cols-3 gap-3">
                <ShareButton
                    href={shareLinks.twitter}
                    icon={TwitterIcon}
                    label="Twitter"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                />

                <ShareButton
                    href={shareLinks.facebook}
                    icon={FacebookIcon}
                    label="Facebook"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                />

                <ShareButton
                    href={shareLinks.linkedin}
                    icon={LinkedinIcon}
                    label="LinkedIn"
                    className="bg-blue-700 text-white hover:bg-blue-800"
                />



                <ShareButton
                    href={shareLinks.email}
                    icon={MailIcon}
                    label="Email"
                    className="bg-gray-500 text-white hover:bg-gray-600"
                />

                <ShareButton
                    icon={LinkIcon}
                    label="Copy Link"
                    className={`${
                        copied
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                />
            </div>

            {copied && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center">
                    Link copied to clipboard!
                </p>
            )}
        </div>
    )
}