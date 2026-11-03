# Zeeshan the Creative - Portfolio Website

A bold, high-converting, single-page portfolio website for **Zeeshan Shaikh** ([@zeeshan_the_creative](https://www.instagram.com/zeeshan_the_creative/)), Mumbai-based reel creator and brand promoter. Designed to pitch brands and business owners across Mumbai, showcase reach beyond followers (top reel: 665K views), and drive immediate inbound inquiries via WhatsApp and Instagram DM.

Built with **HTML5, CSS3, and vanilla JavaScript** — zero dependencies, zero build steps, and works offline immediately by double-clicking `index.html`.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Image Replacement Reference Table](#image-replacement-reference-table)
3. [How to Edit Content (`js/config.js`)](#how-to-edit-content-jsconfigjs)
4. [How to Run Locally](#how-to-run-locally)
5. [How to Deploy for Free (Netlify & GitHub Pages)](#how-to-deploy-for-free)
6. [Design System & Technical Features](#design-system--technical-features)

---

## 1. Project Structure

```
zeeshan-portfolio/
├── index.html              # Main HTML5 page (all 13 sections in order)
├── README.md               # Documentation & deployment guide
├── css/
│   └── style.css           # Street-poster aesthetic CSS & responsive styles
├── js/
│   ├── config.js           # Central configuration (links, stats, reels, reviews)
│   └── main.js             # Dynamic hydration, counters, lightbox, animations
└── assets/
    └── images/             # All 28 replaceable image assets + favicon
        ├── reel-1.png ... reel-6.png
        ├── insights-overview.png ... insights-top-content.png
        ├── audience-location.png, audience-age-gender.png
        ├── followers-growth.png, shares-saves-1.png, shares-saves-2.png
        ├── review-1.png ... review-4.png
        ├── style-poster.png, style-street.png
        ├── promote-1.png ... promote-6.png
        ├── hero-photo.png
        └── favicon.png
```

---

## 2. Image Replacement Reference Table

All demo placeholders are saved in `assets/images/`. To replace any placeholder with your real screenshot or creator photo, **overwrite the file keeping the exact same filename**. No code changes are required!

| # | Filename | Recommended Dimensions | Aspect Ratio | Section Where It Appears | Purpose / Content Description |
|---|----------|------------------------|--------------|---------------------------|-------------------------------|
| 1 | `hero-photo.png` | 800 × 1000 px | 4:5 | **2. Hero** | Portrait photo of Zeeshan Shaikh inside yellow-bordered frame |
| 2 | `reel-1.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Top Reel (665K Views) with red VIRAL badge |
| 3 | `reel-2.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Second Viral Reel (102K Views) |
| 4 | `reel-3.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Third Viral Reel (60.7K Views) |
| 5 | `reel-4.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Fourth Viral Reel (50.3K Views) |
| 6 | `reel-5.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Fifth Viral Reel (31.5K Views) |
| 7 | `reel-6.png` | 1080 × 1920 px | 9:16 | **4. Most Viral Reels** | Sixth Viral Reel (27.1K Views) |
| 8 | `insights-overview.png` | 1200 × 750 px | 16:10 | **5. Dashboard & Insights** | Professional Dashboard 30-day overview screenshot |
| 9 | `insights-top-reel.png` | 1200 × 750 px | 16:10 | **5. Dashboard & Insights** | Top reel analytics screenshot (showing 665K+ plays) |
| 10 | `insights-followers-vs-nonfollowers.png` | 1200 × 750 px | 16:10 | **5. Dashboard & Insights** | Audience reach distribution (non-followers reach) |
| 11 | `insights-top-content.png` | 1200 × 750 px | 16:10 | **5. Dashboard & Insights** | Grid of top-performing reels screenshot |
| 12 | `audience-location.png` | 1200 × 750 px | 16:10 | **6. Audience Proof** | Instagram Audience Demographics (Top Cities / Mumbai) |
| 13 | `audience-age-gender.png` | 1200 × 750 px | 16:10 | **6. Audience Proof** | Instagram Audience Age & Gender distribution |
| 14 | `promote-1.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #1 (Any product/brand category) |
| 15 | `promote-2.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #2 (Any product/brand category) |
| 16 | `promote-3.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #3 (Any product/brand category) |
| 17 | `promote-4.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #4 (Any product/brand category) |
| 18 | `promote-5.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #5 (Any product/brand category) |
| 19 | `promote-6.png` | 1080 × 1920 px | 9:16 | **7. What We Promote** | Sample reel cover #6 (Any product/brand category) |
| 20 | `style-poster.png` | 1080 × 1920 px | 9:16 | **8. Two Reel Styles** | "Poster Reel" sample (offer, price, call to action) |
| 21 | `style-street.png` | 1080 × 1920 px | 9:16 | **8. Two Reel Styles** | "Street Reel" sample (on-ground, authentic energy) |
| 22 | `followers-growth.png` | 1200 × 750 px | 16:10 | **9. Followers & Shares** | Account followers growth chart screenshot |
| 23 | `shares-saves-1.png` | 1200 × 750 px | 16:10 | **9. Followers & Shares** | Reel interaction analytics screenshot (Shares & Saves #1) |
| 24 | `shares-saves-2.png` | 1200 × 750 px | 16:10 | **9. Followers & Shares** | Reel interaction analytics screenshot (Shares & Saves #2) |
| 25 | `review-1.png` | 1000 × 700 px | 10:7 | **10. Reviews** | Client chat or DM feedback screenshot #1 |
| 26 | `review-2.png` | 1000 × 700 px | 10:7 | **10. Reviews** | Client chat or DM feedback screenshot #2 |
| 27 | `review-3.png` | 1000 × 700 px | 10:7 | **10. Reviews** | Client chat or DM feedback screenshot #3 |
| 28 | `review-4.png` | 1000 × 700 px | 10:7 | **10. Reviews** | Client chat or DM feedback screenshot #4 |
| 29 | `favicon.png` | 128 × 128 px | 1:1 | **Browser Tab / Favicon** | Yellow "Z" emblem on dark square badge |

> **Note on Image Rendering:**  
> - 9:16 video covers (`reel-*.png`, `style-*.png`, `promote-*.png`) render with `object-fit: cover`.  
> - Analytics and conversation screenshots (`insights-*.png`, `audience-*.png`, `shares-*.png`, `review-*.png`) render with `object-fit: contain` inside dark frames so **no screenshot is ever cut off or cropped**.  
> - Clicking any screenshot opens an integrated full-screen lightbox.

---

## 3. How to Edit Content (`js/config.js`)

All dynamic numbers, brand copy, social links, top reels, and quote cards are controlled from `js/config.js`. **You never need to edit HTML code.**

Open `js/config.js` in any text editor (Notepad, VS Code, etc.):

```javascript
const CONFIG = {
  // Creator Branding & Details
  name: "Zeeshan the Creative",
  fullName: "Zeeshan Shaikh",
  handle: "@zeeshan_the_creative",

  // Social Links
  instagram: "https://www.instagram.com/zeeshan_the_creative/",
  instagramDM: "https://ig.me/m/zeeshan_the_creative",
  youtube: "https://youtube.com/@zeeshanthecreative",
  facebook: "PASTE_FACEBOOK_LINK_HERE", // Paste your Facebook link here

  // Contact Details
  whatsappNumber: "919876543210", // Put your real 10-digit phone number with 91 prefix
  whatsappMessage: "Hi Zeeshan, I saw your portfolio and want to promote my brand.",
  email: "zeeshanthecreative@gmail.com",

  // Numbers Strip Counters
  stats: {
    followers: "8.4K",
    topReelViews: "665K",
    totalPosts: "173+",
    reach: "Mumbai-wide"
  },

  // 6 Most Viral Reels
  topReels: [
    { views: "665K", brand: "Brand Name", caption: "Reel caption here" },
    { views: "102K", brand: "Brand Name", caption: "Reel caption here" },
    { views: "60.7K", brand: "Brand Name", caption: "Reel caption here" },
    { views: "50.3K", brand: "Brand Name", caption: "Reel caption here" },
    { views: "31.5K", brand: "Brand Name", caption: "Reel caption here" },
    { views: "27.1K", brand: "Brand Name", caption: "Reel caption here" }
  ],

  // Quote Cards for Reviews Section
  reviews: [
    { quote: "Review text goes here." },
    { quote: "Review text goes here." },
    { quote: "Review text goes here." },
    { quote: "Review text goes here." }
  ],

  // Disclaimer / Trust Note
  disclaimerText: "Zeeshan the Creative promotes brands as a paid promotion service. We are not responsible for the products or services of promoted brands. Please verify details with the brand before purchasing."
};
```

When you save `js/config.js` and refresh your browser, the website updates automatically!

---

## 4. How to Run Locally

### Option A: Double-Click (Zero Setup)
Simply open the `zeeshan-portfolio` folder and **double-click `index.html`** in Windows File Explorer. The website will immediately open in Chrome, Edge, Brave, or your default browser.

### Option B: Local Development Server (Recommended)
If you have Python or Node installed, you can run a lightweight local server:

Using Python:
```powershell
cd zeeshan-portfolio
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

Using Node (`npx serve`):
```powershell
cd zeeshan-portfolio
npx serve .
```

---

## 5. How to Deploy for Free

You can host this website online for free with your own custom domain or free subdomain in less than 3 minutes.

### Option 1: Netlify Drop (Fastest - No Git required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Sign in or create a free Netlify account.
3. Drag and drop the whole `zeeshan-portfolio` folder into the Netlify Drop box.
4. Your site goes live instantly at a URL like `https://zeeshan-the-creative.netlify.app`.
5. (Optional) Go to **Site settings > Domain management** to connect a custom domain (e.g., `zeeshanthecreative.com`).

### Option 2: GitHub Pages (Free forever)
1. Create a free account on [github.com](https://github.com) and create a new repository (e.g. `zeeshan-portfolio`).
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Launch Zeeshan the Creative portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/zeeshan-portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, click **Settings** → **Pages**.
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Your portfolio is published at `https://<YOUR_USERNAME>.github.io/zeeshan-portfolio/`.

---

## 6. Design System & Technical Features

- **Street Poster Energy**: High contrast dark theme (`#0D0D0D`, `#161616`), bold condensed uppercase titles (`Bebas Neue` / `Anton`), and signature punchy yellow accents (`#FFC700`) with hard offset drop-shadows.
- **Strict Brand Positioning**: Formulated for Mumbai-wide reach across all categories. Excludes any limited local tags (Vikhroli appears exclusively in the footer).
- **Responsive Layout**: Fluid CSS clamp typography, CSS Grid, mobile scroll-snapping, and smooth sticky navigation.
- **Lightbox Preview**: Tap or click any analytics screenshot or reel cover to inspect it in high resolution.
- **Missing Image Safety**: If an image is missing or failed to download, an elegant styled fallback slot is rendered automatically instead of a broken browser icon.
#   Z E E S H A N - T H E - C R E A T I V E  
 