import React, { useState } from 'react';
import Image from 'next/image';

export default function Founder() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="bg-gray-50 py-16 px-4 relative overflow-hidden">
                {/* Background Blueprint Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="blueprint" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect width="20" height="20" fill="none" stroke="#003e76" strokeWidth="0.5" />
                                <rect x="5" y="5" width="10" height="10" fill="none" stroke="#003e76" strokeWidth="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#blueprint)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#003e76] mb-4">
                            Founder&apos;s Legacy
                        </h2>
                        <div className="w-24 h-1 bg-[#003e76] mx-auto"></div>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div className="space-y-6 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#003e76]">
                                    HON. MUKESH SHARMA
                                </h3>
                                <p className="text-xl text-gray-600 font-medium">
                                    Founder &amp; Principal Engineer, Mukesh Sharma &amp; Associates
                                </p>
                            </div>

                            <div className="prose prose-lg text-gray-700 leading-relaxed">
                                <p>
                                    With an unwavering passion for engineering and architectural excellence,
                                    Hon. Mukesh Sharma founded <em className="text-[#003e76] font-semibold">Mukesh Sharma &amp; Associates</em> in 1993.
                                    Backed by an impressive legacy of <strong className="text-[#003e76]">over 32 years</strong> in the field,
                                    he continues to lead the firm with a clear vision — to design and deliver enduring structures
                                    that inspire, empower, and stand the test of time.
                                </p>

                                <p>
                                    His deep-rooted commitment to quality, innovation, and client trust has laid the foundation
                                    for the company&apos;s continued growth and success in the construction and engineering industry.
                                </p>
                            </div>

                            {/* Quote Block */}
                            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#003e76]">
                                <blockquote className="text-lg italic text-gray-600">
                                    &quot;Design is not just about structures — it&apos;s about shaping lives.&quot;
                                </blockquote>
                                <cite className="text-sm text-[#003e76] font-semibold mt-2 block">
                                    - Hon. Mukesh Sharma
                                </cite>
                            </div>

                            {/* Digital Signature */}
                            <div className="flex items-center space-x-4">
                                <div className="text-3xl font-script text-[#003e76] italic">
                                    Mukesh Sharma
                                </div>
                            </div>

                            {/* Know More Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center gap-2 bg-[#003e76] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#002a54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <span>Know More</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#003e76]/20 to-transparent rounded-2xl"></div>
                                <Image
                                    src="/founder.jpg"
                                    alt="Hon. Mukesh Sharma - Founder & Principal Engineer"
                                    width={600}
                                    height={500}
                                    className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Overlay with Initials */}
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                    <div className="text-4xl font-bold text-[#003e76] mb-1">MS</div>
                                    <div className="text-sm text-gray-600">Est. 1993</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-[#003e76]">About Hon. Mukesh Sharma</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6 text-gray-700">
                                <div className="flex items-center space-x-4 mb-6">
                                    <Image
                                        src="/founder.jpg"
                                        alt="Hon. Mukesh Sharma"
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#003e76]">Hon. Mukesh Sharma</h4>
                                        <p className="text-gray-600">Founder &amp; Principal Engineer</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="text-lg font-semibold text-[#003e76]">Professional Journey</h5>
                                    <p>
                                        Starting his journey in 1991, Hon. Mukesh Sharma has been instrumental in shaping
                                        the architectural landscape with his innovative designs and engineering excellence.
                                        His 32+ years of experience spans across residential, commercial, and industrial projects.
                                    </p>

                                    <h5 className="text-lg font-semibold text-[#003e76]">Vision &amp; Philosophy</h5>
                                    <p>
                                        His philosophy centers around creating structures that are not just functional but
                                        also sustainable and aesthetically pleasing. Every project under his guidance
                                        reflects a perfect blend of modern technology and timeless design principles.
                                    </p>

                                    <h5 className="text-lg font-semibold text-[#003e76]">Notable Achievements</h5>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Founded Mukesh Sharma &amp; Associates in 1993</li>
                                        <li>Over 200+ successful projects completed</li>
                                        <li>Recognized for excellence in sustainable construction</li>
                                        <li>Mentor to upcoming engineers and architects</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
