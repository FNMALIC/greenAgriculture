import "./globals.css";
import React from "react";
import Script from "next/script";
import ClientProviders from "./client-providers";
import { metadata } from './metadata';
import StructuredData from "@/components/structured-data";
import TanstackProvider from "@/providers/TanstackProvider";

// Export the metadata
export { metadata };

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/* Favicons */}
            <link rel='manifest' href='/favicon_io/site.webmanifest'/>
            <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png"/>

            {/* Analytics */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-HWB2388RS4"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HWB2388RS4');
          `}
            </Script>
        </head>
        <body>
        <div className="min-h-screen bg-white">
            {/*<StructuredData />*/}
            <TanstackProvider>

            <ClientProviders>
                {children}
            </ClientProviders>
            </TanstackProvider>

        </div>
        </body>
        </html>
    );
}