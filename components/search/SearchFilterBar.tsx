"use client";

import React, { useState } from "react";
import { PropertyFilterState, ListingType } from "@/types/property";
import { Search, SlidersHorizontal, RotateCcw, MapPin, Home, Bed, PoundSterling, ArrowUpDown } from "lucide-react";

interface SearchFilterBarProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  totalResults: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  totalResults,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleListingTypeChange = (type: ListingType | "all") => {
    onFilterChange({ ...filters, listingType: type });
  };

  const handleReset = () => {
    setSearchQuery("");
    onFilterChange({
      listingType: "all",
      location: "all",
      category: "all",
      minPrice: 0,
      maxPrice: 30000000,
      bedrooms: "any",
      sortBy: "featured",
    });
  };

  return (
    <div id="search-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
      <div className="relative glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-gold-400/30 overflow-hidden">
        {/* Top Edge Specular Crystal Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 via-gold-300/80 to-transparent pointer-events-none" />

        {/* Top Tab Bar: Buy vs Rent vs All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="inline-flex p-1 rounded-xl bg-black/60 border border-gold-400/20">
            <button
              onClick={() => handleListingTypeChange("all")}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all nav-glass-shine ${
                filters.listingType === "all"
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Portfolio
            </button>
            <button
              onClick={() => handleListingTypeChange("buy")}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all nav-glass-shine ${
                filters.listingType === "buy"
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Buy (For Sale)
            </button>
            <button
              onClick={() => handleListingTypeChange("rent")}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all nav-glass-shine ${
                filters.listingType === "rent"
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Rent (To Let)
            </button>
          </div>

          {/* Result Count & Reset Button */}
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <span className="px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 font-medium">
              {totalResults} {totalResults === 1 ? "Property Available" : "Properties Available"}
            </span>

            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 text-gray-400 hover:text-gold-300 transition-colors py-1 px-2"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Primary Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {/* Location Selector */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>UK Location / Region</span>
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0e1017] text-white">All UK Regions</option>
              <option value="London" className="bg-[#0e1017] text-white">London (Mayfair, Belgravia, Chelsea)</option>
              <option value="Surrey" className="bg-[#0e1017] text-white">Surrey (Wentworth, Oxshott)</option>
              <option value="Cotswolds" className="bg-[#0e1017] text-white">The Cotswolds & Oxfordshire</option>
              <option value="Scotland" className="bg-[#0e1017] text-white">Scotland (Edinburgh New Town)</option>
              <option value="North West" className="bg-[#0e1017] text-white">North West (Manchester Sky)</option>
              <option value="Midlands" className="bg-[#0e1017] text-white">Midlands (Birmingham Edgbaston)</option>
              <option value="South West" className="bg-[#0e1017] text-white">South West (Sandbanks & Lakes)</option>
            </select>
          </div>

          {/* Property Category */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium flex items-center space-x-1.5">
              <Home className="w-3.5 h-3.5 text-gold-400" />
              <span>Property Category</span>
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0e1017] text-white">All Categories</option>
              <option value="Detached Estate" className="bg-[#0e1017] text-white">Detached Private Estates</option>
              <option value="Modern Villa" className="bg-[#0e1017] text-white">Contemporary Modern Villas</option>
              <option value="Penthouse" className="bg-[#0e1017] text-white">Luxury Duplex Penthouses</option>
              <option value="Georgian Townhouse" className="bg-[#0e1017] text-white">Historic Georgian Townhouses</option>
              <option value="Countryside Manor" className="bg-[#0e1017] text-white">Countryside Manors</option>
              <option value="Waterfront Residence" className="bg-[#0e1017] text-white">Waterfront & Coastal</option>
              <option value="Architectural New Build" className="bg-[#0e1017] text-white">Architectural New Builds</option>
              <option value="Luxury Apartment" className="bg-[#0e1017] text-white">Lateral Prime Apartments</option>
            </select>
          </div>

          {/* Bedrooms Selector */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium flex items-center space-x-1.5">
              <Bed className="w-3.5 h-3.5 text-gold-400" />
              <span>Bedrooms</span>
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  bedrooms: e.target.value === "any" ? "any" : Number(e.target.value),
                })
              }
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm appearance-none cursor-pointer"
            >
              <option value="any" className="bg-[#0e1017] text-white">Any Bedrooms</option>
              <option value="3" className="bg-[#0e1017] text-white">3+ Bedrooms</option>
              <option value="4" className="bg-[#0e1017] text-white">4+ Bedrooms</option>
              <option value="5" className="bg-[#0e1017] text-white">5+ Bedrooms</option>
              <option value="6" className="bg-[#0e1017] text-white">6+ Bedrooms</option>
              <option value="7" className="bg-[#0e1017] text-white">7+ Bedrooms</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium flex items-center space-x-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
              <span>Sort By</span>
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as PropertyFilterState["sortBy"],
                })
              }
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm appearance-none cursor-pointer"
            >
              <option value="featured" className="bg-[#0e1017] text-white">Curated Featured First</option>
              <option value="price-desc" className="bg-[#0e1017] text-white">Price: High to Low</option>
              <option value="price-asc" className="bg-[#0e1017] text-white">Price: Low to High</option>
              <option value="bedrooms" className="bg-[#0e1017] text-white">Most Bedrooms</option>
              <option value="newest" className="bg-[#0e1017] text-white">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle & Drawer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="inline-flex items-center space-x-2 text-xs font-medium text-gold-300 hover:text-gold-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isAdvancedOpen ? "Hide Price Range" : "Refine Price Range & Budget"}</span>
          </button>

          <span className="text-[11px] text-gray-500 italic">
            All prices quoted in British Pounds Sterling (£ GBP)
          </span>
        </div>

        {/* Expandable Price Range Filter */}
        {isAdvancedOpen && (
          <div className="mt-4 p-4 rounded-xl bg-black/40 border border-gold-400/15 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="text-[11px] text-gray-300 uppercase tracking-wider mb-1 block">
                Minimum Price: £{(filters.minPrice / 1000000).toFixed(1)}M
              </label>
              <input
                type="range"
                min="0"
                max="25000000"
                step="500000"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-300 uppercase tracking-wider mb-1 block">
                Maximum Price: £{(filters.maxPrice / 1000000).toFixed(1)}M
              </label>
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="500000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
