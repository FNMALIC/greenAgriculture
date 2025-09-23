import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";
import {Nav} from "@/components/Nav";
import React from "react";

export default function HomePage() {
  return (
    <>
        <Nav/>

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
