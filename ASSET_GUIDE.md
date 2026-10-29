# ===================================================================
# LUXORA ESTATES - ASSET REPLACEMENT & CUSTOMIZATION GUIDE
# ===================================================================

Welcome to your bespoke luxury UK real estate website: **LUXORA ESTATES**.

This guide outlines exactly where and how to replace your assets, configure listings, and connect your production database.

---

## 1. CINEMATIC HERO BACKGROUND VIDEO

Your website has been engineered with a dedicated video hero section with:
- Full viewport coverage (`object-fit: cover`)
- Dark luxury vignette overlay and radial lighting
- Muted autoplay, loop, and mobile inline playback (`playsInline`)
- Play / Pause interactive toggle button
- Graceful luxury architectural poster fallback (already active)

### How to Add Your Background Video:
1. Place your video file in:
   `c:\Users\LENOVO\Downloads\3D WEB SITE PROPERTY\public\videos\`
2. Name the file:
   `hero-background.mp4`
3. Recommended format:
   - MP4 (H.264 video codec, AAC audio)
   - Resolution: 1920x1080 (1080p) or 2560x1440 (1440p)
   - Frame rate: 24fps or 30fps for cinematic look
   - Bitrate: 4-8 Mbps for fast streaming load times
4. Once placed, refresh the browser. The website will automatically detect `hero-background.mp4` and start streaming immediately!

---

## 2. YOUR SUPPLIED PROPERTY IMAGES (MAPPED IN CODE)

Your supplied assets are already integrated and placed in:
`c:\Users\LENOVO\Downloads\3D WEB SITE PROPERTY\public\images\properties\`

Mapped listings:
1. **`user-property-1.jpg`** -> The Belgravia Crescent Residence (Wilton Crescent, Belgravia SW1X) - £14,500,000
2. **`user-property-2.jpg`** -> The Wentworth Fairway Villa (Wentworth Estate, Surrey GU25) - £18,750,000
3. **`user-property-3.jpg`** -> The Kensington Private Mews (Kensington Gate Mews, London W8) - £8,950,000
4. **`user-property-4.jpg`** -> The Knightsbridge Garden Pavilion (Trevor Square, London SW7) - £12,250,000
5. **`mansion-sunset.png`**  -> The Cotswolds Horizon Manor (42-Acre Estate) - £16,800,000
6. **`mansion-lakeside.png`** -> The Windermere Waterfront Estate (Lake District) - £11,500,000

### How to Edit Property Details, Prices, and Titles:
Open `data/properties.ts`.
Every property object has clear, typed fields:
- `title`: The display name of the residence
- `priceGBP`: Asking price in British Pounds (e.g. `14500000`)
- `location`: Neighborhood, city, county, postcode area
- `specs`: Bedrooms, bathrooms, square footage, tenure, EPC rating
- `description`: Narrative overview
- `highlights`: Bulleted architectural features

---

## 3. ROTATING 3D PERSPECTIVE GALLERY & 360° SCRUBBER

1. **Rotating 3D Ring**:
   - Uses CSS 3D transforms (`transform-style: preserve-3d`, `rotateY`, `translateZ`)
   - Auto-rotates at an elegant slow pace
   - Pauses on mouse hover
   - Has Previous and Next buttons
   - Touch drag gestures enabled for tablet and mobile
   - Clicking any item opens its comprehensive specification modal

2. **360° Architectural Turntable Tour**:
   - 70 Full HD frames are placed in `public/360-frames/` (`ezgif-frame-001.jpg` to `070.jpg`)
   - Allows users to drag and spin the residence 360 degrees
   - Built-in frame scrubber slider and auto-orbit toggle

---

## 4. DETERMINISTIC FINANCIAL CALCULATORS

All calculations in the application are computed using pure deterministic mathematical algorithms:
- **HMRC Stamp Duty Land Tax (SDLT)**:
  Progressive statutory bands for England and Northern Ireland, with purchaser status selectors (Next Home, Additional Home +3%, Non-UK Resident +2%).
- **UK Mortgage Repayment Estimator**:
  Deterministic amortization based on deposit, loan term, and interest rate.

---

## 5. PRIVATE OFFICE ADMIN DASHBOARD

Navigate to `/admin` in your browser:
- Passcode: `luxora`
- Manage active listings
- Review live private viewing inquiries
- Review seller valuation requests
- Inspect Supabase PostgreSQL database schema
