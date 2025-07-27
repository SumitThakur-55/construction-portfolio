"use client";

import React from "react";
import { ImagesSlider } from "./ui/images-slider"; // Adjust path as needed


const images = [
    {
        src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
        alt: "Team at work",
    },
    {
        src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        alt: "Office space",
    },
    {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Construction Building",
    },
    {
        src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        alt: "Nature",
    },
    {
        src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
        alt: "Abstract",
    },
];

export default function HeroSection() {
    return (
        <section className="relative w-full h-[100vh] overflow-hidden">
            <ImagesSlider
                images={images.map((img) => img.src)}
                direction="up"
                overlay
                className="h-full"
            >
                <div className="relative z-50 text-white text-center px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Foundation of Excellence, <br /> Structure of Strength
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Excellence is the foundation upon which we build. Our construction
                        company stands for unwavering quality and the creation of structures
                        that embody strength and longevity.
                    </p>
                    <button className="bg-white text-[#003e76] font-semibold px-8 py-3 rounded-md text-lg shadow hover:bg-gray-100 transition">
                        Start a Project
                    </button>
                </div>
            </ImagesSlider>
        </section>
    );
}
