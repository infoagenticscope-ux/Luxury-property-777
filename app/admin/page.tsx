"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { propertiesData as initialProperties } from "@/data/properties";
import { Property, EnquirySubmission } from "@/types/property";
import { formatGBP } from "@/lib/utils";
import {
  ShieldCheck,
  Building2,
  Users,
  Inbox,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Key,
  Database,
  Lock,
} from "lucide-react";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [activeTab, setActiveTab] = useState<"listings" | "enquiries" | "valuations" | "database">("listings");
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [valuations, setValuations] = useState<any[]>([]);

  // Add Property Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: "",
    subtitle: "",
    priceGBP: 12500000,
    listingType: "buy",
    category: "Penthouse",
    status: "For Sale",
    location: {
      neighborhood: "Mayfair",
      city: "London",
      county: "Greater London",
      postcodeArea: "W1K",
      region: "London",
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      sqFt: 4500,
      sqMeters: 418,
      tenure: "Freehold",
      epcRating: "A",
      councilTaxBand: "H",
    },
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    ],
    tagline: "Ultra-prime private residence in central London.",
    description: "Detailed architectural residence boasting bespoke finishes and uncompromised privacy.",
    highlights: ["24-Hour Uniformed Concierge", "Private Subterranean Parking"],
    features: ["Concierge", "Wellness Spa"],
    isFeatured: true,
    isUserSuppliedImage: false,
    dateListed: new Date().toISOString().split("T")[0],
    sampleDataNotice: true,
  });

  useEffect(() => {
    try {
      const storedEnq = localStorage.getItem("luxora_enquiries");
      if (storedEnq) setEnquiries(JSON.parse(storedEnq));

      const storedVals = localStorage.getItem("luxora_valuations");
      if (storedVals) setValuations(JSON.parse(storedVals));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo administrator passcode for secure preview
    if (passcode.toLowerCase() === "luxora" || passcode.toLowerCase() === "admin") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid administrator key. (Hint: enter 'luxora')");
    }
  };

  const toggleFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Property = {
      ...newProperty,
      id: `prop-${Date.now()}`,
    } as Property;

    setProperties([created, ...properties]);
    setIsAddModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl glass-panel border border-gold-400/30 p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-4 text-gold-400">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-cinzel text-2xl font-bold text-white mb-2">
            Private Office Access
          </h2>
          <p className="text-xs text-gray-400 mb-6 font-light">
            Authorized management console for {siteConfig.brandName} principals and portfolio directors.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                Enter Security Key
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. luxora)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 text-left">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-xl transition-all"
            >
              Verify Security Credential
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="hover:text-gold-300 flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Website</span>
            </Link>
            <span>Demo Passkey: <code className="text-gold-400">luxora</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090C] text-gray-200 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gold-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>CONFIDENTIAL MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              {siteConfig.brandName} • Executive Command
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 transition-colors"
            >
              Exit Console
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === "listings"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Active Listings ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === "enquiries"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Viewing Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("valuations")}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === "valuations"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Valuation Requests ({valuations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`px-5 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === "database"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase / Cloud DB Schema</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: LISTINGS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Property Portfolio Catalog
                </h3>
                <p className="text-xs text-gray-400">
                  Manage live listings, featured statuses, and asking prices.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold text-black bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Asking Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={p.coverImage}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-cinzel font-bold text-white block">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {p.specs.bedrooms} Beds • {p.specs.bathrooms} Baths • {p.specs.sqFt} sq ft
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-gray-300">
                          {p.location.neighborhood}, {p.location.city}
                        </td>

                        <td className="p-4 text-gray-400">{p.category}</td>

                        <td className="p-4 font-cinzel font-bold gold-text-gradient">
                          {formatGBP(p.priceGBP)}
                        </td>

                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/10 text-gold-300 border border-gold-400/20">
                            {p.status}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() => toggleFeatured(p.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                              p.isFeatured
                                ? "bg-gold-400 text-black shadow-md"
                                : "bg-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            {p.isFeatured ? "Featured" : "Standard"}
                          </button>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => alert(`Editing property ID: ${p.id}`)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300"
                            title="Edit Listing"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VIEWING ENQUIRIES */}
        {/* ============================================================== */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                VIP Private Viewing Dossiers
              </h3>
              <p className="text-xs text-gray-400">
                Direct client requests submitted through the property detail modals.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 rounded-2xl glass-panel text-center text-gray-400">
                <Inbox className="w-12 h-12 text-gold-400/40 mx-auto mb-3" />
                <h4 className="font-cinzel text-base text-white font-semibold mb-1">
                  No Inquiries Received Yet
                </h4>
                <p className="text-xs">
                  When a client books a private viewing on the website, their full contact details and date preferences will populate here in real time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-6 rounded-2xl glass-panel border border-gold-400/25 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-sm font-bold text-white">
                        {enq.fullName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-xs text-gold-300 font-medium">
                      Property: {enq.propertyTitle}
                    </div>

                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Email: <span className="text-white">{enq.email}</span></div>
                      <div>Phone: <span className="text-white">{enq.phone}</span></div>
                      <div>Purchaser Profile: <span className="text-gold-200">{enq.buyerType}</span></div>
                      {enq.preferredViewingDate && (
                        <div>Preferred Date: <span className="text-white">{enq.preferredViewingDate}</span></div>
                      )}
                    </div>

                    <p className="p-3 rounded-xl bg-black/40 text-xs text-gray-300 italic">
                      "{enq.message}"
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-gray-500">
                      <span>Logged: {new Date(enq.timestamp).toLocaleString()}</span>
                      <button
                        onClick={() => alert(`Marked enquiry for ${enq.fullName} as Contacted`)}
                        className="text-gold-400 hover:underline"
                      >
                        Mark as Contacted
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: VALUATION REQUESTS */}
        {/* ============================================================== */}
        {activeTab === "valuations" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Seller Desktop Appraisals
              </h3>
              <p className="text-xs text-gray-400">
                Inquiries submitted via the 'Sell Your Property' valuation portal.
              </p>
            </div>

            {valuations.length === 0 ? (
              <div className="p-12 rounded-2xl glass-panel text-center text-gray-400">
                <Users className="w-12 h-12 text-gold-400/40 mx-auto mb-3" />
                <h4 className="font-cinzel text-base text-white font-semibold mb-1">
                  No Valuation Requests Yet
                </h4>
                <p className="text-xs">
                  Submissions from prospective sellers will appear here with postcode and bracket details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valuations.map((val) => (
                  <div
                    key={val.id}
                    className="p-6 rounded-2xl glass-panel border border-gold-400/25 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-sm font-bold text-white">
                        {val.fullName}
                      </span>
                      <span className="text-gold-400 font-semibold">{val.estimatedValue}</span>
                    </div>
                    <div>Postcode: <span className="text-white font-mono">{val.propertyPostcode}</span></div>
                    <div>Email: <span className="text-gray-300">{val.email}</span></div>
                    <div>Phone: <span className="text-gray-300">{val.phone}</span></div>
                    <span className="text-[10px] text-gray-500 block pt-2">
                      Submitted: {new Date(val.date).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SUPABASE & DATABASE ARCHITECTURE */}
        {/* ============================================================== */}
        {activeTab === "database" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Database & Backend Architecture (Supabase / PostgreSQL)
              </h3>
              <p className="text-xs text-gray-400">
                Production-ready schema migration script to scale from local demo to fully connected enterprise backend.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/70 border border-gold-400/30 text-xs font-mono space-y-4 text-gray-300 overflow-x-auto">
              <div className="text-gold-400 font-bold">-- 1. Create Properties Table in PostgreSQL / Supabase</div>
              <pre className="text-gray-300">{`CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  tagline TEXT,
  price_gbp NUMERIC(14, 2) NOT NULL,
  rental_frequency TEXT,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('buy', 'rent')),
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'For Sale',
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT,
  postcode_area TEXT NOT NULL,
  region TEXT NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  sq_ft INT NOT NULL,
  tenure TEXT NOT NULL,
  epc_rating TEXT,
  council_tax_band TEXT,
  cover_image TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_user_supplied_image BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT NOT NULL,
  property_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  buyer_type TEXT NOT NULL,
  preferred_viewing_date DATE,
  message TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel p-6 sm:p-8 border border-gold-400/40">
            <h3 className="font-cinzel text-xl font-bold text-white mb-4">
              Add New Prime Property
            </h3>

            <form onSubmit={handleAddPropertySubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Property Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Mayfair Penthouse"
                  value={newProperty.title}
                  onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                  className="glass-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Asking Price (£ GBP) *</label>
                  <input
                    required
                    type="number"
                    value={newProperty.priceGBP}
                    onChange={(e) => setNewProperty({ ...newProperty, priceGBP: Number(e.target.value) })}
                    className="glass-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Category *</label>
                  <select
                    value={newProperty.category}
                    onChange={(e) => setNewProperty({ ...newProperty, category: e.target.value as any })}
                    className="glass-input w-full px-3 py-2 rounded-xl"
                  >
                    <option value="Penthouse" className="bg-[#0e1017]">Penthouse</option>
                    <option value="Detached Estate" className="bg-[#0e1017]">Detached Estate</option>
                    <option value="Modern Villa" className="bg-[#0e1017]">Modern Villa</option>
                    <option value="Georgian Townhouse" className="bg-[#0e1017]">Georgian Townhouse</option>
                    <option value="Countryside Manor" className="bg-[#0e1017]">Countryside Manor</option>
                    <option value="Waterfront Residence" className="bg-[#0e1017]">Waterfront Residence</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newProperty.specs?.bedrooms}
                    onChange={(e) =>
                      setNewProperty({
                        ...newProperty,
                        specs: { ...(newProperty.specs as any), bedrooms: Number(e.target.value) },
                      })
                    }
                    className="glass-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={newProperty.specs?.bathrooms}
                    onChange={(e) =>
                      setNewProperty({
                        ...newProperty,
                        specs: { ...(newProperty.specs as any), bathrooms: Number(e.target.value) },
                      })
                    }
                    className="glass-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Sq Ft</label>
                  <input
                    type="number"
                    value={newProperty.specs?.sqFt}
                    onChange={(e) =>
                      setNewProperty({
                        ...newProperty,
                        specs: { ...(newProperty.specs as any), sqFt: Number(e.target.value) },
                      })
                    }
                    className="glass-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-black bg-gold-400 hover:bg-gold-300"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
