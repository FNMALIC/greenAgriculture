"use client";


import React from "react";
import {Nav} from "@/components/Nav";
import ScrollButtons from "@/components/ScrollButtons";
import {Footer} from "@/components/Footer";

export default function Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <div className="min-h-screen bg-white">
            <Nav/>
            <main>
            {children}
            </main>
            <ScrollButtons />
            <Footer/>
        </div>

    );
}
