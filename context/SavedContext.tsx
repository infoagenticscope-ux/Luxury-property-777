"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Property } from "@/types/property";

interface SavedContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  savedCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("luxora_saved_properties");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not access localStorage for saved properties", e);
    }
  }, []);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("luxora_saved_properties", JSON.stringify(next));
      } catch (e) {
        console.warn("Failed to persist to localStorage", e);
      }
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedContext.Provider
      value={{
        savedIds: mounted ? savedIds : [],
        isSaved,
        toggleSaved,
        savedCount: mounted ? savedIds.length : 0,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};
