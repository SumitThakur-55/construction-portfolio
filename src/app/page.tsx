"use client";

import AppNavbar from "@/components/AppNavbar";
import HeroSection from "@/components/HeroSection";
import OurPromise from "@/components/OurPromise";
import OurVision from "@/components/OurVision";
import OurProject from "@/components/OurProject";
import Footer from "@/components/footer";
import Founder from "@/components/Founder";

export default function HomePage() {
  return (
    <main className="">
      <AppNavbar />
      <HeroSection />
      <OurPromise />
      <OurVision />
      <OurProject />
      <Founder />
      <Footer />
    </main>
  );
}

