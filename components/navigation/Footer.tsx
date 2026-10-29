"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050608] border-t border-gold-400/20 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col group">
              <span className="font-cinzel text-2xl font-bold tracking-[0.2em] gold-text-gradient">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-300/80 font-medium">
                {siteConfig.brandSubtitle}
              </span>
            </Link>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-light">
              Advising international private clients, family offices, and institutions on premier residential property, country estates, and architectural masterworks across the United Kingdom.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.neighborhood}, {siteConfig.contact.address.city} {siteConfig.contact.address.postcode}, {siteConfig.contact.address.country}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Portfolio Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest">
              Prime Portfolio
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#explore-properties" className="hover:text-gold-300 transition-colors">
                  London Penthouses
                </Link>
              </li>
              <li>
                <Link href="/#explore-properties" className="hover:text-gold-300 transition-colors">
                  Surrey Private Estates
                </Link>
              </li>
              <li>
                <Link href="/#explore-properties" className="hover:text-gold-300 transition-colors">
                  The Cotswolds Manors
                </Link>
              </li>
              <li>
                <Link href="/#explore-properties" className="hover:text-gold-300 transition-colors">
                  Edinburgh Townhouses
                </Link>
              </li>
              <li>
                <Link href="/#explore-properties" className="hover:text-gold-300 transition-colors">
                  Coastal & Waterfront
                </Link>
              </li>
              <li>
                <Link href="/#developments" className="hover:text-gold-300 transition-colors">
                  New Masterplans
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Client Services */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest">
              Private Advisory
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sell-property" className="hover:text-gold-300 transition-colors">
                  Confidential Valuation
                </Link>
              </li>
              <li>
                <Link href="/#gallery-3d" className="hover:text-gold-300 transition-colors">
                  3D Spatial Rotunda
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-gold-300 transition-colors">
                  Off-Market Syndication
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-300 transition-colors flex items-center space-x-1 text-gold-400/80">
                  <span>Client Office Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Verification */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest">
              Private Office Hours
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {siteConfig.contact.hours}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-gold-400/20 text-[10px] text-gold-300">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Authorised Private Partner</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalEntity}. All rights reserved. Registered in England & Wales.
          </div>

          <div className="flex items-center space-x-6">
            <span>Confidentiality Notice</span>
            <span>GDPR Privacy Protocol</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 text-gold-300 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
