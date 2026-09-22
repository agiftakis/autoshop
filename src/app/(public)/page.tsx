// src/app/(public)/page.tsx
import React from "react";
import { MapPin, Phone, Navigation, CircleDot, Disc3, Gauge, ShieldCheck, Snowflake, Droplets, Wrench, Truck, Search } from "lucide-react";
import ImageCarousel from "./_components/image-carousel";
import PricingCarousel from "./_components/pricing-carousel";
import TestimonialCarousel from "./_components/testimonial-carousel";
import SalesNotification from "@/components/sales-notification";

const PHONE_DISPLAY = "(904) 647-9284";
const PHONE_TEL = "tel:+19046479284";
const ADDRESS_LINE_1 = "7533 Atlantic Blvd";
const ADDRESS_LINE_2 = "Jacksonville, FL 32211";
const MAP_EMBED = "https://www.google.com/maps?q=7533+Atlantic+Blvd,+Jacksonville,+FL+32211&output=embed";
const MAP_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=7533+Atlantic+Blvd+Jacksonville+FL+32211";

const services = [
  { icon: <CircleDot size={24} className="text-brand" />, title: "New & Used Tires", description: "All sizes and brands, plus inspected used tires that save you real money. Commercial, mud, off-road and run-flat available." },
  { icon: <Disc3 size={24} className="text-brand" />, title: "Rims & Custom Wheels", description: "Rim repair for bent or leaking wheels, and custom wheel-and-tire packages fitted right the first time." },
  { icon: <Wrench size={24} className="text-brand" />, title: "Flat Repair & Mount/Balance", description: "Plugs, patches, mounting and balancing — most flats fixed in about 15 minutes." },
  { icon: <Gauge size={24} className="text-brand" />, title: "Wheel Alignment", description: "Front-end and four-wheel alignment to stop uneven tire wear and pulling." },
  { icon: <ShieldCheck size={24} className="text-brand" />, title: "Brakes", description: "Pads, rotors and full brake repair, with a free brake inspection so you know what you actually need." },
  { icon: <Snowflake size={24} className="text-brand" />, title: "A/C Service", description: "Diagnosis, recharge and compressor replacement to get you cold air back fast." },
  { icon: <Droplets size={24} className="text-brand" />, title: "Oil Change", description: "Conventional and synthetic oil changes done while you wait." },
  { icon: <Search size={24} className="text-brand" />, title: "Diagnostics & Repair", description: "Check-engine diagnostics, suspension, overheating, starters and engine work by mechanics who fix the real problem." },
  { icon: <Truck size={24} className="text-brand" />, title: "Trucks & Commercial", description: "Commercial tires, safety inspections and repairs for work trucks and fleets." },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

function Homepage() {
  return (
    <div>
      <ImageCarousel />
      <SalesNotification />

      {/* SERVICES */}
      <section id="services" className="bg-gray-50 py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <SectionTitle title="What We Do" subtitle="Tires, rims and honest auto repair — the same crew, the same fair prices, year after year." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <SectionTitle title="Pricing Guide" subtitle="Straight answers on what things cost. No surprises, no upsell." />
          <PricingCarousel />
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-gray-50 py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <SectionTitle title="What Jacksonville Says" subtitle="4.5 stars across 200+ Google reviews. Here's what customers write." />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionTitle title="About Atlantic Tires, Rims & Auto Repair" subtitle="A neighborhood shop on Atlantic Blvd, not a chain." />
          <p className="text-gray-700 mb-4">
            Isaac and his crew have been keeping Jacksonville rolling for years from the same lot on Atlantic Blvd. Customers come back
            because the faces don't change, the prices are discussed up front, and the work gets done right — whether it's a $15 rim fix, a
            set of used tires, or an A/C compressor.
          </p>
          <p className="text-gray-700">
            Walk in, call ahead, or pull up with a flat. If we can fix it while you wait, we will.
          </p>
        </div>
      </section>

      {/* FIND US */}
      <section id="contact" className="bg-charcoal text-gray-200 py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Find Us</h2>
            <p className="mt-3 text-gray-300">Right on Atlantic Blvd. Look for the red sign.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 text-lg">
              <p className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-accent flex-shrink-0" />
                <span>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span>
              </p>
              <p className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                <a href={PHONE_TEL} className="hover:text-accent transition-colors">{PHONE_DISPLAY}</a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 rounded-md bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-charcoal font-bold px-6 py-3 hover:bg-gray-200 transition-colors">
                  <Navigation className="h-5 w-5" />
                  <span>Get Directions</span>
                </a>
              </div>
              <p className="text-sm text-gray-400 pt-2">Hours are listed at the bottom of the page.</p>
            </div>
            <div className="w-full aspect-square md:aspect-auto md:h-[380px] rounded-lg overflow-hidden shadow-lg">
              <iframe src={MAP_EMBED} width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade" title="Map to Atlantic Tires, Rims & Auto Repair"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;