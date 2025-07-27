import React from 'react';
import { ExpandableCardDemo } from './ui/expandable-card-demo-grid';

export default function OurProject() {
    return (
        <section className="bg-white h-screen flex items-center justify-center px-4">
            <div className="max-w-8xl px-4 w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#003e76] mb-4">
                        Our Recent Work
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Building quality, one project at a time.
                    </p>
                </div>

                {/* Expandable Cards */}
                <div className="mb-12">
                    <ExpandableCardDemo />
                </div>

                {/* More Button */}
                <div className="flex justify-center">
                    <a
                        href="/project"
                        className="inline-flex items-center gap-2 bg-[#003e76] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#002a54] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                    >
                        <span>More</span>
                        <svg
                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}