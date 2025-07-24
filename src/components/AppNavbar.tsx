"use client";

import {
    Navbar,
    NavBody,
    NavItems,
    NavbarLogo,
    MobileNav,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
    NavbarButton
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function AppNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "/contact" },
    ];
    return (
        <Navbar >
            {/* Desktop Nav */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className="ml-auto">
                    <NavbarButton href="/book-call">Book a Call</NavbarButton>
                </div>
            </NavBody>
            {/* Mobile Nav */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
                </MobileNavHeader>
                <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            className="block py-2 text-lg"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <NavbarButton href="/book-call" className="w-full mt-2">Book a Call</NavbarButton>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
} 