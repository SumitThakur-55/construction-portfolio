import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#003e76] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-4">Mukesh Sharma & Associates</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Building quality, one project at a time. Your trusted partner for construction excellence with over 15 years of experience.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Media Icons (external links) */}
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                {/* Twitter Icon */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="..." />
                                </svg>
                            </a>
                            {/* Other icons omitted for brevity */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-3">
                            <li><Link href="/services/residential" className="text-gray-300 hover:text-white transition-colors">Residential Construction</Link></li>
                            <li><Link href="/services/commercial" className="text-gray-300 hover:text-white transition-colors">Commercial Buildings</Link></li>
                            <li><Link href="/services/industrial" className="text-gray-300 hover:text-white transition-colors">Industrial Projects</Link></li>
                            <li><Link href="/services/renovation" className="text-gray-300 hover:text-white transition-colors">Renovation & Remodeling</Link></li>
                            <li><Link href="/services/consultation" className="text-gray-300 hover:text-white transition-colors">Project Consultation</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">Get In Touch</h4>
                        {/* Contact items kept as-is */}
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-blue-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-300 text-sm">
                            © 2024 Mukesh Sharma & Associates Construction. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
