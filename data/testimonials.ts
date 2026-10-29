export interface Testimonial {
  id: string;
  clientType: string;
  location: string;
  quote: string;
  transactionType: string;
  year: string;
  authorTitle: string;
  initials: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    clientType: "Private Family Office",
    location: "Kensington & Mayfair",
    quote: "Luxora Estates orchestrated the off-market acquisition of our family's prime London townhouse with absolute discretion. Their relationships with prime UK landholders and private banking advisors are unparalleled.",
    transactionType: "Off-Market Acquisition (£16.8M)",
    year: "2025",
    authorTitle: "Principal, Swiss-UK Single Family Office",
    initials: "A.H.",
  },
  {
    id: "test-02",
    clientType: "Tech Founder & Private Investor",
    location: "Surrey Hills Estate",
    quote: "From the initial 3D digital walkthrough to the legal closing on our Wentworth estate, Luxora's white-glove advisory saved us months of wasted viewings. They understood our exact architectural and privacy specifications from day one.",
    transactionType: "Private Estate Purchase (£18.5M)",
    year: "2026",
    authorTitle: "Managing Partner, Sovereign Tech Capital",
    initials: "M.V.",
  },
  {
    id: "test-03",
    clientType: "International Property Collector",
    location: "Grosvenor Square Duplex",
    quote: "Selling an ultra-prime Mayfair penthouse requires nuanced international positioning. Luxora brought qualified buyers from Geneva, Singapore, and New York within 14 days without ever listing the asset on open public portals.",
    transactionType: "Discreet Portfolio Sale (£24.5M)",
    year: "2026",
    authorTitle: "Private Collector & Philanthropist",
    initials: "C.R.",
  },
];
