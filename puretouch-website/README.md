# PureTouch Hand Sanitizer — Product Website (Student Laboratory Project)

An open, transparent, accessible, and deploy-ready product website for the **PureTouch** hand sanitizer student laboratory project. Built strictly with standard **HTML5**, **CSS3**, and **vanilla JavaScript** (no external framework bloat).

---

## 1. Quick Start: Local Run Instructions

No build steps, compilers, or heavy dependencies required. All editable parameters (brand details, prices, contact channels, formulation data, video paths, endpoints) live in [`js/config.js`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/js/config.js).

### Option A: Direct Open (Easiest)
Simply double-click [`index.html`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/index.html) in your file manager to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option B: Local HTTP Server (Recommended for video and module testing)
Open a terminal in the project directory:

```bash
# Using Python 3
python -m http.server 8000
# Then visit: http://localhost:8000
```

Or using Node:
```bash
npx serve .
# Then open the displayed localhost URL
```

---

## 2. Project Folder Structure

```
puretouch-website/
├── 404.html                          # Custom 404 error page matching brand theme
├── disclaimer.html                   # Medical, formulation, & fire-safety disclaimer
├── index.html                        # Main product single-page website
├── manifest.webmanifest              # Web App Manifest (PWA metadata & icon definitions)
├── privacy.html                      # Privacy policy (honest browser-only / connected data states)
├── README.md                         # This comprehensive project documentation & guide
├── robots.txt                        # Search engine crawler instructions
├── sitemap.xml                       # XML Sitemap covering all site routes
├── terms.html                        # Academic demonstration terms of use
├── assets/
│   ├── images/
│   │   ├── apple-touch-icon.png      # 180×180 Apple touch icon (pure PNG)
│   │   ├── demo-qr.png               # Demo QR code (encodes: DEMO ONLY - NOT A REAL PAYMENT QR)
│   │   ├── favicon-32x32.png         # 32×32 PNG favicon
│   │   ├── favicon.svg               # SVG favicon with emerald droplet & leaf contour
│   │   ├── final-product-beaker.jpg  # Step 4: Finished sanitizer solution in 100 ml beaker (135 KB)
│   │   ├── final-product-beaker.png  # Original high-res laboratory capture
│   │   ├── logo.svg                  # Vector PureTouch brand logo & wordmark
│   │   ├── puretouch-hero.jpg        # Hero packaging render & buy card image (54 KB)
│   │   ├── puretouch-social-share.jpg# 1200×630 OpenGraph & Twitter Card share banner (66 KB)
│   │   ├── step1-titration-setup.jpg # Step 1: Titration / cylinder apparatus setup (121 KB)
│   │   ├── step1-titration-setup.png # Original high-res laboratory capture
│   │   ├── step2-measuring-pouring.jpg# Step 2: Measuring & pouring liquid into beaker (121 KB)
│   │   ├── step2-measuring-pouring.png# Original high-res laboratory capture
│   │   ├── step3-mixing.jpg          # Step 3: Combining components into beaker (154 KB)
│   │   └── step3-mixing.png          # Original high-res laboratory capture
│   └── videos/                       # Place real MP4 (H.264 + AAC) files here
├── css/
│   └── styles.css                    # Responsive, accessible stylesheet (WCAG AA, Dark mode)
└── js/
    ├── config.js                     # Central editable configuration
    └── main.js                       # Vanilla JavaScript logic & interactions
```

---

## 3. Product Facts & Measured Quantities

All claims and facts adhere strictly to scientific transparency:
* **Brand:** PureTouch
* **Category:** Hand sanitizer (student lab project)
* **Tagline:** PureTouch — Clean Hands, Confident Moments.
* **Proposed Pack:** Approximately 100 ml
* **Proposed Regular Price:** ₹49 (labeled: *"Proposed price — subject to confirmation"*)
* **Possible Introductory Price:** ₹39 (not confirmed)
* **Contact Number:** `92702*****` (Masked; displayed exactly as supplied)
* **Product Made By (Team):** **Bibisara Shaikh, Anushka Khaire, Payal Bandagar** (displayed in About intro, Team section, footer, and JSON-LD `creator`)
* **Measured Batch Quantities (Sum: 101.5 ml):**
  * Ethanol: 75 ml
  * Glycerol: 2 ml
  * Hydrogen peroxide: 4.5 ml
  * Distilled water: 20 ml
  * *Important Note:* The sum of measured ingredients is **101.5 ml**, not an exact 100 ml. We do not equate 75 ml of ethanol with 75% final alcohol content; true final alcohol percentage requires certified laboratory testing.

