export type PropertyStatus = 'For Sale' | 'Under Offer' | 'Exclusive' | 'To Let' | 'New Development';
export type ListingType = 'buy' | 'rent';
export type PropertyCategory = 
  | 'Penthouse'
  | 'Detached Estate'
  | 'Modern Villa'
  | 'Georgian Townhouse'
  | 'Countryside Manor'
  | 'Waterfront Residence'
  | 'Architectural New Build'
  | 'Luxury Apartment';

export interface PropertyFeature {
  name: string;
  category: 'interior' | 'exterior' | 'wellness' | 'security' | 'technology';
}

export interface Property {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  priceGBP: number;
  rentalFrequency?: 'month' | 'week';
  listingType: ListingType;
  category: PropertyCategory;
  status: PropertyStatus;
  
  // Location
  location: {
    addressLine?: string;
    neighborhood: string;
    city: string;
    county: string;
    postcodeArea: string; // e.g. "W1K", "SW1X", "GU25"
    region: 'London' | 'Surrey' | 'Cotswolds' | 'North West' | 'Midlands' | 'Scotland' | 'South West';
    coordinates?: {
      lat: number;
      lng: number;
    };
  };

  // Specifications
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqFt: number;
    sqMeters: number;
    tenure: 'Freehold' | 'Share of Freehold' | 'Leasehold';
    epcRating: 'A' | 'B' | 'C';
    councilTaxBand: 'H' | 'G' | 'F';
    yearBuilt?: number;
    parkingSpaces?: number;
  };

  // Media
  isUserSuppliedImage: boolean;
  coverImage: string;
  galleryImages: string[];
  has360Tour?: boolean;
  videoUrl?: string;

  // Editorial & Details
  description: string;
  highlights: string[];
  features: string[];
  architect?: string;

  // Metadata
  isFeatured: boolean;
  isEditorialPick?: boolean;
  dateListed: string;
  sampleDataNotice: boolean; // Transparency: marks sample / demonstrative data
}

export interface PropertyFilterState {
  listingType: ListingType | 'all';
  location: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'bedrooms' | 'newest';
}

export interface EnquirySubmission {
  id?: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  buyerType: 'Cash Buyer' | 'Mortgage Approved' | 'Investor' | 'Private Office' | 'First Time Luxury Buyer';
  preferredViewingDate?: string;
  message: string;
  timestamp: string;
  status: 'Pending' | 'Contacted' | 'Viewing Booked';
}
