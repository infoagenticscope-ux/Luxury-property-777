"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Compass, RotateCw, Play, Pause, Maximize2, MoveHorizontal } from "lucide-react";

interface Interactive360ViewerProps {
  totalFrames?: number;
  framePrefix?: string;
  propertyTitle?: string;
}

export const Interactive360Viewer: React.FC<Interactive360ViewerProps> = ({
  totalFrames = 70,
  framePrefix = "/360-frames/ezgif-frame-",
  propertyTitle = "Architectural 360° Virtual Walkthrough",
}) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startFrame, setStartFrame] = useState(1);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Pad frame number: 1 -> "001", 15 -> "015"
  const getFramePath = useCallback(
    (frameNum: number) => {
      const padded = String(frameNum).padStart(3, "0");
      return `${framePrefix}${padded}.jpg`;
    },
    [framePrefix]
  );

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning || isDragging) {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      return;
    }

    spinIntervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev >= totalFrames ? 1 : prev + 1));
    }, 65); // ~15 frames per second

    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, [isAutoSpinning, isDragging, totalFrames]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartFrame(currentFrame);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const width = containerRef.current.clientWidth || 600;
    const deltaX = clientX - startX;
    // Pixels per frame step: ~10px per frame
    const frameOffset = Math.floor(deltaX / 9);
    let target = (startFrame - frameOffset) % totalFrames;
    if (target <= 0) target += totalFrames;
    setCurrentFrame(target);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const currentDegrees = Math.round(((currentFrame - 1) / totalFrames) * 360);

  return (
    <div className="w-full flex flex-col rounded-2xl overflow-hidden glass-panel border border-gold-400/30">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
        <div className="flex items-center space-x-2.5">
          <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span className="font-cinzel text-xs sm:text-sm font-bold text-white">
            {propertyTitle}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-gold-400/10 border border-gold-400/30 text-gold-300 font-mono">
            {currentDegrees}° Elevation
          </span>

          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-gold-400/20 text-gray-300 hover:text-gold-300 border border-white/10"
            title={isAutoSpinning ? "Pause Auto Orbit" : "Start Auto Orbit"}
          >
            {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Interactive Canvas / Frame Viewport */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black select-none cursor-grab active:cursor-grabbing overflow-hidden group"
      >
        <Image
          src={getFramePath(currentFrame)}
          alt={`360 View Frame ${currentFrame}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[11px] pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
          <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
          <span>Click & Drag to Spin 360°</span>
        </div>
      </div>

      {/* Frame Scrubber Range Bar */}
      <div className="px-5 py-3 bg-black/50 border-t border-white/10 flex items-center space-x-4">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
          0°
        </span>
        <input
          type="range"
          min="1"
          max={totalFrames}
          value={currentFrame}
          onChange={(e) => {
            setIsAutoSpinning(false);
            setCurrentFrame(Number(e.target.value));
          }}
          className="flex-1 accent-[#D4AF37] cursor-pointer h-1.5 bg-white/10 rounded-lg"
        />
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
          360°
        </span>
      </div>
    </div>
  );
};
