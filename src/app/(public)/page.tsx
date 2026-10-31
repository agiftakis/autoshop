// src/app/(public)/page.tsx
import React from "react";
import Link from "next/link";
import {
  MapPin, Phone, Navigation, CircleDot, Disc3, Gauge, ShieldCheck, Snowflake, Droplets, Wrench, Truck, Search,
  Wind, Leaf, Cog, Settings, Waves, ArrowDownUp, Power, Key, Eye, BadgePercent,
} from "lucide-react";
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

// 18 tiles: 6 even rows of 3 on desktop, 9 rows of 2 on tablets, 1 column on phones.
const services = [
  { icon: <CircleDot size={24} className="text-brand" />, title: "New & Used Tires", description: "All sizes and brands, plus inspected used tires that save you real money. Commercial, mud, off-road and run-flat available." },
  { icon: <Disc3 size={24} className="text-brand" />, title: "Rims & Custom Wheels", description: "Rim repair for bent or leaking wheels, and custom wheel-and-tire packages fitted right the first time." },
  { icon: <Wrench size={24} className="text-brand" />, title: "Flat Repair & Mount/Balance", description: "Plugs, patches, mounting and balancing — most flats fixed in about 15 minutes." },
  { icon: <Gauge size={24} className="text-brand" />, title: "Wheel Alignment", description: "Front-end and four-wheel alignment to stop uneven tire wear and pulling." },
  { icon: <ShieldCheck size={24} className="text-brand" />, title: "Brakes", description: "Pads, rotors and full brake repair, with a free brake inspection so you know what you actually need." },
  { icon: <Waves size={24} className="text-brand" />, title: "Suspension Repair", description: "Ball joints, tie rods and control arms replaced so your car drives straight and handles bumps the way it should." },
  { icon: <ArrowDownUp size={24} className="text-brand" />, title: "Struts & Shocks", description: "Worn struts and shocks replaced to stop the bouncing, the nose-dive when you brake, and the uneven tire wear they cause." },
  { icon: <Power size={24} className="text-brand" />, title: "Steering & Ignition", description: "Steering wheel replacement and repair, ignition lock cylinders and ignition switches." },
  { icon: <Cog size={24} className="text-brand" />, title: "Engine Repair", description: "All engine repairs, from small fixes to major work. Whatever's wrong under the hood, we've got you covered." },
  { icon: <Settings size={24} className="text-brand" />, title: "Transmission", description: "Transmission diagnosis and repair for slipping, rough shifting and other gear problems." },
  { icon: <Wind size={24} className="text-brand" />, title: "Muffler & Exhaust", description: "Mufflers, exhaust pipes and exhaust leaks repaired or replaced to quiet things down and keep fumes out of the cabin." },
  { icon: <Leaf size={24} className="text-brand" />, title: "Catalytic Converters", description: "Failing or stolen catalytic converters replaced to clear emissions-related check-engine lights and get you running right." },
  { icon: <Snowflake size={24} className="text-brand" />, title: "A/C Service", description: "Diagnosis, recharge and compressor replacement to get you cold air back fast." },
  { icon: <Droplets size={24} className="text-brand" />, title: "Oil Change", description: "Conventional and synthetic oil changes done while you wait." },
  { icon: <Search size={24} className="text-brand" />, title: "Diagnostics & Repair", description: "Check-engine diagnostics, overheating and starters, by mechanics who find and fix the real problem." },
  { icon: <Key size={24} className="text-brand" />, title: "Keys & Key Programming", description: "Lost or broken car keys replaced, and new keys programmed to your vehicle." },
  { icon: <Eye size={24} className="text-brand" />, title: "Windshield Repair & Replacement", description: "Chip and crack repair, plus full windshield replacement when the damage is too big to fix." },
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
    <div className="w-full">
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
                <span className="leading-relaxed">{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span>
              </p>
              <p className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                <a href={PHONE_TEL} className="hover:text-accent transition-colors">{PHONE_DISPLAY}</a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 rounded-md bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="leading-none">Call Now</span>
                </a>
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-charcoal font-bold px-6 py-3 hover:bg-gray-200 transition-colors">
                  <Navigation className="h-5 w-5" />
                  <span className="leading-none">Get Directions</span>
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

      {/* NEW-CUSTOMER DISCOUNT BANNER: sits between "Find Us" and the footer */}
      <section id="discount" className="bg-brand text-white py-14 scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <BadgePercent className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">First Time at Atlantic Tires?</h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Fill in a quick form, get your coupon on screen, and show it at the counter to save 10%.
          </p>
          <Link href="/discount" className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-white hover:bg-gray-100 text-charcoal font-bold px-8 py-4 text-lg shadow-lg transition-colors duration-300">
            <BadgePercent className="h-5 w-5 text-brand" />
            <span className="leading-tight">New customer? Get your 10% discount now</span>
          </Link>
          <p className="mt-5 text-xs text-white/80">
            10% off parts on repairs under $1,000. Labor is not discounted. One per new customer. Valid until the date and time shown on your coupon.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Homepage;