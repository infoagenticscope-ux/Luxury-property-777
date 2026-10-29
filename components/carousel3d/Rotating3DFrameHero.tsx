"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { formatGBP } from "@/lib/utils";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Rotate3d,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Layers,
  Zap,
} from "lucide-react";

interface Rotating3DFrameHeroProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const Rotating3DFrameHero: React.FC<Rotating3DFrameHeroProps> = ({
  properties,
  onSelectProperty,
}) => {
  // Select the 3 user-provided flagship properties
  const flagshipItems = properties.slice(0, 3);
  const itemCount = flagshipItems.length;
  const angleStep = 360 / itemCount; // 120 degrees each

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  // Responsive 3D depth translation (radius)
  const [radius, setRadius] = useState(360);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(230); // Mobile
      } else if (window.innerWidth < 1024) {
        setRadius(300); // Tablet
      } else {
        setRadius(380); // Desktop
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Smooth continuous 3D rotation loop
  useEffect(() => {
    if (!isAutoRotating || isHovered) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      // Gentle cinematic rotation pace (~2.8 degrees per second)
      setRotationAngle((prev) => (prev + delta * 0.026) % 360);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoRotating, isHovered]);

  const handlePrev = () => {
    setRotationAngle((prev) => prev - angleStep);
  };

  const handleNext = () => {
    setRotationAngle((prev) => prev + angleStep);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.touches[0].clientX - touchStartX;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 35) {
      if (touchDelta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTouchStartX(null);
    setTouchDelta(0);
  };

  // iPhone Keynote Style Copywriting Per Card
  const appleCopy = [
    {
      badge: "TITANIUM PRO • HELIPAD INCLUDED",
      punchline: "Monumental. In every dimension.",
      subtext: "Aerospace-grade cantilevered pavilions. Dual supercar forecourt. Built to disappear into alpine horizons.",
      pill: "A18 Pro Class Living",
    },
    {
      badge: "HORIZON PRO • ZERO COMPROMISES",
      punchline: "Cliffside. Precision engineered.",
      subtext: "Hand-poured stone meeting Atlantic tides. A heated infinity pool suspended over the edge.",
      pill: "Defying Gravity",
    },
    {
      badge: "SOLARIA PRO • NET-ZERO FOOTPRINT",
      punchline: "Pure power. Absolute sanctuary.",
      subtext: "Integrated solar glass matrix. 25-meter sky reflection pool. Boundless architectural presence.",
      pill: "100% Self-Sufficient",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#08090C] overflow-hidden border-b border-gold-400/20">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(8,9,12,0)_75%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Apple Style Keynote Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-gold-400/35 backdrop-blur-xl mb-4 shadow-xl">
            <Rotate3d className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-300 font-bold">
              Rotating 3D Architectural Frame
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-extrabold bg-gradient-to-r from-gold-400 to-gold-200 text-black">
              Pro
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4">
            Pro. <span className="gold-text-gradient">Beyond Extraordinary.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Monumental British estates captured in a continuous perspective 3D frame. Precision engineered glass, physical depth, and surgical architectural tolerances.
          </p>
        </div>

        {/* ============================================================== */}
        {/* ROTATING 3D PERSPECTIVE STAGE */}
        {/* ============================================================== */}
        <div
          className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Rotating 3D Ring */}
          <div
            className="relative w-[300px] sm:w-[380px] h-[440px] sm:h-[500px] preserve-3d"
            style={{
              transform: `rotateY(${-rotationAngle}deg)`,
              transition: isHovered || touchStartX !== null ? "none" : "transform 0.4s ease-out",
            }}
          >
            {flagshipItems.map((item, index) => {
              const cardAngle = index * angleStep;
              const copy = appleCopy[index] || appleCopy[0];

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProperty(item)}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  }}
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden glass-card border border-gold-400/40 cursor-pointer shadow-[0_25px_70px_rgba(0,0,0,0.9)] group transition-all duration-500 hover:border-gold-300 flex flex-col justify-between"
                >
                  {/* Top Edge Crystal Reflection Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 via-gold-300/90 to-transparent opacity-85 z-30 pointer-events-none" />

                  {/* Frosted Glass Highlight Glare Layer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-20"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(212, 175, 55, 0.15) 30%, transparent 70%)",
                    }}
                  />

                  {/* Primary High-Res Image Viewport */}
                  <div className="relative w-full h-[58%] overflow-hidden bg-black/60">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 300px, 380px"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    />

                    {/* Dark Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-black/40" />

                    {/* Apple Style Top Pill */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[9px] uppercase font-extrabold tracking-wider bg-black/75 text-gold-300 border border-gold-400/40 backdrop-blur-xl shadow-lg">
                        {copy.badge}
                      </span>
                      <span className="p-1.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-gold-300" />
                      </span>
                    </div>

                    {/* Bottom Image Location Tag */}
                    <div className="absolute bottom-3 left-3.5 z-10">
                      <span className="text-[11px] font-medium text-gray-200 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                        {item.location.city} • {item.location.postcodeArea}
                      </span>
                    </div>
                  </div>

                  {/* Apple Style Glass Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#0F1117]/90 via-[#0A0C12]/95 to-[#060709] border-t border-white/10">
                    <div>
                      {/* Apple Signature Punchline */}
                      <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold block mb-1">
                        {copy.punchline}
                      </span>

                      {/* Estate Title */}
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-gold-200 transition-colors truncate mb-1.5">
                        {item.title}
                      </h3>

                      {/* iPhone Keynote Subtext */}
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-light">
                        {copy.subtext}
                      </p>
                    </div>

                    {/* Pricing & Apple Style Action Pill */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">
                          From
                        </span>
                        <span className="font-cinzel text-lg sm:text-xl font-bold gold-text-gradient">
                          {formatGBP(item.priceGBP)}
                        </span>
                      </div>

                      <div className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs uppercase font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 group-hover:from-gold-200 group-hover:to-gold-300 shadow-lg transition-all transform group-hover:scale-105">
                        <span>Explore Pro</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Frame Interactive Controls */}
        <div className="flex items-center justify-center space-x-6 mt-6">
          <button
            onClick={handlePrev}
            className="p-3.5 rounded-full bg-black/70 hover:bg-gold-400 hover:text-black border border-gold-400/40 text-gold-300 transition-all shadow-xl transform hover:scale-110"
            aria-label="Previous 3D Angle"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-black/60 border border-gold-400/30 text-xs font-semibold text-gray-200 hover:text-gold-300 hover:border-gold-400 transition-all shadow-lg"
          >
            {isAutoRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-gold-400" />
                <span>Pause 3D Orbit</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-gold-400 fill-current" />
                <span>Resume 3D Orbit</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-3.5 rounded-full bg-black/70 hover:bg-gold-400 hover:text-black border border-gold-400/40 text-gold-300 transition-all shadow-xl transform hover:scale-110"
            aria-label="Next 3D Angle"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-500 mt-3 italic">
          Hover to freeze frame • Drag or swipe on mobile to rotate 3D perspective
        </p>
      </div>
    </section>
  );
};
