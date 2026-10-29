"use client";

import React from "react";
import Image from "next/image";
import { useSaved } from "@/context/SavedContext";
import { Property } from "@/types/property";
import { formatGBP } from "@/lib/utils";
import { X, Heart, Trash2, ShieldCheck, ArrowRight, Bed, Bath } from "lucide-react";

interface SavedDrawerProps {
  allProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenEnquiry: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  allProperties,
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const { savedIds, toggleSaved, isDrawerOpen, setIsDrawerOpen } = useSaved();

  if (!isDrawerOpen) return null;

  const savedProperties = allProperties.filter((p) => savedIds.includes(p.id));

  const totalPortfolioValue = savedProperties.reduce(
    (sum, p) => (p.listingType === "buy" ? sum + p.priceGBP : sum),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={() => setIsDrawerOpen(false)} />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md h-full bg-[#0A0C12] border-l border-gold-400/25 flex flex-col justify-between shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <Heart className="w-5 h-5 text-gold-400 fill-current" />
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  Curated Shortlist
                </h3>
                <span className="text-xs text-gray-400">
                  {savedProperties.length} Selected {savedProperties.length === 1 ? "Estate" : "Estates"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-gold-400 hover:text-black text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Portfolio Total Value */}
          {savedProperties.length > 0 && (
            <div className="mt-4 p-3.5 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">
                Combined Valuation
              </span>
              <span className="font-cinzel text-base font-bold gold-text-gradient">
                {formatGBP(totalPortfolioValue)}
              </span>
            </div>
          )}
        </div>

        {/* Property List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 my-2">
          {savedProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <Heart className="w-12 h-12 text-gold-400/40 mb-3" />
              <h4 className="font-cinzel text-base text-white font-semibold mb-1">
                Your Shortlist is Empty
              </h4>
              <p className="text-xs leading-relaxed max-w-xs">
                Click the heart icon on any prime residence or 3D elevation to save it to your confidential dossier.
              </p>
            </div>
          ) : (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  setIsDrawerOpen(false);
                  onSelectProperty(prop);
                }}
                className="group relative flex items-center space-x-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/30 cursor-pointer transition-all"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={prop.coverImage}
                    alt={prop.title}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gold-400 truncate block">
                    {prop.location.city} ({prop.location.postcodeArea})
                  </span>
                  <h4 className="font-cinzel text-xs font-bold text-white group-hover:text-gold-200 truncate">
                    {prop.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-[11px] text-gray-400 mt-1">
                    <span>{prop.specs.bedrooms} Beds</span>
                    <span>•</span>
                    <span>{prop.specs.bathrooms} Baths</span>
                  </div>
                  <span className="font-cinzel text-xs font-bold gold-text-gradient mt-1 block">
                    {formatGBP(prop.priceGBP)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaved(prop.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedProperties.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-xl flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enquire on Portfolio</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
