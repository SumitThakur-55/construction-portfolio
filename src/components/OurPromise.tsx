"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const OurPromise = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting); // will be true or false based on visibility
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -20% 0px' // adjust this to control when to reset
            }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden px-4 md:px-12 lg:px-24 py-8"
        >
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                {/* Image Section - Animates from left to right */}
                <div className="relative">
                    <div
                        className={`transform transition-all duration-1000 ease-out ${isVisible
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-full opacity-0'
                            }`}
                    >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/build1.png"
                                alt="Luxury building development"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Text Content Section - Animates from top to bottom */}
                <div className="space-y-6">
                    <div
                        className={`transform transition-all duration-1000 ease-out delay-300 ${isVisible
                            ? 'translate-y-0 opacity-100'
                            : '-translate-y-16 opacity-0'
                            }`}
                    >
                        <p className="text-[#003e76] uppercase tracking-wider text-sm font-medium mb-4">
                            OUR PROMISE
                        </p>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Creating the world's
                            <br />
                            <span className="text-[#003e76]">finest developments</span>
                        </h1>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                            To provide innovative and sustainable civil engineering solutions that enhance the quality of life, contribute to economic growth, and protect the environment.
                        </p>

                        <button className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-[#003e76] text-[#003e76] font-medium rounded-lg hover:bg-[#003e76] hover:text-white transition-all duration-300 transform hover:scale-105">
                            Know More
                            <svg
                                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPromise;