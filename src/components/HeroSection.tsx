import React, { useState } from 'react';
import { CardContainer, CardBody } from './ui/3d-card';

const images = [
    {
        src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        alt: 'Team at work',
    },
    {
        src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
        alt: 'Office space',
    },
    {
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        alt: 'Modern Construction Building',
    },
    {
        src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        alt: 'Nature',
    },
    {
        src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
        alt: 'Abstract',
    },
];

export default function HeroSection() {
    const [activeIdx, setActiveIdx] = useState(2); // Center image active by default

    // Card positions for fanned-out effect
    const cardStyles = [
        {
            rotate: -18,
            x: '-32%',
            y: '-8%',
            z: 10,
            scale: 0.92,
        },
        {
            rotate: -9,
            x: '-16%',
            y: '-4%',
            z: 15,
            scale: 0.96,
        },
        {
            rotate: 0,
            x: '0%',
            y: '0%',
            z: 20,
            scale: 1.08,
        },
        {
            rotate: 9,
            x: '16%',
            y: '-4%',
            z: 15,
            scale: 0.96,
        },
        {
            rotate: 18,
            x: '32%',
            y: '-8%',
            z: 10,
            scale: 0.92,
        },
    ];

    return (
        <section className="relative w-full bg-white pt-12 pb-2 px-4 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side (unchanged) */}
                <div className="flex flex-col justify-center h-full z-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                        Foundation of Excellence,<br />
                        Structure of Strength
                    </h1>
                    <p className="text-lg text-gray-700 max-w-lg mb-8">
                        Excellence is the foundation upon which we build. Our construction company stands for unwavering quality and the creation of structures that embody strength and longevity.
                    </p>
                    <button className="bg-[#003e76] hover:bg-[#155fa0] text-white font-semibold px-8 py-3 rounded-md text-lg shadow transition mb-8 w-fit">
                        Start a Project
                    </button>
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Residential Card */}
                        <div className="w-full bg-[#e6f0fa] rounded-lg p-6 flex flex-col items-center shadow-md">
                            <div className="bg-[#003e76] text-white rounded-full p-3 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.553-1.553A2 2 0 016.414 8h11.172a2 2 0 011.414.586L21 10m-9 4v6m-4-6v6m8-6v6" /></svg>
                            </div>
                            <div className="font-bold text-lg text-[#003e76] mb-2 text-center">Residential Construction</div>
                            <div className="text-gray-700 text-center text-sm">
                                We offer comprehensive residential construction services, from building new homes, to remodeling projects.
                            </div>
                        </div>
                        {/* Commercial Card */}
                        <div className="w-full bg-[#e6f0fa] rounded-lg p-6 flex flex-col items-center shadow-md mt-4 md:mt-0">
                            <div className="bg-[#003e76] text-white rounded-full p-3 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17V9a2 2 0 012-2h12a2 2 0 012 2v8M4 17h16M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                            </div>
                            <div className="font-bold text-lg text-[#003e76] mb-2 text-center">Commercial Construction</div>
                            <div className="text-gray-700 text-center text-sm">
                                We provide expertise in constructing commercial spaces such as offices, retail outlets, and restaurants.
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Side: Fanned-out image stack */}
                <div className="hidden sm:flex flex-col w-full h-full items-center justify-center relative z-10 min-h-[36rem]">
                    <div className="relative w-full max-w-2xl h-[32rem]">
                        {images.map((img, idx) => {
                            const isActive = idx === activeIdx;
                            const style = cardStyles[idx];
                            return (
                                <div
                                    key={img.src}
                                    className={`absolute w-72 h-96 md:w-96 md:h-[28rem] rounded-xl border-[10px] border-black bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out ${isActive ? 'scale-110 shadow-2xl z-40' : 'opacity-80'}`}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) translate(${style.x}, ${style.y}) rotate(${style.rotate}deg) scale(${isActive ? style.scale + 0.08 : style.scale})`,
                                        zIndex: isActive ? 40 : style.z,
                                    }}
                                    onClick={() => setActiveIdx(idx)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* On mobile: stack images vertically with less overlap */}
                {/* <div className="flex flex-col w-full h-full items-center justify-center relative z-10 min-h-[20rem] sm:min-h-[36rem] px-2 sm:px-0">
                    <div className="hidden sm:max-w-2xl h-30 sm:h-[32rem]">
                        {images.map((img, idx) => {
                            const isActive = idx === activeIdx;
                            const style = cardStyles[idx];
                            return (
                                <div
                                    key={img.src}
                                    className={`absolute w-60 h-80 sm:w-75 sm:h-96 md:w-96 md:h-[28rem] rounded-xl border-4 sm:border-[10px] border-black bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out ${isActive ? 'scale-105 sm:scale-110 shadow-xl sm:shadow-2xl z-40' : 'opacity-80'}`}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) translate(${window.innerWidth < 640 ? `${parseInt(style.x) * 0.6}px` : style.x}, ${window.innerWidth < 640 ? `${parseInt(style.y) * 0.6}px` : style.y}) rotate(${style.rotate}deg) scale(${isActive ? style.scale + (window.innerWidth < 640 ? 0.05 : 0.08) : style.scale * (window.innerWidth < 640 ? 0.9 : 1)})`,
                                        zIndex: isActive ? 40 : style.z,
                                    }}
                                    onClick={() => setActiveIdx(idx)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                            );
                        })}
                    </div> */}
                {/* </div> */}
            </div>
        </section>
    );
}
