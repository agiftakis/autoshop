// src/app/(public)/_components/image-carousel.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const PHONE_TEL = "tel:+19046479284";

// Swap the four files in public/images/ for the shop's photos, keeping these names.
const slides: Slide[] = [
  {
    src: "/images/main1.png",
    alt: "Rows of new and used tires at Atlantic Tires, Rims & Auto Repair",
    title: "New & Used Tires",
    subtitle: "Quality tires at prices that beat the big chains — mounted and balanced while you wait.",
  },
  {
    src: "/images/main2.png",
    alt: "Custom rims and wheels on display",
    title: "Rims & Custom Wheels",
    subtitle: "Rim repair, custom wheel-and-tire packages, fitted right the first time.",
  },
  {
    src: "/images/main3.png",
    alt: "Mechanic working on a car's brakes",
    title: "Brakes, A/C & Alignment",
    subtitle: "Full auto repair from the same crew that's been here for years — fair prices, no upsell.",
  },
  {
    src: "/images/main4.png",
    alt: "Car leaving the shop with fresh tires",
    title: "In and Out Fast",
    subtitle: "Flat repairs in minutes. Call ahead and we'll have you back on Atlantic Blvd in no time.",
  },
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  };

  // Auto-advance every 5 seconds; the timer restarts whenever the slide changes.
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  const slide = slides[currentIndex];

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] group">
      <Image
        key={slide.src}
        src={slide.src}
        alt={slide.alt}
        fill
        style={{ objectFit: "cover" }}
        quality={90}
        priority={true}
        className="transition-opacity duration-700 ease-in-out"
      />

      {/* Dark overlay with headline and buttons */}
      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
        <div className="text-center text-white p-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{slide.title}</h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-lg">{slide.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 rounded-md bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 text-lg transition-colors duration-300">
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
            <Link href="#pricing" className="inline-flex items-center justify-center rounded-md bg-white/90 hover:bg-white text-charcoal font-bold px-6 py-3 text-lg transition-colors duration-300">
              See Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows — always visible; slightly brighter on hover for desktop */}
      <button onClick={prevSlide} aria-label="Previous slide" className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 rounded-full p-2 bg-black/30 hover:bg-black/50 text-white cursor-pointer transition-colors">
        <ChevronLeft size={30} />
      </button>
      <button onClick={nextSlide} aria-label="Next slide" className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 rounded-full p-2 bg-black/30 hover:bg-black/50 text-white cursor-pointer transition-colors">
        <ChevronRight size={30} />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === currentIndex ? "bg-accent" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;