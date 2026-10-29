"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { formatGBP } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Pause, Play, Compass, Eye } from "lucide-react";

interface Rotating3DCarouselProps {
  properties: Property[];
  onSelect: (property: Property) => void;
}

export const Rotating3DCarousel: React.FC<Rotating3DCarouselProps> = ({
  properties,
  onSelect,
}) => {
  // Restore original Turn 1 sequence: 4 user-supplied assets + 2 country estates
  // 1. Belgravia Crescent Residence (user-property-1.jpg)
  // 2. Wentworth Fairway Villa (user-property-2.jpg)
  // 3. Kensington Private Mews (user-property-3.jpg)
  // 4. Knightsbridge Garden Pavilion (user-property-4.jpg)
  // 5. Cotswolds Horizon Manor (mansion-sunset.png)
  // 6. Windermere Waterfront Estate (mansion-lakeside.png)
  const carouselItems = useMemo(() => {
    const originalList = properties.filter(
      (p) => !["lux-user-alpine", "lux-user-sunset", "lux-user-solaria"].includes(p.id)
    );
    return originalList.slice(0, 6);
  }, [properties]);

  const itemCount = carouselItems.length || 6;
  const angleStep = 360 / itemCount; // 60 degrees for 6 cards

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  // Responsive radius calculation matching the original geometry
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(260); // Mobile radius
      } else if (window.innerWidth < 1024) {
        setRadius(340); // Tablet radius
      } else {
        setRadius(420); // Desktop luxury radius
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Continuous smooth auto-rotation loop without modulo jumps
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
      setRotationAngle((prev) => prev + delta * 0.026);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoRotating, isHovered]);

  const handlePrev = useCallback(() => {
    setRotationAngle((prev) => Math.round(prev / angleStep) * angleStep - angleStep);
  }, [angleStep]);

  const handleNext = useCallback(() => {
    setRotationAngle((prev) => Math.round(prev / angleStep) * angleStep + angleStep);
  }, [angleStep]);

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - touchStartX;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 40) {
      if (touchDelta > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTouchStartX(null);
    setTouchDelta(0);
  };

  return (
    <section id="gallery-3d" className="relative w-full py-24 bg-[#08090C] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-gold-400/30 backdrop-blur-md mb-4 shadow-lg">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-300 font-semibold">
              Perspective 3D Architecture
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Curated 3D Property <span className="gold-text-gradient">Rotunda</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light">
            An immersive spatial presentation of our premier British estates. Interact with the ring to explore architectural elevations in continuous perspective depth.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 3D PERSPECTIVE CYLINDER CONTAINER */}
        {/* Perfectly centered at 50% 50% so all cards stay on the horizontal plane */}
        {/* ============================================================== */}
        <div
          className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center overflow-visible select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%", // Fixed: 50% 50% keeps cards level on the same horizon line
          }}
        >
          {/* Rotating Ring */}
          <div
            className="relative w-[280px] sm:w-[320px] h-[360px] sm:h-[420px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${-rotationAngle}deg)`,
              transition: isHovered || touchStartX !== null ? "none" : (isAutoRotating ? "none" : "transform 0.4s ease-out"),
            }}
          >
            {carouselItems.map((item, index) => {
              const cardAngle = index * angleStep;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden", // Fixed: hides reversed/mirrored back side of cards
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-gold-400/35 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)] group transition-colors duration-300 hover:border-gold-300"
                >
                  {/* Top Edge Crystal Reflection Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 via-gold-300/80 to-transparent opacity-80 z-30 pointer-events-none" />

                  {/* Frosted Glass Shimmer Overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-gold-400/10 z-20" />

                  {/* Property Image */}
                  <div className="relative w-full h-[62%] overflow-hidden bg-black/50">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="320px"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-black/30" />

                    {/* Top Pill */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider bg-black/70 text-gold-300 border border-gold-400/30 backdrop-blur-md">
                        {item.category}
                      </span>
                      {item.isUserSuppliedImage && (
                        <span className="px-2 py-0.5 rounded-full text-[8px] uppercase font-bold bg-gold-400 text-black">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info Details */}
                  <div className="p-4 flex flex-col justify-between h-[38%] bg-gradient-to-b from-[#0E1017] to-[#07080B]">
                    <div>
                      <span className="text-[10px] text-gold-400/90 font-medium truncate block">
                        {item.location.neighborhood}, {item.location.city}
                      </span>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-white group-hover:text-gold-200 transition-colors truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Asking</span>
                        <span className="font-cinzel text-base font-bold gold-text-gradient">
                          {formatGBP(item.priceGBP)}
                        </span>
                      </div>

                      <span className="p-1.5 rounded-lg bg-gold-400/10 text-gold-300 group-hover:bg-gold-400 group-hover:text-black transition-colors">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Interactive Controls (Below Ring) */}
        <div className="flex items-center justify-center space-x-6 mt-8">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="p-3.5 rounded-full bg-black/60 hover:bg-gold-400 hover:text-black border border-gold-400/30 text-gold-300 transition-all shadow-lg transform hover:scale-105"
            aria-label="Previous Property"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pause / Resume Auto-Rotation */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-black/40 border border-gold-400/20 text-xs text-gray-300 hover:text-gold-300 hover:border-gold-400 transition-all"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-gold-400" /> : <Play className="w-3.5 h-3.5 text-gold-400 fill-current" />}
            <span>{isAutoRotating ? "Pause 3D Spin" : "Resume 3D Spin"}</span>
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="p-3.5 rounded-full bg-black/60 hover:bg-gold-400 hover:text-black border border-gold-400/30 text-gold-300 transition-all shadow-lg transform hover:scale-105"
            aria-label="Next Property"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-500 mt-4 italic">
          Hover to freeze rotation • Drag or swipe on mobile to steer the 3D rotunda
        </p>
      </div>
    </section>
  );
};
