export interface Development {
  id: string;
  name: string;
  location: string;
  tagline: string;
  completionDate: string;
  startingPriceGBP: number;
  unitsCount: number;
  availableUnits: number;
  architect: string;
  amenities: string[];
  image: string;
  status: 'Under Construction' | 'Completed' | 'Off-Plan Launch';
}

export const developmentsData: Development[] = [
  {
    id: "dev-01",
    name: "The Mayfair Residences at Grosvenor",
    location: "Mayfair, London W1K",
    tagline: "Twenty-four bespoke lateral residences in Mayfair's premier garden square.",
    completionDate: "Q3 2027",
    startingPriceGBP: 12500000,
    unitsCount: 24,
    availableUnits: 7,
    architect: "David Chipperfield Architects",
    amenities: [
      "Private Sommelier & Wine Cellar",
      "25m Roman-Style Stone Pool",
      "24/7 Mayfair Chauffeur Service",
      "Private Screening Room",
      "Biometric Valet Parking",
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    status: "Off-Plan Launch",
  },
  {
    id: "dev-02",
    name: "The Riverside Crescent at Battersea",
    location: "Battersea Riverside, London SW11",
    tagline: "Panoramic river-facing penthouses with private moorings and sky gardens.",
    completionDate: "Q4 2026",
    startingPriceGBP: 4850000,
    unitsCount: 42,
    availableUnits: 14,
    architect: "Foster + Partners",
    amenities: [
      "Direct Thames River Moorings",
      "Private Sky Garden Lounge",
      "Technogym Olympic Wellness Suite",
      "Executive Boardrooms & Co-Working",
      "Pet Concierge & Hydro-Spa",
    ],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    status: "Under Construction",
  },
  {
    id: "dev-03",
    name: "The Cotswold Barns Collection",
    location: "Kingham Valley, Oxfordshire OX7",
    tagline: "Twelve hyper-sustainable carbon-negative country estates on 120 shared private acres.",
    completionDate: "Q2 2027",
    startingPriceGBP: 8900000,
    unitsCount: 12,
    availableUnits: 4,
    architect: "John Pawson Minimalist Architecture",
    amenities: [
      "120 Acres Private Parkland",
      "Private Organic Kitchen Gardens",
      "Wild Swimming Lake & Sauna",
      "Equestrian Stables & Bridleways",
      "Farm-to-Table Private Dining Room",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    status: "Off-Plan Launch",
  },
];