---

## 4. Information Still Needed (Checklist of Placeholders)

The following items are configured as transparent placeholders in [`js/config.js`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/js/config.js) and should be updated as soon as laboratory records and faculty guidance are finalized:

- [ ] **Full 10-Digit Contact Number (`phoneFull`):** Provide the full phone number (e.g. `"9270212345"`) to activate the direct "Call for Enquiry" button.
- [ ] **Full WhatsApp Number (`whatsappFull`):** Provide country code + 10 digits (e.g. `"919270212345"`) to activate direct WhatsApp enquiries with prefilled order details.
- [ ] **Enquiry Form Endpoint (`enquiryEndpoint`):** Connect Formspree or Google Apps Script. Until configured, form submissions validate honestly in demo mode without sending data.
- [ ] **Feedback Form Endpoint (`feedbackEndpoint`):** Connect a backend endpoint to persist user feedback.
- [ ] **Merchant UPI ID & Payee Name (`upiId`, `payeeName`, `qrImage`):** Until verified payment details are supplied, the payment QR code remains explicitly marked **"DEMO ONLY — NOT A REAL PAYMENT QR"**.
- [ ] **Packaging Photo & Rights Confirmation:** The current hero image (`puretouch-hero.jpg`) illustrates a 30 mL spray container concept. Replace with your own packaging photo or confirm licensing rights, noting that the target project pack is ~100 ml.
- [ ] **Making & Testing Videos:** Place MP4 files in `assets/videos/` and register them in `config.makingVideos` and `config.testingVideo`.
- [ ] **Batch & Traceability Records:**
  - Batch number
  - Manufacture date
  - Best-before / expiry date
  - Final measured batch yield
  - Prepared by (team member names)
- [ ] **Stock Strengths & Lab Results:**
  - Source ethanol purity/strength
  - Source hydrogen peroxide stock strength
  - Certified alcohol percentage by qualified laboratory (Gas Chromatography / Pycnometer)
- [ ] **Team Roles & Academic Details:**
  - Roles for **Bibisara Shaikh**, **Anushka Khaire**, and **Payal Bandagar** (currently set to *"Role to be added"*)
  - Team member photos / LinkedIn profiles (initials avatars BS, AK, PB shown currently)
  - College / Institution name
  - Department
  - Course / Subject
  - Academic Year (e.g. 2026–2027)
  - Faculty Project Guide name
- [ ] **Shipping & Returns Policy:** Specify actual delivery and return guidelines if public distribution is approved.

---

## 4B. Standard Product Website Checklist Audit

Audit of the PureTouch website against the 29 standard product website elements:

