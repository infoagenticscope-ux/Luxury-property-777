"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Sparkles, Send, CheckCircle2, Award, Users } from "lucide-react";

export const SellPropertyCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyPostcode: "",
    propertyType: "Detached Estate",
    estimatedValue: "£5M - £10M",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      try {
        const valuations = JSON.parse(localStorage.getItem("luxora_valuations") || "[]");
        valuations.unshift({
          ...formData,
          id: `val-${Date.now()}`,
          date: new Date().toISOString(),
        });
        localStorage.setItem("luxora_valuations", JSON.stringify(valuations));
      } catch (e) {
        console.warn(e);
      }
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="sell-property" className="w-full py-24 bg-[#090A0F] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl glass-panel border border-gold-400/30 p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                Private Office Advisory
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Selling Prime Real Estate With <span className="gold-text-gradient">Absolute Discretion</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              We curate off-market transactions for Britain's most coveted country estates, penthouses, and heritage townhouses. By maintaining discreet relationships with verified global wealth syndicates, we protect your privacy while achieving benchmark market valuations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="font-cinzel text-2xl font-bold gold-text-gradient block">
                  68%
                </span>
                <span className="text-xs text-gray-400">Sold Off-Market Discreetly</span>
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold gold-text-gradient block">
                  14 Days
                </span>
                <span className="text-xs text-gray-400">Avg Qualified Buyer Intro</span>
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold gold-text-gradient block">
                  £1.85B+
                </span>
                <span className="text-xs text-gray-400">Transactions Handled</span>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Valuation Card */}
          <div className="lg:col-span-5 bg-black/60 rounded-2xl p-6 sm:p-8 border border-gold-400/25 shadow-2xl">
            <h3 className="font-cinzel text-xl font-bold text-white mb-2">
              Request Confidential Valuation
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-light">
              Receive an independent desktop appraisal and discreet buyer appetite report.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-gold-400/10 border border-gold-400/30 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-gold-400 mx-auto" />
                <h4 className="font-cinzel text-base font-bold text-white">
                  Appraisal Request Received
                </h4>
                <p className="text-xs text-gray-300">
                  Our Senior Prime Valuation Partner will review your asset and deliver a confidential advisory memorandum within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gold-300 hover:underline pt-2 block mx-auto"
                >
                  Submit another property
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full name or representative"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="glass-input w-full px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-input w-full px-3.5 py-2 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                      Telephone *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="glass-input w-full px-3.5 py-2 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                      UK Postcode / Area
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. SW1X, GU25, OX7"
                      value={formData.propertyPostcode}
                      onChange={(e) => setFormData({ ...formData, propertyPostcode: e.target.value })}
                      className="glass-input w-full px-3.5 py-2 rounded-xl text-xs uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                      Estimated Bracket
                    </label>
                    <select
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      className="glass-input w-full px-3.5 py-2 rounded-xl text-xs appearance-none"
                    >
                      <option value="£3M - £5M" className="bg-[#0e1017]">£3M – £5M</option>
                      <option value="£5M - £10M" className="bg-[#0e1017]">£5M – £10M</option>
                      <option value="£10M - £20M" className="bg-[#0e1017]">£10M – £20M</option>
                      <option value="Over £20M" className="bg-[#0e1017]">Over £20M</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-xl transition-all flex items-center justify-center space-x-2 pt-3"
                >
                  {loading ? (
                    <span>Registering Inquiry...</span>
                  ) : (
                    <>
                      <span>Request Private Valuation</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
