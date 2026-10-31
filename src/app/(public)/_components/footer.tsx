// src/app/(public)/_components/footer.tsx
import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Wrench } from "lucide-react";

const PHONE_DISPLAY = "(904) 647-9284";
const PHONE_TEL = "tel:+19046479284";

// Confirmed 2026-10-30: Monday to Saturday 8:00 AM – 6:30 PM, Sunday closed.
const hours = [
  { day: "Monday", time: "8:00 AM – 6:30 PM" },
  { day: "Tuesday", time: "8:00 AM – 6:30 PM" },
  { day: "Wednesday", time: "8:00 AM – 6:30 PM" },
  { day: "Thursday", time: "8:00 AM – 6:30 PM" },
  { day: "Friday", time: "8:00 AM – 6:30 PM" },
  { day: "Saturday", time: "8:00 AM – 6:30 PM" },
  { day: "Sunday", time: "Closed" },
];

// Every link starts with "/" so it works from any page (including the /discount pages),
// not only from the home page.
const quickLinks = [
  { name: "Services", href: "/#services" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Reviews", href: "/#reviews" },
  { name: "About Us", href: "/#about" },
  { name: "Find Us", href: "/#contact" },
];

function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                <Wrench className="h-6 w-6" />
              </span>
              <div className="flex flex-col -space-y-1">
                <span className="font-bold text-lg text-white tracking-wide">ATLANTIC TIRES, RIMS</span>
                <span className="text-xs text-gray-400 tracking-widest">&amp; AUTO REPAIR</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-center md:text-left text-gray-400">
              New and used tires, rims, brakes, A/C, oil changes and honest auto
              repair on Atlantic Blvd. Fair prices, fast turnaround, no upsell.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-accent transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock size={18} />
              <span className="leading-none">Hours</span>
            </h3>
            <ul className="space-y-1 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-gray-300">{h.day}</span>
                  <span className="text-gray-100">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Find Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="leading-relaxed">7533 Atlantic Blvd<br />Jacksonville, FL 32211</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <a href={PHONE_TEL} className="hover:text-accent transition-colors duration-300">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500 space-y-1">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Atlantic Tires, Rims &amp; Auto Repair. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600">Site by PeachTree Apps</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;