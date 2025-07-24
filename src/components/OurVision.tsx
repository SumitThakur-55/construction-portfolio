"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const OurVision = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -20% 0px'
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
                {/* Text Section - Animates from bottom to top */}
                <div className="space-y-6">
                    <div
                        className={`transform transition-all duration-1000 ease-out delay-300 ${isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-16 opacity-0'
                            }`}
                    >
                        <p className="text-[#003e76] uppercase tracking-wider text-sm font-medium mb-4">
                            OUR VISION
                        </p>

                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Building a <span className="text-[#003e76]">sustainable future</span>
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                            To be a leading provider of civil engineering consultancy and construction services, recognized for our expertise, innovation, and commitment to sustainable development.
                        </p>

                        <button className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-[#003e76] text-[#003e76] font-medium rounded-lg hover:bg-[#003e76] hover:text-white transition-all duration-300 transform hover:scale-105">
                            Learn More
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

                {/* Image Section - Animates from right to left */}
                <div className="w-full flex justify-center py-12 px-4">
                    <div className="w-full max-w-[1500px] bg-white shadow-xl flex flex-row gap- overflow-hidden group">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`flex-1 overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isVisible ? `delay-${i * 200}` : ''}`}
                            >
                                <div
                                    className={`relative w-full h-[300px] md:h-[400px] lg:h-[450px]
             border-4 border-[#003e76] transition duration-300
            ${i === 1
                                            ? 'grayscale-0' // middle image highlighted
                                            : 'grayscale group-hover:grayscale-0' // others grayscale by default, remove on hover
                                        }
            ${i !== 1
                                            ? 'group-hover:grayscale' // dim all when any is hovered
                                            : 'group-hover:grayscale' // also dim middle when another is hovered
                                        }
          `}
                                >
                                    <Image
                                        src={
                                            i === 0
                                                ? '/civilengg.jpg'
                                                : i === 1
                                                    ? '/work.jpg'
                                                    : '/eqp.jpg'
                                        }
                                        alt={`Vision photo ${i + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover "
                                        priority={i === 0}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </section>
    );
};

export default OurVision;
