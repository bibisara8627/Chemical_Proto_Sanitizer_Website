/* ==========================================================
   PURETOUCH PRODUCT CONFIGURATION
   Central editable configuration file for brand, prices, contacts,
   ingredients, videos, payment, team, testing, and endpoints.
   ========================================================== */

window.SITE_CONFIG = {
  /* ---- Brand & Identity ---- */
  brandName: "PureTouch",
  tagline: "PureTouch — Clean Hands, Confident Moments.",
  category: "Hand sanitizer (student lab project)",
  size: "Approx. 100 ml",              // proposed pack size
  price: "₹49",                         // proposed regular price (not confirmed)
  priceNumeric: 49,                     // numeric value for live quantity calculations
  introPrice: "₹39",                    // possible introductory price (not confirmed)
  introPriceNumeric: 39,
  priceDisclaimer: "Proposed price — subject to confirmation",

  /* ---- Hero Image & Notes ---- */
  heroImage: "assets/images/puretouch-hero.jpg",
  heroImageCredit: "Pack design image. The label shows 30 mL; our proposed pack is approx. 100 ml. Conceptual packaging render.",

  /* ---- Product Gallery (Lightbox) ---- */
  // Add real bottle/packaging photos here. If 1 or 0 images, a "More photos to be added" placeholder tile is shown.
  galleryImages: [
    {
      src: "assets/images/puretouch-hero.jpg",
      thumb: "assets/images/puretouch-hero.jpg",
      alt: "PureTouch hand sanitizer packaging render (30 mL container)",
      caption: "Conceptual packaging sample. Note: Label shows 30 mL; project target pack is ~100 ml."
    }
  ],

  /* ---- Contact Channels (Honesty Rule: never guess masked digits) ---- */
  phoneDisplay: "92702*****",           // exactly as supplied
  phoneFull: "",                        // Full 10-digit number (e.g. "9270212345") -> enables "Call for Enquiry"
  whatsappFull: "",                     // Full WhatsApp number with country code (e.g. "919270212345") -> enables WhatsApp button with prefilled enquiry

  /* ---- Endpoints (Empty = honest demo mode, nothing sent) ---- */
  enquiryEndpoint: "",                  // e.g. "https://formspree.io/f/your-id" or Google Apps Script URL
  feedbackEndpoint: "",                 // e.g. "https://formspree.io/f/your-feedback-id" or Apps Script URL
  reviewsEndpoint: "",                  // Optional GET endpoint returning real verified review objects: [{ name, rating, category, comment, date }]
  reviews: [],                          // Real approved reviews. Kept empty until real submissions exist

  /* ---- Payment Details (Demo QR until real verified details are supplied) ---- */
  upiId: "",                            // Verified merchant UPI ID (e.g. "puretouch@okhdfcbank") -> enables "Copy UPI ID" & "Open in UPI app"
  payeeName: "",                        // Registered legal name on that UPI ID
  qrImage: "",                          // Verified QR image path (e.g. "assets/images/real-upi-qr.png") -> replaces demo QR

  /* ---- Ingredients (Supplied measured quantities, NOT final concentrations) ---- */
  ingredientsTotalVolume: "101.5 ml",
  ingredients: [
    {
      name: "Ethanol",
      qty: "75 ml",
      icon: "🧪",
      role: "Alcohol base",
      stockStrength: "To be recorded",
      safety: "Flammable liquid and vapor. Keep away from heat, sparks, open flames, and hot surfaces.",
      explanation: "Alcohol is the main component in alcohol-based sanitizers. The exact strength (purity) of the supply needs to be confirmed by the lab record before determining the final concentration."
    },
    {
      name: "Glycerol",
      qty: "2 ml",
      icon: "💧",
      role: "Humectant",
      stockStrength: "To be recorded",
      safety: "Generally recognized as skin-friendly; helps counteract the drying effect of alcohol on skin.",
      explanation: "Added to help retain skin moisture and reduce dryness from alcohol exposure."
    },
    {
      name: "Hydrogen peroxide",
      qty: "4.5 ml",
      icon: "⚗️",
      role: "Formulation additive",
      stockStrength: "To be recorded",
      safety: "Oxidizing agent. Can irritate eyes and skin at higher stock concentrations; handling requires standard lab eye protection.",
      explanation: "Used in published sanitizer formulations to help keep the solution itself free of bacterial spore contamination."
    },
    {
      name: "Distilled water",
      qty: "20 ml",
      icon: "🫧",
      role: "Diluent / solvent",
      stockStrength: "Standard laboratory grade",
      safety: "Safe handling solvent.",
      explanation: "Dissolves and blends the components, adjusting the mixture to its target working volume."
    }
  ],

  /* ---- Batch & Traceability (Placeholders until lab record confirmation) ---- */
  batchTraceability: {
    batchNumber: "To be added",
    manufactureDate: "To be added",
    bestBefore: "To be added",
    finalMeasuredVolume: "To be added (Supplied batch: 101.5 ml)",
    preparedBy: "To be added"
  },

  /* ---- Directions & Precautions (General guidance, marked to be confirmed) ---- */
  directions: [
    "Apply a small amount (approximately 2–3 ml) to dry, visibly clean hands.",
    "Rub all surfaces of both hands together thoroughly, including palms, backs, between fingers, and fingertips, until hands are dry.",
    "Allow hands to air-dry completely; do not wipe off immediately with a towel."
  ],
  precautions: [
    "For external use only. Keep away from eyes. If contact occurs, rinse eyes immediately with clean water.",
    "Do not ingest or inhale vapors directly. Keep out of reach of children.",
    "Alcohol-based products are flammable: keep away from open flame, heat sources, and sparks.",
    "Store in a cool, well-ventilated location, tightly capped. Discontinue use if skin irritation or rash develops."
  ],

  /* ---- Frequently Asked Questions (Accordion) ---- */
  faq: [
    {
      q: "What is PureTouch?",
      a: "PureTouch is a clear liquid hand sanitizer formulation prepared, measured, and documented by students as an academic laboratory project."
    },
    {
      q: "What is in it?",
      a: "Our measured laboratory batch contains 75 ml ethanol, 2 ml glycerol, 4.5 ml hydrogen peroxide, and 20 ml distilled water (total measured components: 101.5 ml). Full formulation breakdown is listed in the Ingredients section."
    },
    {
      q: "Is it for sale yet?",
      a: "No. PureTouch is currently an educational course project and has not received commercial production approval or drug authority licensing. You can submit an enquiry to express interest."
    },
    {
      q: "Why is the price 'proposed'?",
      a: "The regular price of ₹49 (and introductory price of ₹39) per ~100 ml bottle is an estimate based on small-batch ingredient costs. Final pricing will be confirmed only after packaging, yield verification, and institutional review."
    },
    {
      q: "How do I enquire?",
      a: "Fill out the enquiry form on this page with your name, quantity of interest, and message. If full contact numbers are provided in config, you can also use WhatsApp or Call buttons."
    },
    {
      q: "Is the alcohol percentage verified?",
      a: "Not yet. While 75 ml of ethanol was measured out, the finished alcohol percentage by volume (v/v) depends on the stock strength of raw ethanol and liquid volume contraction. It requires validation by an accredited analytical lab."
    },
    {
      q: "Why does the photo show a different size?",
      a: "The packaging render displays a 30 mL spray container used to explore label styling, while our laboratory batch recipe is intended for a proposed pack of approximately 100 ml."
    }
  ],

  /* ---- Made By / Meet the Team & Academic Info ----
     Honesty rule: names used exactly as specified; roles remain "Role to be added"
     unless supplied. Stored as an array so it can be edited easily. */
  team: [
    {
      name: "Bibisara Shaikh",
      role: "Role to be added",
      photo: "",
      linkedin: ""
    },
    {
      name: "Anushka Khaire",
      role: "Role to be added",
      photo: "",
      linkedin: ""
    },
    {
      name: "Payal Bandagar",
      role: "Role to be added",
      photo: "",
      linkedin: ""
    }
  ],

  academic: {
    college: "To be added / College Name",
    department: "To be added / Department of Chemistry",
    course: "To be added / Subject / Academic Course",
    academicYear: "To be added / Academic Year (e.g. 2026–2027)",
    guide: "To be added / Faculty Project Guide"
  },

  /* ---- Testing Checklist Card ----
     Honesty rule: Never mark passed unless verified with date and evidence.
     Status options: "pending", "passed" */
  testingChecklist: [
    {
      id: "appearance",
      name: "Appearance & Transparency",
      description: "Visual inspection for clear, colorless liquid free from cloudiness or suspended particles.",
      status: "pending",
      date: "",
      evidence: ""
    },
    {
      id: "clarity",
      name: "Clarity & Color",
      description: "Comparison against distilled water control for color neutrality and uniform optical clarity.",
      status: "pending",
      date: "",
      evidence: ""
    },
    {
      id: "consistency",
      name: "Consistency & Viscosity",
      description: "Verification of smooth liquid dispense without stickiness or layer separation.",
      status: "pending",
      date: "",
      evidence: ""
    },
    {
      id: "leak",
      name: "Packaging Leak Check",
      description: "Bottle filled, sealed with dispenser cap, inverted for 24 hours, and pressure-checked.",
      status: "pending",
      date: "",
      evidence: ""
    },
    {
      id: "volume",
      name: "Final Volume Measurement",
      description: "Precise measurement of actual finished batch yield from the 101.5 ml measured input.",
      status: "pending",
      date: "",
      evidence: ""
    },
    {
      id: "alcohol",
      name: "Alcohol % by Qualified Lab",
      description: "Gas chromatography or pycnometer testing by an accredited laboratory for true % v/v.",
      status: "pending",
      date: "",
      evidence: ""
    }
  ],

  /* ---- Videos ----
     Place MP4 files in assets/videos/ and list here.
     Example: { title: "Step 3 Mixing", src: "assets/videos/mixing.mp4", poster: "assets/images/step3-mixing.jpg", caption: "Laboratory mixing" } */
  makingVideos: [],
  testingVideo: {
    title: "",
    src: "",
    poster: "",
    caption: ""
  },

  /* ---- Shipping, Delivery & Returns Policy ---- */
  shippingPolicy: "Not yet decided / to be added upon project commercialization.",
  returnsPolicy: "Not yet decided / to be added upon project commercialization.",

  /* ---- Contact Card Info ---- */
  contactInfo: {
    maskedPhone: "92702*****",
    email: "contact@puretouch-example.edu (Placeholder)",
    collegeAddress: "Chemistry Department, College Campus (To be added)",
    workingHours: "Academic term weekdays, 10:00 AM – 4:00 PM (Placeholder)",
    mapEmbedUrl: ""                      // Leave empty to show "Map location to be added" placeholder
  },

  /* Social links (empty = not displayed) */
  socialLinks: {
    github: "",
    linkedin: "",
    instagram: ""
  },

  /* ---- Privacy-Friendly Analytics Placeholder (Off by default) ---- */
  analytics: {
    enabled: false,
    provider: "plausible", // or "umami"
    scriptUrl: "",         // e.g. "https://plausible.io/js/script.js"
    domain: ""             // e.g. "puretouch-sanitizer.example.com"
  }
};
