# LUXORA ESTATES — Prime UK Real Estate & Country Homes

An award-winning caliber luxury 3D UK real estate web platform featuring cinematic video backgrounds, perspective 3D rotating rotunda, interactive 360° virtual tours, frosted-glass glassmorphism UI, deterministic UK Stamp Duty (SDLT) and mortgage calculations, and an administrative management portal.

---

## Quick Start (Run Locally)

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production Build & Start**:
   ```bash
   npm run build
   npm run start
   ```

---

## Key Features & Architectural Highlights

1. **Cinematic Hero Video Section**:
   - Built to stream `/videos/hero-background.mp4` with full-viewport cover, dark gradient overlays, and accessible pause/resume controls.
   - Elegant dark luxury poster fallback already active before you upload your video.
   - Simply drop your video file into `public/videos/hero-background.mp4`.

2. **Supplied Client Property Assets**:
   - The primary featured listings below the hero prominently feature your supplied assets:
     - `user-property-1.jpg` (Belgravia Crescent Residence)
     - `user-property-2.jpg` (Wentworth Fairway Villa)
     - `user-property-3.jpg` (Kensington Private Mews)
     - `user-property-4.jpg` (Knightsbridge Garden Pavilion)
     - `mansion-sunset.png` (Cotswolds Horizon Manor)
     - `mansion-lakeside.png` (Windermere Waterfront Estate)

3. **Perspective 3D Rotating Rotunda**:
   - Pure CSS 3D transforms (`transform-style: preserve-3d`, `rotateY`, `translateZ`)
   - Gentle auto-rotation, pauses on hover, previous/next controls, and touch drag swipe.

4. **Interactive 360° Virtual Walkthrough**:
   - 70 Full HD frames connected to an interactive turntable scrubber allowing clients to drag and inspect architectural elevations.

5. **Functional Search & Filter System**:
   - Buy vs Rent tabs, UK locations, property categories, bedrooms, price range slider, and sort order.
   - Operates reactively on live property data.

6. **Deterministic UK Financial Advisory Math**:
   - Statutory HMRC Stamp Duty Land Tax (SDLT) progressive threshold calculations with primary vs additional home (+3%) and non-UK resident (+2%) options.
   - Monthly mortgage repayment estimator.

7. **Curated Shortlist (Saved Properties)**:
   - Interactive heart toggles with `localStorage` persistence, navigation badge count, and slide-out portfolio summary drawer.

8. **Private Office Admin Portal (`/admin`)**:
   - Passkey: `luxora`
   - Review incoming viewing enquiries and seller valuation requests.
   - Toggle featured listings and inspect Supabase PostgreSQL schema.