| # | Standard Element | PureTouch Implementation | Status |
|---|---|---|---|
| 1 | **Header & Navigation** | PureTouch SVG logo, exactly 4 main links (`#about`, `#ingredients`, `#buy`, `#feedback`), sticky nav, mobile menu, quick share button | **Done** |
| 2 | **Hero Section** | Undistorted product image in mint frame, brand name, tagline, short description, primary & secondary CTAs | **Done** |
| 3 | **Trust Strip** | Only verified facts: Student-made, Ingredients fully listed, Lab process shown, Proposed ₹49 / ~100 ml | **Done** |
| 4 | **Product Overview** | 3 info cards (Purpose, Appearance, Prepared in), pack size (~100 ml), student lab project context | **Done** |
| 5 | **Product Gallery** | Interactive photo gallery with accessible lightbox (`Esc` to close, keyboard navigation), placeholder tile for more photos | **Added** |
| 6 | **Features & Benefits** | General ingredient roles supported by formulation facts; zero unverified medical or germ-kill claims | **Done** |
| 7 | **Ingredients & Composition**| Full list (Ethanol 75 ml, Glycerol 2 ml, H2O2 4.5 ml, Water 20 ml = 101.5 ml), roles, safety notes, volume verification warning, Formulation Summary Table | **Done** |
| 8 | **How to Use** | Step-by-step directions block clearly marked *"General guidance, to be confirmed by the team"* | **Added** |
| 9 | **Safety, Warnings, Storage** | Precautions block: external use only, flammability warning, keep from eyes/children, cool storage | **Added** |
| 10 | **Making Process / Story** | Photo timeline (steps 1 to 4) using real laboratory photos; making-video player with honest placeholder | **Done** |
| 11 | **Quality & Testing** | 3-way evidence legend, results card (*"Testing information to be added"*), testing video placeholder, testing checklist card with pending items | **Done** |
| 12 | **Pricing** | Proposed regular price ₹49, possible introductory price ₹39 (not confirmed), market reference table (Savlon ₹50/₹58.65/₹69) | **Done** |
| 13 | **Buy or Enquire** | Quantity selector (1–20), live total calculation, Order Summary box (*"Enquiry summary, not a confirmed order"*), enquiry form with validation, conditional Call & WhatsApp buttons with prefilled order text | **Done** |
| 14 | **Payment** | Demo QR code clearly marked **"DEMO ONLY — NOT A REAL PAYMENT QR"**; enlarge dialog; verified UPI & copy buttons enabled only when configured | **Done** |
| 15 | **Shipping, Delivery, Returns**| Structured block with honest placeholder (*"Not yet decided / to be added upon project commercialization"*) | **Placeholder** |
| 16 | **Reviews & Feedback** | Interactive feedback form with 1–5 star rating, honeypot spam protection, live counter (`0 / 500`); reviews block displays *"No reviews yet. Be the first."* (no fake reviews) | **Done** |
| 17 | **FAQ** | Accessible `<details>`/`<summary>` accordion with 7 honest Q&As (what it is, ingredients, commercial status, pricing, verification, pack size) | **Added** |
| 18 | **About the Makers** | **Bibisara Shaikh, Anushka Khaire, Payal Bandagar** named in About intro, Team cards (initials avatars BS, AK, PB; roles as *"Role to be added"*), footer, and JSON-LD `creator`; college, dept, course, year, guide placeholders | **Done** |
| 19 | **Contact** | Masked phone `92702*****` displayed as given; email, college address, working hours, and map location placeholders | **Placeholder** |
| 20 | **Social Links & Sharing** | Web Share API with clipboard fallback; social links shown only if real URLs are supplied in config | **Done** |
| 21 | **Legal Pages** | Dedicated draft pages: Privacy Policy (`privacy.html`), Terms of Use (`terms.html`), Product Disclaimer (`disclaimer.html`) | **Added** |
| 22 | **Footer** | Brand, one-line summary, 4 quick links, legal links, team credit line, copyright, college project note | **Done** |
| 23 | **SEO & Social Sharing** | Semantic HTML5, meta tags, OpenGraph (1200×630 banner), Twitter Card, JSON-LD Schema without fake ratings, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | **Done** |
| 24 | **Performance** | All images compressed under 155 KB (target < 200 KB), explicit width/height, lazy loading, lightweight CSS/JS | **Done** |
| 25 | **Accessibility** | WCAG AA color contrast, skip-to-content link, labeled inputs, focus rings, ARIA live alerts, keyboard navigation | **Done** |
| 26 | **Responsive Design** | Fluid layouts (`clamp()`, CSS Grid, Flexbox), mobile sticky bottom bar, zero horizontal scroll from 320px to 1440px | **Done** |
| 27 | **Error & Edge States** | Custom `404.html` error page, video error fallback, honeypot rejection, form field validation errors | **Added** |
| 28 | **Analytics** | Privacy-friendly analytics placeholder in `config.js` and commented in HTML head (off by default) | **Placeholder** |
| 29 | **Deployment** | Step-by-step instructions for GitHub Pages, Netlify, custom domains, and form backend connections | **Done** |

---

## 5. Deployment Instructions

### Deploying to GitHub Pages
1. Initialize git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Deploy PureTouch student product website"
   ```
2. Create a repository on GitHub (e.g. `puretouch-sanitizer`) and push:
   ```bash
   git remote add origin https://github.com/<your-username>/puretouch-sanitizer.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/puretouch-sanitizer/`.

