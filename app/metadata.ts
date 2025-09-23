import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://croplink.org'),
    title: {
        default: 'CropLink - Connect, Collaborate, Grow',
        template: '%s | CropLink',
    },
    description: 'CropLink is a Cameroon-based agri-tech platform that transforms how smallholder farmers and buyers interact through direct market access, collaborative fulfillment, and AI-driven insights.',
    keywords: [
        'CropLink',
        'agriculture Cameroon',
        'agri-tech platform',
        'smallholder farmers',
        'crop marketplace',
        'agricultural technology',
        'farm to market',
        'collaborative farming',
        'AI agriculture',
        'crop trading',
        'farmer marketplace',
        'agricultural insights',
        'predictive analytics',
        'supply chain agriculture',
        'Cameroon farming',
        'agricultural innovation',
        'digital agriculture',
        'smart farming',
        'crop fulfillment',
        'agricultural logistics'
    ],
    authors: [
        { name: 'CropLink Team', url: 'https://croplink.org' }
    ],
    creator: 'CropLink',
    publisher: 'CropLink',
    category: 'Agriculture Technology',
    classification: 'Agriculture, Technology, Marketplace',

    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: ['fr_FR', 'fr_CM'],
        title: 'CropLink - Connect, Collaborate, Grow',
        description: 'Transform agriculture through technology. Connect farmers with buyers, enable collaborative fulfillment, and access AI-driven market insights for sustainable farming in Cameroon.',
        siteName: 'CropLink',
        url: 'https://croplink.org',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'CropLink - Agricultural Technology Platform',
                type: 'image/png',
            }
        ],
        countryName: 'Cameroon',
    },

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: 'https://croplink.org',
        languages: {
            'en-US': 'https://croplink.org',
            'fr-FR': 'https://croplink.org/fr',
        },
    },

    verification: {
        google: 'your-google-verification-code',
    },

    applicationName: 'CropLink',
    referrer: 'origin-when-cross-origin',

    other: {
        'theme-color': '#28B4A3',
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'CropLink',
        'application-name': 'CropLink',
        'msapplication-TileColor': '#28B4A3',
        'geo.region': 'CM',
        'geo.placename': 'Cameroon',
        'geo.position': '4.0511;9.7679',
        'ICBM': '4.0511, 9.7679',
    },
};
