"use client";

import React from "react";
import { testimonialsData } from "@/data/testimonials";
import { Quote, Sparkles, Star, ShieldCheck } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-gold-400/20 mb-4 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
              Discreet Client Testimonials
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Voices of Private <span className="gold-text-gradient">Trust</span>
          </h2>

          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
            Reflecting acquisitions and dispositions managed on behalf of family offices, institutional trusts, and private collectors.
          </p>

          {/* Sample content transparent disclosure */}
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-2">
            * Demonstrative client narratives preserving privacy of transaction principals
          </span>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-3xl glass-panel border border-gold-400/20 hover:border-gold-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-gold-400/40" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-300 italic font-light leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-black font-bold text-xs shrink-0 shadow-md">
                  {test.initials}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block truncate">
                    {test.clientType}
                  </span>
                  <span className="text-[10px] text-gold-400/90 block truncate">
                    {test.transactionType}
                  </span>
                  <span className="text-[10px] text-gray-500 block truncate">
                    {test.location} • {test.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
