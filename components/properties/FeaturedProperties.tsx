"use client";

import React from "react";
import { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { Sparkles, Crown } from "lucide-react";

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onSelectProperty,
}) => {
  // Filter user-supplied & primary featured residences (excluding the 3 hero items to preserve original featured list)
  const featuredList = properties
    .filter(
      (p) =>
        !["lux-user-alpine", "lux-user-sunset", "lux-user-solaria"].includes(
          p.id
        ) &&
        (p.isUserSuppliedImage || p.isFeatured)
    )
    .slice(0, 6);

  return (
    <section id="featured-properties" className="w-full py-20 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 mb-3 shadow-md">
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                Client Exclusive Selection
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Featured Prime <span className="gold-text-gradient">Residences</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-gray-400 max-w-md font-light">
            Premier residential assets across London and England, showcasing monumental architectural pedigree and discreet private living.
          </p>
        </div>

        {/* Featured Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((property, idx) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              priority={idx < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
