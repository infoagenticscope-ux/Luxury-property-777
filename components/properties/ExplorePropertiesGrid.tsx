"use client";

import React, { useState } from "react";
import { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { MapPin, Compass, SearchX } from "lucide-react";

interface ExplorePropertiesGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { id: "all", label: "All Portfolio" },
  { id: "London", label: "Prime London" },
  { id: "Surrey", label: "Surrey & Private Estates" },
  { id: "Cotswolds", label: "The Cotswolds" },
  { id: "Scotland", label: "Edinburgh & Scotland" },
  { id: "North West", label: "Manchester & North" },
  { id: "South West", label: "Sandbanks & Coast" },
];

export const ExplorePropertiesGrid: React.FC<ExplorePropertiesGridProps> = ({
  properties,
  onSelectProperty,
  activeRegion,
  onRegionChange,
}) => {
  return (
    <section id="explore-properties" className="w-full py-20 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-gold-400/20 mb-3 shadow-md">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                British Geographical Reach
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Explore Across the <span className="gold-text-gradient">United Kingdom</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-gray-400 max-w-md font-light">
            From Mayfair penthouses to secluded Cotswolds parklands and coastal waterfront sanctuaries.
          </p>
        </div>

        {/* Region Filter Navigation Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => onRegionChange(reg.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                activeRegion === reg.id
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        {properties.length === 0 ? (
          <div className="p-12 rounded-3xl glass-panel text-center max-w-lg mx-auto space-y-3">
            <SearchX className="w-12 h-12 text-gold-400/50 mx-auto" />
            <h3 className="font-cinzel text-lg font-bold text-white">
              No Properties Found
            </h3>
            <p className="text-xs text-gray-400">
              There are currently no residences matching this specific regional filter. Clear your criteria to view the full UK portfolio.
            </p>
            <button
              onClick={() => onRegionChange("all")}
              className="px-4 py-2 rounded-xl text-xs uppercase font-bold text-black bg-gold-400 hover:bg-gold-300 transition-colors"
            >
              View Full Portfolio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
