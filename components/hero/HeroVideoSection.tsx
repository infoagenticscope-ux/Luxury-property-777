"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Play, Pause, ChevronDown, Sparkles, Video } from "lucide-react";

interface HeroVideoSectionProps {
  onExploreClick: () => void;
  onSellClick: () => void;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  onExploreClick,
  onSellClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is properly muted for programmatic autoplay
    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Autoplay was deferred or blocked by browser policy:", err);
            setIsPlaying(false);
          });
      }
    };

    attemptPlay();

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Document click fallback if browser requires user gesture
    const handleFirstInteraction = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
      window.removeEventListener("click", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#08090C] pt-24 pb-16 isolate">
      {/* ============================================================== */}
      {/* 1. REAL HTML5 CINEMATIC FULL-SCREEN BACKGROUND VIDEO */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] transition-opacity duration-700"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Gradient 1: Directional Cinematic Shading */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20 pointer-events-none z-10"
          style={{ mixBlendMode: "multiply" }}
        />

        {/* Gradient 2: Vertical Depth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/35 to-black/70 pointer-events-none z-10" />

        {/* Gradient 3: Subtle Gold Ambient Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.14),transparent)] pointer-events-none z-10" />

        {/* Subtle Architectural Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] z-10 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. HERO CONTENT & TYPOGRAPHY (Layered Safely Above Video) */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center mt-6">
        {/* Prestigious Tagline Pill */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-gold-400/35 backdrop-blur-md mb-6 shadow-2xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-semibold">
            Prime UK Residential & Country Estates
          </span>
        </div>

        {/* Master Oversized Headline */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Find Your Place in{" "}
          <span className="gold-text-gradient block sm:inline italic font-normal">
            Extraordinary.
          </span>
        </h1>

        {/* Elegant Supporting Subtext */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {siteConfig.heroSubheading}
        </p>

        {/* Action Call to Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mb-12">
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] font-bold text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <span>Explore Properties</span>
            <span className="text-base">↓</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onSellClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] font-medium text-gold-200 bg-black/50 hover:bg-black/70 border border-gold-400/40 hover:border-gold-400/80 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <span>Sell Your Property</span>
            <span className="text-gold-400 text-sm">→</span>
          </button>
        </div>

        {/* Key Real Estate Stats Ribbon */}
        <div className="hidden md:grid grid-cols-4 gap-8 py-5 px-8 rounded-2xl bg-black/55 backdrop-blur-xl border border-gold-400/20 max-w-4xl w-full shadow-2xl">
          {siteConfig.statistics.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-cinzel text-xl lg:text-2xl font-bold gold-text-gradient">
                {stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-gray-300 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. HERO CONTROLS & STATUS BADGE (Bottom Right) */}
      {/* ============================================================== */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center space-x-3">
        {/* Real Live Video Status Indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-400/30 text-[11px] text-gray-200 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Video className="w-3.5 h-3.5 text-gold-400" />
          <span>Cinematic 4K Video</span>
          {currentTime > 0 && (
            <span className="text-[10px] text-gold-300 font-mono">
              ({Math.floor(currentTime)}s)
            </span>
          )}
        </div>

        {/* Video Play/Pause Toggle Button */}
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-black/70 hover:bg-black/90 border border-gold-400/40 text-gold-300 hover:text-white backdrop-blur-md transition-all shadow-xl hover:border-gold-400 transform hover:scale-105"
          title={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
          aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Scroll Down Indicator (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400/80 mb-1.5 font-medium">
          Scroll to Discover
        </span>
        <ChevronDown className="w-4 h-4 text-gold-400 animate-bounce" />
      </div>
    </section>
  );
};
