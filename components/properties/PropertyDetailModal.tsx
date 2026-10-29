"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Property, EnquirySubmission } from "@/types/property";
import { formatGBP, formatNumber } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { Interactive360Viewer } from "./Interactive360Viewer";
import { StampDutyCalculator } from "./StampDutyCalculator";
import {
  X,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Send,
  PoundSterling,
  Sparkles,
  Award,
} from "lucide-react";

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onSelectSimilar?: (property: Property) => void;
  allProperties?: Property[];
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onSelectSimilar,
  allProperties = [],
}) => {
  const { isSaved, toggleSaved } = useSaved();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "360tour" | "financials">("overview");
  const [copiedLink, setCopiedLink] = useState(false);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState<Partial<EnquirySubmission>>({
    fullName: "",
    email: "",
    phone: "",
    buyerType: "Cash Buyer",
    preferredViewingDate: "",
    message: "",
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return null;

  const saved = isSaved(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate verified booking submission and save to localStorage
    setTimeout(() => {
      try {
        const newEnquiry: EnquirySubmission = {
          id: `enq-${Date.now()}`,
          propertyId: property.id,
          propertyTitle: property.title,
          fullName: enquiryForm.fullName || "Private Client",
          email: enquiryForm.email || "",
          phone: enquiryForm.phone || "",
          buyerType: (enquiryForm.buyerType as any) || "Cash Buyer",
          preferredViewingDate: enquiryForm.preferredViewingDate || new Date().toISOString(),
          message: enquiryForm.message || "Requested private viewing arrangement.",
          timestamp: new Date().toISOString(),
          status: "Pending",
        };

        const existing = JSON.parse(localStorage.getItem("luxora_enquiries") || "[]");
        existing.unshift(newEnquiry);
        localStorage.setItem("luxora_enquiries", JSON.stringify(existing));
      } catch (err) {
        console.warn("Could not write enquiry to localStorage", err);
      }

      setIsSubmitting(false);
      setEnquirySubmitted(true);
    }, 800);
  };

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.location.region === property.location.region))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Card Body */}
      <div className="relative w-full max-w-5xl my-auto rounded-3xl glass-panel border border-gold-400/35 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[92vh] flex flex-col">
        {/* Sticky Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090A0F]/90 backdrop-blur-md z-20">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] gold-text-gradient font-bold">
              Private Specification Dossier
            </span>
            {property.isUserSuppliedImage && (
              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
                <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                <span>Featured Property</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300 border border-white/10 transition-colors"
              title="Share Dossier"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] text-gold-300 animate-fade-in">Link Copied</span>
            )}

            {/* Save Heart Button */}
            <button
              onClick={() => toggleSaved(property.id)}
              className="p-2 rounded-full bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300 border border-white/10 transition-colors"
              title={saved ? "Remove Shortlist" : "Save Shortlist"}
            >
              <Heart
                className={`w-4 h-4 ${
                  saved ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"
                }`}
              />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-gold-400 hover:text-black text-gray-200 transition-all border border-white/20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* ============================================================== */}
          {/* 1. MEDIA GALLERY & 360 TOUR TABS */}
          {/* ============================================================== */}
          <div className="space-y-4">
            {/* Tab Navigators */}
            <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                High-Res Gallery
              </button>

              {property.has360Tour && (
                <button
                  onClick={() => setActiveTab("360tour")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider inline-flex items-center space-x-1.5 transition-all ${
                    activeTab === "360tour"
                      ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-gold-400" />
                  <span>360° Interactive Tour</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("financials")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === "financials"
                    ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Stamp Duty & Mortgage
              </button>
            </div>

            {/* TAB CONTENT: GALLERY */}
            {activeTab === "overview" && (
              <div className="space-y-3">
                {/* Main Active Large Photo */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-gold-400/20 shadow-xl">
                  <Image
                    src={property.galleryImages[activeImageIndex] || property.coverImage}
                    alt={property.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white pointer-events-none">
                    <span className="bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
                      {property.category} • {property.status}
                    </span>
                    <span className="bg-black/70 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
                      Image {activeImageIndex + 1} of {property.galleryImages.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Scroller */}
                {property.galleryImages.length > 1 && (
                  <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    {property.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-[#D4AF37] scale-105 shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 360 TOUR */}
            {activeTab === "360tour" && (
              <div className="animate-fade-in">
                <Interactive360Viewer propertyTitle={`${property.title} - Interactive 360° Walkthrough`} />
              </div>
            )}

            {/* TAB CONTENT: FINANCIALS */}
            {activeTab === "financials" && (
              <div className="animate-fade-in">
                <StampDutyCalculator initialPrice={property.priceGBP} />
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* 2. PROPERTY HEADLINE, ASKING PRICE & SPECIFICATIONS */}
          {/* ============================================================== */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-gold-300 text-xs mb-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>
                  {property.location.addressLine && `${property.location.addressLine}, `}
                  {property.location.neighborhood}, {property.location.city} ({property.location.postcodeArea})
                </span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {property.title}
              </h2>
              <p className="text-sm text-gray-400 font-light max-w-2xl">
                {property.tagline}
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[11px] uppercase tracking-widest text-gray-400">
                {property.listingType === "rent" ? "Asking Rent" : "Asking Price"}
              </span>
              <span className="font-cinzel text-3xl sm:text-4xl font-bold gold-text-gradient">
                {formatGBP(property.priceGBP)}
                {property.rentalFrequency && (
                  <span className="text-sm text-gray-400 font-sans font-normal ml-1">
                    /{property.rentalFrequency}
                  </span>
                )}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Tenure: {property.specs.tenure}
              </span>
            </div>
          </div>

          {/* Specs Ribbon Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <Bed className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">{property.specs.bedrooms}</span>
              <span className="text-[10px] text-gray-400 uppercase">Bedrooms</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <Bath className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">{property.specs.bathrooms}</span>
              <span className="text-[10px] text-gray-400 uppercase">Bathrooms</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <Maximize2 className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">{formatNumber(property.specs.sqFt)}</span>
              <span className="text-[10px] text-gray-400 uppercase">Sq Ft Internal</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <Building className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">EPC {property.specs.epcRating}</span>
              <span className="text-[10px] text-gray-400 uppercase">Energy Rating</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <Award className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">Band {property.specs.councilTaxBand}</span>
              <span className="text-[10px] text-gray-400 uppercase">Council Tax</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center text-center">
              <ShieldCheck className="w-5 h-5 text-gold-400 mb-1" />
              <span className="font-semibold text-white text-sm">
                {property.specs.parkingSpaces ? `${property.specs.parkingSpaces} Cars` : "Allocated"}
              </span>
              <span className="text-[10px] text-gray-400 uppercase">Secure Parking</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. EDITORIAL NARRATIVE & HIGHLIGHTS */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white mb-3">
                  Architectural Narrative & Estate Overview
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {property.description}
                </p>
              </div>

              {/* Highlights Bulleted */}
              <div>
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-gold-300 font-semibold mb-3">
                  Signature Architectural Highlights
                </h4>
                <ul className="space-y-2">
                  {property.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features Chips */}
              <div>
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-gold-300 font-semibold mb-3">
                  Residence Amenities & Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-gold-400/20 text-gray-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Demonstrative sample disclosure */}
              {property.sampleDataNotice && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-gray-400">
                  <span className="font-semibold text-gold-400">Notice: </span>
                  This property listing utilizes supplied client assets and demonstrative UK real estate market parameters. Live viewings and verified titles are arranged via private discretion.
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* 4. PRIVATE VIEWING ENQUIRY FORM */}
            {/* ============================================================== */}
            <div className="rounded-2xl glass-panel p-6 border border-gold-400/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <h4 className="font-cinzel text-base font-bold text-white">
                    Private Office Viewing
                  </h4>
                </div>
                <p className="text-xs text-gray-400 mb-5 font-light">
                  Arrange a confidential escorted walkthrough with our prime UK residential partner.
                </p>

                {enquirySubmitted ? (
                  <div className="p-5 rounded-xl bg-gold-400/10 border border-gold-400/30 text-center space-y-3 animate-fade-in">
                    <CheckCircle2 className="w-8 h-8 text-gold-400 mx-auto" />
                    <h5 className="font-cinzel text-sm font-bold text-white">
                      Enquiry Registered
                    </h5>
                    <p className="text-xs text-gray-300">
                      Our Mayfair Private Office will contact you discreetly within two business hours to coordinate security clearance and access.
                    </p>
                    <button
                      onClick={() => setEnquirySubmitted(false)}
                      className="text-xs text-gold-300 hover:underline pt-2 block mx-auto"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        Full Name / Principal *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Lord Harrington / Lady Sarah"
                        value={enquiryForm.fullName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                        className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        Direct Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="principal@familyoffice.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        Direct Telephone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+44 20 7946 0888"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        Purchasing Profile
                      </label>
                      <select
                        value={enquiryForm.buyerType}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, buyerType: e.target.value as any })}
                        className="glass-input w-full px-3 py-2 rounded-xl text-xs appearance-none"
                      >
                        <option value="Cash Buyer" className="bg-[#0e1017]">Verified Cash Purchaser</option>
                        <option value="Private Office" className="bg-[#0e1017]">Family Office / Institutional Trustee</option>
                        <option value="Mortgage Approved" className="bg-[#0e1017]">Private Bank Mortgage Approved</option>
                        <option value="Investor" className="bg-[#0e1017]">International Real Estate Investor</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        Preferred Viewing Date
                      </label>
                      <input
                        type="date"
                        value={enquiryForm.preferredViewingDate}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, preferredViewingDate: e.target.value })}
                        className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-lg transition-all flex items-center justify-center space-x-2 mt-2"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Securely...</span>
                      ) : (
                        <>
                          <span>Request Private Viewing</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 5. SIMILAR PROPERTIES RECOMMENDATION */}
          {/* ============================================================== */}
          {similarProperties.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <h4 className="font-cinzel text-lg font-bold text-white mb-4">
                Comparable Portfolio Offerings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProperties.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar?.(sim)}
                    className="p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-gold-400/40 cursor-pointer transition-all group"
                  >
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-2">
                      <Image
                        src={sim.coverImage}
                        alt={sim.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] text-gold-400 block truncate">
                      {sim.location.neighborhood}, {sim.location.city}
                    </span>
                    <h5 className="font-cinzel text-xs font-bold text-white group-hover:text-gold-200 truncate">
                      {sim.title}
                    </h5>
                    <span className="font-cinzel text-xs font-semibold gold-text-gradient">
                      {formatGBP(sim.priceGBP)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
