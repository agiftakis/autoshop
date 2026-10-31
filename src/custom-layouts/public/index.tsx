// src/custom-layouts/public/index.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Wrench, Phone } from "lucide-react";
import Footer from "@/app/(public)/_components/footer";

const PHONE_DISPLAY = "(904) 647-9284";
const PHONE_TEL = "tel:+19046479284";

// Every link starts with "/" so it works from any page (including the /discount pages).
// "/#services" means: go to the home page, then scroll down to the Services section.
const navLinks = [
  { name: "Home", href: "/#top" },
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Reviews", href: "/#reviews" },
  { name: "About", href: "/#about" },
  { name: "Find Us", href: "/#contact" },
];

function Wordmark() {
  return (
    <Link href="/#top" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
        <Wrench className="h-6 w-6" />
      </span>
      <span className="flex flex-col -space-y-1">
        <span className="font-bold text-lg md:text-xl text-white tracking-wide">ATLANTIC TIRES, RIMS</span>
        <span className="text-xs text-gray-300 tracking-widest">&amp; AUTO REPAIR</span>
      </span>
    </Link>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-charcoal shadow-md">
        <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-6">
          <Wordmark />

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-200 hover:text-accent transition-colors duration-300 font-semibold">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop call button */}
          <a href={PHONE_TEL} className="hidden md:inline-flex items-center gap-2 rounded-md bg-brand hover:bg-brand-dark text-white font-bold px-4 py-2 transition-colors duration-300">
            <Phone className="h-4 w-4" />
            <span className="leading-none">Call {PHONE_DISPLAY}</span>
          </a>

          {/* Mobile: call icon + hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <a href={PHONE_TEL} aria-label="Call the shop" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
              <Phone className="h-5 w-5" />
            </a>
            <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal flex flex-col md:hidden">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-700">
            <span className="block" onClick={() => setIsMenuOpen(false)}>
              <Wordmark />
            </span>
            <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="h-7 w-7 text-white" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl text-gray-100 hover:text-accent transition-colors duration-300 font-semibold">
                {link.name}
              </Link>
            ))}
            <a href={PHONE_TEL} onClick={() => setIsMenuOpen(false)} className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand text-white font-bold px-6 py-3 text-lg">
              <Phone className="h-5 w-5" />
              <span className="leading-none">Call {PHONE_DISPLAY}</span>
            </a>
          </nav>
        </div>
      )}

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}

export default PublicLayout;