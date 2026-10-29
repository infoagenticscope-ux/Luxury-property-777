"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { formatGBP, formatNumber } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { Heart, Bed, Bath, Maximize2, MapPin, Eye, Compass, Sparkles } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  priority = false,
}) => {
  const { isSaved, toggleSaved } = useSaved();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic 3D tilt and mouse-tracking specular glass glare
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const saved = isSaved(property.id);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group relative flex flex-col rounded-3xl overflow-hidden glass-card cursor-pointer preserve-3d shadow-[0_15px_45px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_65px_rgba(212,175,55,0.25)] border border-gold-400/25 hover:border-gold-300 transition-all duration-500"
      onClick={() => onSelect(property)}
    >
      {/* 1. Dynamic Cursor-Tracking Specular Glass Glare Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.25), rgba(212, 175, 55, 0.15) 35%, transparent 75%)`
            : "none",
        }}
      />

      {/* 2. Top Edge Crystal Reflection Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 via-gold-300/80 to-transparent opacity-80 z-20 pointer-events-none" />

      {/* Image Container with Zoom & Ratio */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/40">
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Cinematic Gradient Overlays on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-black/30 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center space-x-2">
            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border shadow-lg ${
                property.status === "Exclusive"
                  ? "bg-gold-500/80 border-gold-300 text-black"
                  : property.status === "Under Offer"
                  ? "bg-amber-900/70 border-amber-500/40 text-amber-200"
                  : property.status === "To Let"
                  ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-200"
                  : "bg-black/60 border-gold-400/30 text-gold-300"
              }`}
            >
              {property.status}
            </span>

            {/* User-supplied asset identifier */}
            {property.isUserSuppliedImage && (
              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-black/60 border border-gold-400/40 text-gold-200 backdrop-blur-md">
                <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                <span>Featured Collection</span>
              </span>
            )}
          </div>

          {/* Interactive Heart / Favourite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaved(property.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-gold-400 text-white transition-all shadow-md transform hover:scale-110 nav-glass-shine"
            title={saved ? "Remove from Shortlist" : "Save to Shortlist"}
            aria-label="Save Property"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white group-hover:text-gold-300"
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Overlay: Category & 360 Tour badge */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-[11px] font-medium tracking-wide uppercase text-gray-200 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/15 shadow-md">
            {property.category}
          </span>

          {property.has360Tour && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] uppercase font-semibold tracking-wider bg-gold-400/20 text-gold-300 backdrop-blur-md border border-gold-400/30 shadow-md">
              <Compass className="w-3 h-3 text-gold-400 animate-spin-slow" />
              <span>360° Virtual Tour</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-gradient-to-b from-transparent via-[#0A0C12]/80 to-black/90 relative z-10">
        <div>
          {/* Location Line */}
          <div className="flex items-center space-x-1.5 text-xs text-gold-300/90 mb-2">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">
              {property.location.neighborhood}, {property.location.city} ({property.location.postcodeArea})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-gold-200 transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4 font-light">
            {property.tagline}
          </p>
        </div>

        <div>
          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs text-gray-300 mb-4 bg-white/[0.02] rounded-xl px-2">
            <div className="flex items-center space-x-1.5">
              <Bed className="w-4 h-4 text-gold-400" />
              <span>{property.specs.bedrooms} Beds</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="w-4 h-4 text-gold-400" />
              <span>{property.specs.bathrooms} Baths</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
              <span>{formatNumber(property.specs.sqFt)} sq ft</span>
            </div>
          </div>

          {/* Pricing & CTA View Action */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400">
                {property.listingType === "rent" ? "Asking Rent" : "Asking Price"}
              </span>
              <span className="font-cinzel text-xl sm:text-2xl font-bold gold-text-gradient">
                {formatGBP(property.priceGBP)}
                {property.rentalFrequency && (
                  <span className="text-xs text-gray-400 font-sans font-normal ml-1">
                    /{property.rentalFrequency}
                  </span>
                )}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(property);
              }}
              className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-gold-200 bg-white/10 hover:bg-gold-400 hover:text-black border border-gold-400/40 hover:border-gold-400 transition-all duration-300 group/btn shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] nav-glass-shine"
            >
              <span>View</span>
              <Eye className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
