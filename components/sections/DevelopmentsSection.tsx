"use client";

import React from "react";
import Image from "next/image";
import { developmentsData, Development } from "@/data/developments";
import { formatGBP } from "@/lib/utils";
import { Building2, Calendar, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface DevelopmentsSectionProps {
  onEnquireDevelopment?: (dev: Development) => void;
}

export const DevelopmentsSection: React.FC<DevelopmentsSectionProps> = ({
  onEnquireDevelopment,
}) => {
  return (
    <section id="developments" className="w-full py-24 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 mb-3 shadow-md">
              <Building2 className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                Off-Plan & Prime Architecture
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Luxury New <span className="gold-text-gradient">Developments</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-gray-400 max-w-md font-light">
            World-class architectural masterplans offering early investment tranches, concierge amenities, and high-specification residences.
          </p>
        </div>

        {/* Development Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {developmentsData.map((dev) => (
            <div
              key={dev.id}
              className="group rounded-3xl overflow-hidden glass-panel border border-gold-400/20 hover:border-gold-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/60">
                <Image
                  src={dev.image}
                  alt={dev.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-black/30" />

                <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gold-400 text-black shadow-md">
                    {dev.status}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] text-gray-300 border border-white/10">
                  <Calendar className="w-3 h-3 text-gold-400" />
                  <span>Est. {dev.completionDate}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs text-gold-300/80 font-medium block mb-1">
                    {dev.location}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-gold-200 transition-colors mb-2">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                    {dev.tagline}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">
                      Exclusive Amenities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dev.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-gray-300 border border-white/5"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                      From
                    </span>
                    <span className="font-cinzel text-xl font-bold gold-text-gradient">
                      {formatGBP(dev.startingPriceGBP)}
                    </span>
                  </div>

                  <button
                    onClick={() => onEnquireDevelopment?.(dev)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs uppercase font-semibold text-black bg-gradient-to-r from-gold-300 to-gold-400 hover:from-gold-200 hover:to-gold-300 shadow-md transition-all"
                  >
                    <span>Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
