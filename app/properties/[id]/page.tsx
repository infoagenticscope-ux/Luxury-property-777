"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { propertiesData } from "@/data/properties";
import { formatGBP, formatNumber } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Interactive360Viewer } from "@/components/properties/Interactive360Viewer";
import { StampDutyCalculator } from "@/components/properties/StampDutyCalculator";
import { SavedDrawer } from "@/components/saved/SavedDrawer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Building,
  ShieldCheck,
  CheckCircle2,
  Send,
  Compass,
  Award,
  Sparkles,
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  const property = propertiesData.find((p) => p.id === propertyId);
  const { isSaved, toggleSaved } = useSaved();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"gallery" | "360tour" | "financials">("gallery");
  const [copied, setCopied] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Enquiry state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    buyerType: "Cash Buyer",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#08090C] text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32 px-4 max-w-md mx-auto space-y-4">
          <h2 className="font-cinzel text-3xl font-bold">Property Not Found</h2>
          <p className="text-gray-400 text-sm">
            The requested estate dossier could not be located or has concluded an off-market disposition.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase font-bold text-black bg-gold-400 hover:bg-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const saved = isSaved(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem("luxora_enquiries") || "[]");
        existing.unshift({
          id: `enq-${Date.now()}`,
          propertyId: property.id,
          propertyTitle: property.title,
          ...enquiryForm,
          timestamp: new Date().toISOString(),
          status: "Pending",
        });
        localStorage.setItem("luxora_enquiries", JSON.stringify(existing));
      } catch (e) {
        console.warn(e);
      }
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white">
      <CustomCursor />
      <Navbar onOpenEnquiry={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/#explore-properties"
            className="inline-flex items-center space-x-2 text-xs text-gold-300 hover:text-gold-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Prime Portfolio</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300 border border-white/10 transition-colors"
              title="Copy Dossier Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-gold-300 animate-fade-in">Copied!</span>}

            <button
              onClick={() => toggleSaved(property.id)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300 border border-white/10 transition-colors"
              title={saved ? "Remove Shortlist" : "Save Shortlist"}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white"}`} />
            </button>
          </div>
        </div>

        {/* Gallery / 360 Tour / Tabs */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "gallery"
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              High-Resolution Gallery
            </button>

            {property.has360Tour && (
              <button
                onClick={() => setActiveTab("360tour")}
                className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center space-x-2 transition-all ${
                  activeTab === "360tour"
                    ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>360° Interactive Tour</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("financials")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "financials"
                  ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              Stamp Duty & Mortgage
            </button>
          </div>

          {activeTab === "gallery" && (
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-black/60 border border-gold-400/25 shadow-2xl">
                <Image
                  src={property.galleryImages[activeImageIndex] || property.coverImage}
                  alt={property.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1400px"
                  className="object-cover object-center"
                />
              </div>

              {property.galleryImages.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {property.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? "border-[#D4AF37] scale-105" : "border-transparent opacity-60"
                      }`}
                    >
                      <Image src={img} alt={`Thumb ${idx}`} fill sizes="112px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "360tour" && (
            <div className="animate-fade-in">
              <Interactive360Viewer propertyTitle={`${property.title} - 360° Virtual Tour`} />
            </div>
          )}

          {activeTab === "financials" && (
            <div className="animate-fade-in">
              <StampDutyCalculator initialPrice={property.priceGBP} />
            </div>
          )}
        </div>

        {/* Title, Specs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex items-center space-x-2 text-gold-300 text-xs mb-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>
                  {property.location.neighborhood}, {property.location.city} ({property.location.postcodeArea})
                </span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-3">
                {property.title}
              </h1>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl glass-panel border border-gold-400/20">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bedrooms</span>
                <span className="font-cinzel text-xl font-bold text-white">{property.specs.bedrooms}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bathrooms</span>
                <span className="font-cinzel text-xl font-bold text-white">{property.specs.bathrooms}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Internal Area</span>
                <span className="font-cinzel text-xl font-bold text-white">{formatNumber(property.specs.sqFt)} sq ft</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Tenure</span>
                <span className="font-cinzel text-xl font-bold text-white">{property.specs.tenure}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-lg font-bold text-white">Architectural Highlights</h3>
              <ul className="space-y-2.5">
                {property.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Form */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl glass-panel border border-gold-400/35 p-6 sm:p-8 space-y-6 sticky top-28">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">
                  Asking Price
                </span>
                <span className="font-cinzel text-3xl sm:text-4xl font-bold gold-text-gradient block">
                  {formatGBP(property.priceGBP)}
                </span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-center space-y-2 animate-fade-in">
                  <CheckCircle2 className="w-8 h-8 text-gold-400 mx-auto" />
                  <h4 className="font-cinzel text-sm font-bold text-white">Viewing Requested</h4>
                  <p className="text-xs text-gray-300">
                    Our Private Office will contact you to finalize appointment security credentials.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-gray-400 block mb-1">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      className="glass-input w-full px-3 py-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="email@domain.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="glass-input w-full px-3 py-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Phone</label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 ..."
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="glass-input w-full px-3 py-2 rounded-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-xl"
                  >
                    {submitting ? "Submitting..." : "Book Private Viewing"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <SavedDrawer
        allProperties={propertiesData}
        onSelectProperty={(p) => router.push(`/properties/${p.id}`)}
        onOpenEnquiry={() => {}}
      />
      <Footer />
    </div>
  );
}
