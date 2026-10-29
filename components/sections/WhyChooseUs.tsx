"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Compass, Globe2, Scale, Sparkles, Building, Gem, Award } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-400" />,
      title: "Private Office Discretion",
      description:
        "Over 68% of our luxury transactions conclude off-market without public portal exposure, protecting the privacy and security of our high-profile principals.",
    },
    {
      icon: <Compass className="w-6 h-6 text-gold-400" />,
      title: "3D Spatial Digital Twins",
      description:
        "Every exceptional listing is augmented by 360-degree spatial elevations and precision architectural walkthroughs for remote global acquisition.",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-gold-400" />,
      title: "Global Wealth Syndicates",
      description:
        "Direct relationships with single-family offices, trust trustees, and private banking syndicates spanning London, Geneva, Dubai, and New York.",
    },
    {
      icon: <Scale className="w-6 h-6 text-gold-400" />,
      title: "Deterministic UK Legal Advisory",
      description:
        "Rigorous financial analysis, statutory HMRC Stamp Duty Land Tax (SDLT) modeling, and leasehold enfranchisement advisory backed by prime UK counsel.",
    },
  ];

  return (
    <section id="why-us" className="w-full py-24 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 mb-4 shadow-md">
            <Gem className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
              The Luxora Standard
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Discerning Clients Choose <span className="gold-text-gradient">{siteConfig.brandName}</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            We are not a traditional retail estate agency. We are a boutique private client advisory dedicated to prime British architecture and off-market asset curation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-black/60 border border-gold-400/25 w-fit mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {pillar.icon}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-3 group-hover:text-gold-200 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gold-400/80 font-medium">
                <span>Core Pillar 0{idx + 1}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
