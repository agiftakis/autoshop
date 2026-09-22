// src/app/(public)/_components/pricing-carousel.tsx
"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  CircleDot,
  Car,
  Cog,
  Wrench,
  Disc3,
  Gauge,
  Droplets,
  ShieldCheck,
  Snowflake,
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";

interface PriceItem {
  icon: React.ReactNode;
  title: string;
  price: string;
  note: string;
}

const PHONE_TEL = "tel:+19046479284";

// ============================================================
// TODO: EVERY PRICE HERE IS A PLACEHOLDER. Replace each "price"
// and "note" with the owner's real numbers before this goes live.
// ============================================================
const items: PriceItem[] = [
  { icon: <CircleDot size={28} />, title: "Used Tires", price: "from $35", note: "Inspected, mounted and balanced. Price depends on size." },
  { icon: <Car size={28} />, title: "New Tires", price: "Call for quote", note: "All major brands, all sizes. Commercial, mud, off-road and run-flat available." },
  { icon: <Cog size={28} />, title: "Mount & Balance", price: "from $20 / tire", note: "Includes new valve stem where needed." },
  { icon: <Wrench size={28} />, title: "Flat Repair", price: "from $20", note: "Plug or patch. Most repairs done in about 15 minutes." },
  { icon: <Disc3 size={28} />, title: "Rim Repair", price: "from $15", note: "Bent or leaking rims straightened and sealed." },
  { icon: <Gauge size={28} />, title: "Wheel Alignment", price: "from $79", note: "Front-end or four-wheel alignment." },
  { icon: <Droplets size={28} />, title: "Oil Change", price: "from $39", note: "Conventional. Synthetic available — ask for pricing." },
  { icon: <ShieldCheck size={28} />, title: "Brake Pads & Rotors", price: "from $149 / axle", note: "Parts and labor. Free brake inspection." },
  { icon: <Snowflake size={28} />, title: "A/C Service", price: "from $89", note: "Diagnosis, recharge and compressor work." },
  { icon: <Search size={28} />, title: "Check Engine Diagnostic", price: "Call for quote", note: "Suspension, overheating, engine replacement and more." },
];

const PricingCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.title} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                <div>
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-brand text-white mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="inline-block rounded-md bg-accent text-charcoal font-bold px-3 py-1 mb-3">
                    {item.price}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.note}</p>
                </div>
                <a href={PHONE_TEL} className="mt-5 inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors">
                  <Phone size={16} />
                  <span>Call for details</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={scrollPrev} aria-label="Previous price" className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 rounded-full p-2 bg-charcoal/80 hover:bg-charcoal text-white transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button onClick={scrollNext} aria-label="Next price" className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 rounded-full p-2 bg-charcoal/80 hover:bg-charcoal text-white transition-colors">
        <ChevronRight size={24} />
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        Prices are starting points and vary by vehicle and tire size. Call for an exact quote.
      </p>
    </div>
  );
};

export default PricingCarousel;