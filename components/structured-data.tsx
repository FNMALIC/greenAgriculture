// components/structured-data.tsx
import Script from 'next/script'

export default function StructuredData() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Codees Cameroon",
        "alternateName": "Codees CM",
        "url": "https://codees-cm.com",
        "logo": "https://codees-cm.com/logo.png",
        "description": "Leading tech community bringing together developers, programmers, and tech enthusiasts across Cameroon",
        "foundingDate": "2023",
        "foundingLocation": {
            "@type": "Place",
            "name": "Cameroon"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Cameroon"
        },
        "knowsAbout": [
            "Web Development",
            "Mobile Development",
            "Software Engineering",
            "Programming",
            "Technology Education",
            "Entrepreneurial Education ",
            "Entrepreneur Community"
        ],
        // "sameAs": [
        //     "https://twitter.com/codees_cm",
        //     "https://linkedin.com/company/codees-cameroon",
        //     "https://github.com/codees-cm"
        // ]
    }

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Codees Cameroon",
        "url": "https://codees-cm.com",
        "description": "Join Codees Cameroon, the leading tech community bringing together entrepreneurs, and tech enthusiasts across Cameroon",
        "inLanguage": ["en-US", "fr-FR"],
        "author": {
            "@type": "Organization",
            "name": "Codees Cameroon"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://codees-cm.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <>
            <Script
                id="organization-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationData),
                }}
            />
            <Script
                id="website-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteData),
                }}
            />
        </>
    )
}