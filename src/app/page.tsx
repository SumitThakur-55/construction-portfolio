"use client";

import AppNavbar from "@/components/AppNavbar";
import HeroSection from "@/components/HeroSection";
import OurPromise from "@/components/OurPromise";
import OurVision from "@/components/OurVision";
import OurProject from "@/components/OurProject";
import Founder from "@/components/Founder";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navbar overlays the content */}
      <AppNavbar />

      {/* Give padding top to prevent content from hiding behind fixed navbar */}
      <div className="">
        <HeroSection />
        <OurProject />
        <OurPromise />
        <OurVision />

        <Founder />
        <Footer />
      </div>
    </main>
  );
}