### Deploying to Netlify
1. **Drag-and-Drop Method:**
   - Log in to [Netlify](https://www.netlify.com/).
   - Go to the **Sites** dashboard.
   - Drag and drop the `puretouch-website` folder directly into the upload area.
   - Netlify deploys the site instantly with a free SSL certificate.
2. **Git-Integrated Method:**
   - Connect your GitHub repository.
   - Build settings: leave **Build command** empty; set **Publish directory** to `.`.
   - Click **Deploy Site**.

### Connecting a Custom Domain
1. In Netlify or GitHub Pages, go to **Domain Settings**.
2. Add your custom domain (e.g., `puretouch.example.com`).
3. Add the corresponding `CNAME` or `A` records in your DNS provider (Cloudflare, GoDaddy, Namecheap).
4. Update `https://puretouch-sanitizer.example.com/` in `sitemap.xml`, `robots.txt`, and canonical tags in `index.html`.

---

## 6. Connecting Backend Endpoints (Enquiry & Feedback)

### Option 1: Formspree (Quickest Setup)
1. Register a free account at [Formspree.io](https://formspree.io/).
2. Create two forms:
   - "PureTouch Enquiries"
   - "PureTouch Feedback"
3. Copy the Formspree endpoint URLs and paste them into [`js/config.js`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/js/config.js):
   ```javascript
   enquiryEndpoint: "https://formspree.io/f/xbjvkqez",
   feedbackEndpoint: "https://formspree.io/f/mqkrvbzp",
   ```

### Option 2: Google Sheets via Google Apps Script (Free & Private)
1. Open a new Google Sheet named "PureTouch Submissions".
2. Create two tabs: `Enquiries` and `Feedback`.
3. In Google Sheets, click **Extensions** > **Apps Script**.
4. Paste the following script:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet();
     var data = JSON.parse(e.postData.contents);
     if (data.quantity !== undefined) {
       sheet.getSheetByName("Enquiries").appendRow([new Date(), data.name, data.contact, data.quantity, data.message, data.proposedTotal]);
     } else {
       sheet.getSheetByName("Feedback").appendRow([new Date(), data.name, data.rating, data.category, data.comment]);
     }
     return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Click **Deploy** > **New Deployment** > Select type **Web app**.
   - Execute as: *Me*
   - Who has access: *Anyone*
6. Copy the Web App URL and set it as `enquiryEndpoint` and `feedbackEndpoint` in `js/config.js`.

---

## 7. Tested-Features Checklist

| Feature | Status | Verification Detail |
|---|---|---|
| **Navigation Links** | Verified | Exactly four main links (`#about`, `#ingredients`, `#buy`, `#feedback`) |
| **Mobile Menu** | Verified | Accessible button with `aria-expanded`, Esc key closure, focus handling |
| **Active Nav Highlighting** | Verified | IntersectionObserver sets `active` class and `aria-current="page"` |
| **Brand Identity** | Verified | PureTouch SVG logo in header & footer, favicon set (SVG + 32px PNG + Apple touch icon) |
| **OpenGraph & Twitter Card** | Verified | 1200×630 banner generated from real product bottle (`puretouch-social-share.jpg`) |
| **JSON-LD Schema** | Verified | Valid Product Schema with price 49 INR; zero fake aggregateRating or reviews |
| **Hero Packaging Frame** | Verified | Undistorted containment (`object-fit: contain`) with configurable caption |
| **Trust Strip** | Verified | Displays only 4 verified facts: Student-made, Ingredients listed, Lab process shown, Proposed ₹49 / ~100 ml |
| **Directions & Precautions** | Verified | Structured block explicitly marked "General guidance, to be confirmed by the team" |
| **Product Lightbox** | Verified | Accessible modal dialog with keyboard navigation (Esc to close) and placeholder tile |
| **Making Timeline** | Verified | Steps 1–4 with real lab photos (`final-product-beaker.jpg`, `step1` through `step3`) |
| **FAQ Accordion** | Verified | 7 honest Q&As using accessible `<details>`/`<summary>` |
| **Meet the Team** | Verified | Placeholders for College, Dept, Course, Guide, and student member cards |
| **Ingredients Breakdown** | Verified | 4 cards, 101.5 ml total, stock strength notes, safety notices, and verification warning |
| **Formulation Table** | Verified | Clean responsive data table with 101.5 ml total row |
| **Batch Traceability** | Verified | Card with Batch, Mfd, Expiry, Yield, and Prepared By placeholders |
| **Testing Legend & Card** | Verified | 3-way legend (Demonstration, Proposed, Lab); card with honest placeholder |
| **Testing Checklist** | Verified | Config-driven; all 6 items pending until verified with date and evidence |
| **Quantity Selector** | Verified | Min 1, Max 20; live calculation (`Qty × ₹49`); updates Order Summary box |
| **Enquiry Validation** | Verified | Name >= 2 chars, Qty integer 1–20, Message >= 5 chars, inline error messages |
| **Enquiry Submission** | Verified | Demonstrates honest notice when `enquiryEndpoint` is unset |
| **WhatsApp Prefill** | Verified | Generates dynamic prefilled message with selected name, quantity, and total cost |
| **Call & WhatsApp Buttons** | Verified | Hidden when numbers are masked; active only when full phone numbers are configured |
| **Demo Payment QR** | Verified | Prominently marked "DEMO ONLY — NOT A REAL PAYMENT QR"; enlarge dialog |
| **UPI App & Copy Buttons** | Verified | Hidden until verified `upiId` and `payeeName` are entered in config |
| **Shipping & Return Block** | Verified | Honest placeholder stating terms are not yet decided |
| **Feedback Form** | Verified | 1–5 star rating, honeypot spam protection, character counter, honest not-saved message |
| **Reviews Display** | Verified | Shows "No reviews yet. Be the first." until real backend reviews exist |
| **Legal Pages** | Verified | `privacy.html`, `terms.html`, and `disclaimer.html` draft pages linked in footer |
| **Custom 404 Page** | Verified | `404.html` styled with PureTouch emerald and mint palette |
| **Responsive Widths** | Verified | Tested clean layout without horizontal overflow at 320px, 375px, 768px, 1024px, 1440px |
| **Performance & Image Size**| Verified | All photos optimized under 155 KB (well within 200 KB target) |
| **Console Errors** | Verified | 0 syntax errors, 0 runtime exceptions, 0 broken asset paths |

---

## 8. Specific Project Answers (Required Delivery Notes)

1. **Which image is the hero?**
   - The hero image is [`assets/images/puretouch-hero.jpg`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/assets/images/puretouch-hero.jpg). It shows the uploaded white packaging spray bottle with a teal window.
   - *Note on packaging:* The label visible on the bottle render shows "30 mL", while the project's laboratory recipe is designed for a proposed pack of approximately 100 ml. This distinction is clearly explained in the hero caption, the FAQ accordion, and config notes.

2. **Is the QR code demo or real?**
   - The QR code ([`assets/images/demo-qr.png`](file:///C:/Users/Bibisara/.gemini/antigravity/scratch/puretouch-website/assets/images/demo-qr.png)) is **DEMO ONLY**. It encodes only the text string: `"DEMO ONLY - NOT A REAL PAYMENT QR"`. It cannot receive funds or execute transactions.

3. **Which purchase/enquiry actions actually work right now?**
   - **Interactive Quantity & Total Calculator:** Fully working. Changing quantity (1–20) dynamically calculates the live proposed total (e.g., 2 × ₹49 = ₹98) and updates the Order Summary box.
   - **Enquiry Form Validation:** Fully working. Validates name, quantity, and message inline. Because `enquiryEndpoint` is currently empty, it honestly informs the user: *"Your details look valid, but this enquiry has NOT been sent to anyone: no server is connected to this website yet."*
   - **Feedback Form Validation:** Fully working. Validates 1–5 stars, category, and message length with live character count (`0 / 500`). Shows honest message: *"Thank you! Your feedback passed validation, but it was NOT saved because no backend is connected yet."*
   - **QR Enlargement Dialog:** Fully working. Clicking "Enlarge QR" opens the modal dialog.
   - **Lightbox Gallery:** Fully working. Clicking product photos opens the lightbox with keyboard navigation.

4. **What is needed to enable real payments and direct contact?**
   - **To enable Direct Phone Calls:** Enter your complete 10-digit phone number in `js/config.js` under `phoneFull: "92702XXXXX"`. The "Call for Enquiry" button will appear automatically.
   - **To enable Direct WhatsApp Enquiries:** Enter your full WhatsApp number with country code in `js/config.js` under `whatsappFull: "9192702XXXXX"`. The "Enquire on WhatsApp" button will appear and automatically open `wa.me` with a prefilled message containing the buyer's name, selected quantity, and calculated total.
   - **To enable Real Payments:** In `js/config.js`:
     1. Set `upiId` to your verified merchant UPI address (e.g. `"puretouch@bank"`).
     2. Set `payeeName` to the registered legal payee name.
     3. Place your verified bank/merchant QR image in `assets/images/` and point `qrImage` to it.
     4. This replaces the demo QR and automatically enables the "Open in UPI app" and "Copy UPI ID" buttons.
   - **To enable Real Form Storage:** Enter a Formspree or Google Apps Script URL in `enquiryEndpoint` and `feedbackEndpoint`.
