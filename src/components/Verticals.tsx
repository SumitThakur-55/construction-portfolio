"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from 'next/image';

export default function Verticals() {
    const cards = verticalData.map((section, index) => (
        <Card
            key={section.title}
            card={{
                src: section.thumbnail,
                title: section.title,
                category: section.category,
                content: <ProjectsContent projects={section.projects} />,
            }}
            index={index}
            layout
        />
    ));

    return (
        <section className="py-20 bg-white dark:bg-neutral-950">
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-[#003e76] mb-4">
                    Projects Across Industry Verticals
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Delivering excellence through every structure.
                </p>
            </div>

            <div className="px-8">
                <Carousel items={cards} />
            </div>
        </section>
    );
}

type Project = {
    name: string;
    image: string;
    description: string;
};

type ProjectsContentProps = {
    projects: Project[];
};

const ProjectsContent = ({ projects }: ProjectsContentProps) => {
    return (
        <div className="space-y-12">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-10 rounded-3xl shadow-sm"
                >
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
                        <Image
                            src={project.image}
                            alt={project.name}
                            width={800}
                            height={600}
                            className="w-full md:w-1/2 rounded-xl object-cover"
                        />
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-semibold text-[#003E76] mb-4">
                                {project.name}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const verticalData = [
    {
        title: "Luxury Residences",
        category: "Residential",
        thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
        projects: [
            {
                name: "Skyline Heights",
                image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=1200&h=800&fit=crop",
                description:
                    "Modern high-rise luxury apartments with rooftop garden, spa amenities, panoramic city views, and sustainable design.",
            },
            {
                name: "CityScape Residences",
                image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop",
                description:
                    "Premium urban residences with open-plan layouts, sunlight-filled lounges, and smart-home integrations.",
            },
        ],
    },
    {
        title: "Office Parks",
        category: "Commercial",
        thumbnail: "https://images.unsplash.com/photo-1593697820742-5c70f395f3d7?w=800&h=600&fit=crop",
        projects: [
            {
                name: "GreenTech Business Center",
                image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=800&fit=crop",
                description:
                    "Sustainable commercial campus with landscaped plazas, co-working spaces, and energy-efficient systems.",
            },
            {
                name: "Metro Tower",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
                description:
                    "State-of-the-art office towers featuring smart glazing, flexible floorplates, and green certification.",
            },
        ],
    },
    {
        title: "Industrial Hubs",
        category: "Industrial",
        thumbnail: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop",
        projects: [
            {
                name: "Automax Facility",
                image: "https://images.unsplash.com/photo-1625772452854-8d83121b6ffb?w=1200&h=800&fit=crop",
                description:
                    "Automated manufacturing facility with robotics, logistics optimization, and renewable power infrastructure.",
            },
            {
                name: "ProLogis Warehouse",
                image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop",
                description:
                    "Smart warehouse complex with solar roofing, climate control, and real-time supply chain systems.",
            },
        ],
    },
    {
        title: "Smart City",
        category: "Urban Infrastructure",
        thumbnail: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop",
        projects: [
            {
                name: "NeoCity Grid",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8f9c3e83?w=1200&h=800&fit=crop",
                description:
                    "Integrated smart city pilot with IoT sensors, renewable energy grids, and intelligent traffic management.",
            },
            {
                name: "Urban Pulse Network",
                image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=1200&h=800&fit=crop",
                description:
                    "Urban development featuring clean transport hubs, green rooftops, and connected public spaces.",
            },
        ],
    },
    {
        title: "Campus Projects",
        category: "Educational Infrastructure",
        thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
        projects: [
            {
                name: "Greenfield Academy",
                image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
                description:
                    "Modern campus infrastructure with classrooms, libraries, and student centers integrated in walkable layout.",
            },
            {
                name: "TechBridge Institute",
                image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop",
                description:
                    "State-of-the-art educational complex featuring laboratories, dormitory blocks, and green common areas.",
            },
        ],
    },
];
