"use client";

import React, { useState, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { propertiesData, filterProperties } from "@/data/properties";
import { Property, PropertyFilterState } from "@/types/property";

// Components
import { Navbar } from "@/components/navigation/Navbar";
import { HeroVideoSection } from "@/components/hero/HeroVideoSection";
import { SearchFilterBar } from "@/components/search/SearchFilterBar";
import { Rotating3DFrameHero } from "@/components/carousel3d/Rotating3DFrameHero";
import { FeaturedProperties } from "@/components/properties/FeaturedProperties";
import { Rotating3DCarousel } from "@/components/carousel3d/Rotating3DCarousel";
import { ExplorePropertiesGrid } from "@/components/properties/ExplorePropertiesGrid";
import { DevelopmentsSection } from "@/components/sections/DevelopmentsSection";
import { SellPropertyCTA } from "@/components/sections/SellPropertyCTA";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Footer } from "@/components/navigation/Footer";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";
import { SavedDrawer } from "@/components/saved/SavedDrawer";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function HomePage() {
  // Filter state
  const [filters, setFilters] = useState<PropertyFilterState>({
    listingType: "all",
    location: "all",
    category: "all",
    minPrice: 0,
    maxPrice: 30000000,
    bedrooms: "any",
    sortBy: "featured",
  });

  // Active selected property for detail modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Region quick filter
  const [activeRegion, setActiveRegion] = useState("all");

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return filterProperties(propertiesData, {
      ...filters,
      location: activeRegion !== "all" ? activeRegion : filters.location,
    });
  }, [filters, activeRegion]);

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    setFilters((prev) => ({
      ...prev,
      location: region,
    }));
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById("search-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSell = () => {
    const el = document.getElementById("sell-property");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090C] text-white selection:bg-gold-400/30">
      {/* Luxury Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Floating Navigation */}
      <Navbar onOpenEnquiry={handleScrollToSell} />

      <main className="relative">
        {/* 1. Full-screen cinematic video hero */}
        <HeroVideoSection
          onExploreClick={handleScrollToExplore}
          onSellClick={handleScrollToSell}
        />

        {/* 2. Premium property search panel */}
        <SearchFilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalResults={filteredProperties.length}
        />

        {/* 3. FRONT ROTATING 3D FRAME (USER SUPPLIED IMAGES, GLASS CARDS, IPHONE COPYWRITING) */}
        <Rotating3DFrameHero
          properties={propertiesData}
          onSelectProperty={setSelectedProperty}
        />

        {/* 4. Featured Properties — user uploaded images appear first */}
        <FeaturedProperties
          properties={propertiesData}
          onSelectProperty={setSelectedProperty}
        />

        {/* 5. Rotating 3D property frame / gallery */}
        <Rotating3DCarousel
          properties={propertiesData}
          onSelect={setSelectedProperty}
        />

        {/* 6. Explore Properties Across the UK (Filterable Grid) */}
        <ExplorePropertiesGrid
          properties={filteredProperties}
          onSelectProperty={setSelectedProperty}
          activeRegion={activeRegion}
          onRegionChange={handleRegionChange}
        />

        {/* 7. Luxury New Developments */}
        <DevelopmentsSection
          onEnquireDevelopment={() => handleScrollToSell()}
        />

        {/* 8. Sell Your Property CTA */}
        <SellPropertyCTA />

        {/* 9. Why Choose Us section */}
        <WhyChooseUs />

        {/* 10. Client testimonials */}
        <TestimonialsSection />

        {/* 11. Newsletter subscription */}
        <NewsletterSection />
      </main>

      {/* 12. Premium footer */}
      <Footer />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onSelectSimilar={setSelectedProperty}
        allProperties={propertiesData}
      />

      {/* Saved Properties / Shortlist Drawer */}
      <SavedDrawer
        allProperties={propertiesData}
        onSelectProperty={setSelectedProperty}
        onOpenEnquiry={handleScrollToSell}
      />
    </div>
  );
}
