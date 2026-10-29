"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useSaved } from "@/context/SavedContext";
import { Heart, Menu, X, Phone, ShieldCheck, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedCount, setIsDrawerOpen } = useSaved();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#090A0F]/85 backdrop-blur-2xl border-b border-gold-400/25 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5"
      }`}
    >
      {/* Top Glass Specular Line Reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 via-gold-400/60 to-transparent opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Glass Shine */}
          <Link href="/" className="flex flex-col group relative nav-glass-shine px-2 py-1 rounded-xl">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] gold-text-gradient group-hover:opacity-100 transition-opacity drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
              {siteConfig.brandName}
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-300/80 font-medium">
              London • Prime UK
            </span>
          </Link>

          {/* Desktop Navigation Links with Shining Glass Pill Effect */}
          <nav className="hidden lg:flex items-center space-x-2">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-gold-200 transition-all duration-300 nav-glass-shine hover:bg-white/10 hover:border hover:border-gold-400/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Saved Favourites Icon with Glass Glow */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full bg-white/10 border border-gold-400/30 hover:border-gold-300 hover:bg-gold-400/20 text-gold-300 transition-all duration-300 group nav-glass-shine shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              title="Saved Properties"
              aria-label="View Saved Properties"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-gold-500 to-gold-300 text-black text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Private Office / Contact Agent CTA with Active Glass Sweep */}
            <button
              onClick={onOpenEnquiry}
              className="relative overflow-hidden hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 nav-glass-shine"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Private Office</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 border border-gold-400/30 text-gray-200 hover:text-gold-300 nav-glass-shine"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#08090C]/95 backdrop-blur-2xl border-b border-gold-400/30 px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col space-y-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium tracking-wide text-gray-200 hover:text-gold-300 border-b border-white/5 pb-2.5 flex items-center justify-between nav-glass-shine px-3 py-1 rounded-xl"
              >
                <span>{item.label}</span>
                <span className="text-gold-400/50 text-xs">→</span>
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry?.();
                }}
                className="w-full py-3.5 rounded-xl text-center text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-gold-300 to-gold-500 shadow-xl nav-glass-shine"
              >
                Book Private Consultation
              </button>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
