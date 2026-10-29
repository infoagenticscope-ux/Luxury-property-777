"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Mail, CheckCircle2, Send, Lock } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      try {
        const subs = JSON.parse(localStorage.getItem("luxora_newsletter_subscribers") || "[]");
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem("luxora_newsletter_subscribers", JSON.stringify(subs));
        }
      } catch (e) {
        console.warn(e);
      }
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section className="w-full py-20 bg-[#08090C] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel border border-gold-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-gold-400/20 mb-4 shadow-md">
            <Mail className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
              The Private Client Dispatch
            </span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Receive Curated Off-Market <span className="gold-text-gradient">Intelligence</span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            A discreet bimonthly publication containing private off-market listings, prime UK property transaction benchmarks, and architectural design retrospectives.
          </p>

          {submitted ? (
            <div className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-300 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-gold-400" />
              <span className="text-xs font-semibold">
                You have been enrolled into the VIP Private Client Dispatch.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                required
                type="email"
                placeholder="Enter your confidential email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-lg transition-all shrink-0 flex items-center justify-center space-x-2"
              >
                {loading ? <span>Enrolling...</span> : <span>Subscribe</span>}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-500 mt-5">
            <Lock className="w-3 h-3 text-gold-400/60" />
            <span>Strict GDPR compliance • Zero promotional distribution • Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
