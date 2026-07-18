/* Mishthi Sattva — Shop catalogue.
   Real product range from the brand; INR prices, weights, ratings and copy
   added for the storefront. Exposes window.MSShopData. */

const MS_CATEGORIES = [
  { id: "ayurvedic", name: "Ayurvedic & Health", tint: "var(--forest)" },
  { id: "spices",    name: "Spices & Masala",    tint: "var(--gold)" },
  { id: "hair",      name: "Hair Care",          tint: "var(--forest-deep)" },
  { id: "beauty",    name: "Beauty & Skincare",  tint: "var(--gold-soft)" },
  { id: "special",   name: "Special Foods",      tint: "var(--whatsapp)" },
];

/* photo: real asset path (optional). Otherwise a tinted leaf tile is drawn. */
const MS_PRODUCTS = [
  // ---- Ayurvedic & Health ----
  { id: "shakti-laddu", name: "Shakti Laddu", cat: "ayurvedic", price: 540, mrp: 600, weight: "500 g", rating: 4.9, reviews: 128, tags: ["bestseller", "sugar-free"], badge: "Bestseller", photo: "../../assets/shakti-laddu.png",
    desc: "Energy-rich laddus made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.",
    facts: ["No Refined Sugar", "Dry Fruits & Gond", "Daily Strength"] },
  { id: "sampooran-laddu", name: "Sampooran Laddu", cat: "ayurvedic", price: 520, mrp: 560, weight: "500 g", rating: 4.8, reviews: 86, tags: ["sugar-free"], photo: "../../assets/sampooran-laddu.png",
    desc: "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.",
    facts: ["Seeds & Nuts", "Herb-Infused", "Preservative-Free"] },
  { id: "chyawanprash", name: "Sugar-Free Chyawanprash", cat: "ayurvedic", price: 480, mrp: 540, weight: "500 g", rating: 5.0, reviews: 214, tags: ["bestseller", "sugar-free", "new"], badge: "Featured", photo: "../../assets/chyawanprash.jpg",
    desc: "A modern take on the 5,000-year-old recipe — slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar.",
    facts: ["Amla & 40+ Herbs", "Supports Immunity", "No Refined Sugar"] },
  { id: "herbal-heart-sip", name: "Herbal Heart Sip", cat: "ayurvedic", price: 360, mrp: 400, weight: "200 g", rating: 4.7, reviews: 54, tags: [], photo: "../../assets/herbal-heart-sip.png",
    desc: "A warming herbal infusion blended to support heart health and circulation. One spoon in hot water, daily.",
    facts: ["Heart-Friendly", "Caffeine-Free", "Herbal Blend"] },
  { id: "namkeen-mix", name: "Healthy Namkeen Mix", cat: "ayurvedic", price: 240, mrp: 280, weight: "300 g", rating: 4.6, reviews: 72, tags: [], photo: "../../assets/namkeen-mix.png",
    desc: "Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.",
    facts: ["Roasted not Fried", "No Refined Oil", "High Fibre"] },
  { id: "ayurvedic-hair-oil", name: "Ayurvedic Hair Oil", cat: "ayurvedic", price: 320, mrp: 360, weight: "200 ml", rating: 4.8, reviews: 96, tags: ["bestseller"], photo: "../../assets/ayurvedic-hair-oil.png",
    desc: "Cold-infused with bhringraj, amla and curry leaf to nourish the scalp and strengthen roots.",
    facts: ["Bhringraj & Amla", "Cold-Infused", "For All Hair Types"] },
  { id: "protein-sattu", name: "Protein Sattu Drink", cat: "ayurvedic", price: 290, mrp: 320, weight: "400 g", rating: 4.7, reviews: 61, tags: ["new"], badge: "New", photo: "../../assets/protein-sattu.png",
    desc: "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.",
    facts: ["Plant Protein", "Cooling", "No Additives"] },

  // ---- Spices & Masala ----
  { id: "chat-masala", name: "Chat Masala", cat: "spices", price: 120, mrp: 140, weight: "100 g", rating: 4.8, reviews: 143, tags: ["bestseller"], photo: "../../assets/chat-masala.png",
    desc: "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.",
    facts: ["Freshly Ground", "Tangy & Zesty", "No Colour Added"] },
  { id: "shinkaji-masala", name: "Shinkaji Masala", cat: "spices", price: 150, mrp: 170, weight: "100 g", rating: 4.7, reviews: 38, tags: [], photo: "../../assets/shinkaji-masala-pack.png",
    desc: "A robust homestyle blend for hearty Punjabi gravies and dals.",
    facts: ["Homestyle Blend", "Rich Aroma", "Small Batch"] },
  { id: "thandai-premix", name: "Thandai Premix", cat: "spices", price: 280, mrp: 320, weight: "250 g", rating: 4.9, reviews: 67, tags: ["new"], badge: "Seasonal", photo: "../../assets/protein-sattu.png",
    desc: "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.",
    facts: ["Saffron & Rose", "Festive Favourite", "No Preservatives"] },
  { id: "shahi-garam-masala", name: "Shahi Garam Masala", cat: "spices", price: 180, mrp: 200, weight: "100 g", rating: 4.9, reviews: 112, tags: ["bestseller"], photo: "../../assets/shahi-garam-masala.png",
    desc: "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.",
    facts: ["Whole Spices", "Roasted & Ground", "Aromatic"] },
  { id: "ice-cream-premix", name: "Ice Cream Premix", cat: "spices", price: 260, mrp: 300, weight: "200 g", rating: 4.9, reviews: 24, tags: ["new"], badge: "New", photo: "../../assets/ice-cream-premix.png",
    desc: "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.",
    facts: ["Made with All Nuts", "Rich & Creamy", "Just Add Milk"] },
  { id: "shahi-sip-scoop", name: "Shahi Sip & Scoop", cat: "spices", price: 290, mrp: 330, weight: "200 g", rating: 4.9, reviews: 19, tags: ["new"], badge: "New", photo: "../../assets/shahi-sip-scoop.png",
    desc: "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.",
    facts: ["Badam Milk & Ice Cream", "No Artificial Creamers", "Just Add Milk"] },
  { id: "jaljeera-sattu", name: "Jaljeera Sattu", cat: "spices", price: 180, mrp: 210, weight: "250 g", rating: 4.8, reviews: 27, tags: ["new"], photo: "../../assets/jaljeera-sattu.png",
    desc: "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.",
    facts: ["Cooling Pudina", "Rich in Protein", "Instant & Tasty"] },
  { id: "energy-sattu", name: "Energy Sattu", cat: "spices", price: 220, mrp: 250, weight: "400 g", rating: 4.8, reviews: 31, tags: ["new"], photo: "../../assets/energy-sattu.png",
    desc: "Roasted gram sattu with jaggery for natural, sustained energy and no refined sugar.",
    facts: ["Jaggery Sweetened", "Natural Energy", "No Refined Sugar"] },

  // ---- Hair Care ----
  { id: "kesh-vash-shampoo", name: "Ayur Kesh Vash Shampoo", cat: "hair", price: 340, mrp: 380, weight: "200 ml", rating: 4.7, reviews: 88, tags: ["bestseller"], photo: "../../assets/kesh-vash-shampoo.png",
    desc: "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.",
    facts: ["Shikakai & Reetha", "Sulphate-Free", "Gentle Cleanse"] },
  { id: "kesh-vardaan-oil", name: "Ayur Kesh Vardaan Oil", cat: "hair", price: 360, mrp: 400, weight: "200 ml", rating: 4.8, reviews: 74, tags: [], photo: "../../assets/kesh-vardaan-oil.png",
    desc: "An intensive hair-fall oil blend of bhringraj, brahmi and sesame for thicker, stronger hair.",
    facts: ["Anti Hair-Fall", "Brahmi & Bhringraj", "Deep Nourishment"] },

  // ---- Beauty & Skincare ----
  { id: "urban-glow", name: "Instant Ubtan Glow", cat: "beauty", price: 420, mrp: 470, weight: "50 g", rating: 4.6, reviews: 52, tags: ["new"], badge: "New", photo: "../../assets/ubtan-glow-pack.png",
    desc: "A brightening face pack for an instant, natural radiance — perfect before an occasion.",
    facts: ["Instant Radiance", "Natural Actives", "All Skin Types"] },
  { id: "glow-radiance-cream", name: "Glow Radiance Cream", cat: "beauty", price: 460, mrp: 520, weight: "50 g", rating: 4.7, reviews: 63, tags: ["bestseller"], photo: "../../assets/glow-radiance-cream-pack.png",
    desc: "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.",
    facts: ["Saffron Infused", "Daily Moisture", "Non-Greasy"] },
  { id: "vitamin-c-serum", name: "Vitamin C Serum", cat: "beauty", price: 540, mrp: 600, weight: "30 ml", rating: 4.8, reviews: 91, tags: ["bestseller", "new"], photo: "../../assets/vitamin-c-serum-pack.png",
    desc: "A brightening vitamin C serum that evens tone and adds a healthy glow over time.",
    facts: ["Brightening", "Evens Tone", "Lightweight"] },

  // ---- Special Foods ----
  { id: "paani-puri-combo", name: "Paani Puri Combo", cat: "special", price: 199, mrp: 230, weight: "Kit · 24 pc", rating: 4.9, reviews: 156, tags: ["bestseller"], badge: "Party Pack", photo: "../../assets/paani-puri-combo-uniform.png",
    desc: "Everything for a perfect paani puri party — crisp puris, masala and tangy paani mix.",
    facts: ["Complete Kit", "Crispy Puris", "Party Favourite"] },
  // ---- Pickles (Special Foods) ----
  { id: "mirchi-pickle", name: "Mirchi Pickle", cat: "special", price: 180, mrp: 210, weight: "400 g", rating: 4.8, reviews: 64, tags: ["bestseller"], badge: "Bestseller", photo: "../../assets/mirchi-pickle.png",
    desc: "Fiery green chillies cured in mustard oil and hand-ground spices — a bold, tangy kick for every meal.",
    facts: ["Mustard Oil", "Small Batch", "No Preservatives"] },
  { id: "mango-pickle", name: "Mango Pickle", cat: "special", price: 180, mrp: 210, weight: "400 g", rating: 4.9, reviews: 98, tags: ["bestseller"], photo: "../../assets/mango-pickle.png",
    desc: "Raw mango chunks slow-cured with garlic, chilli and whole spices — the classic Punjabi aam ka achaar.",
    facts: ["Raw Mango", "Traditional Recipe", "Mustard Oil"] },
  { id: "nimboo-pickle", name: "Nimboo Pickle – Sweet & Spicy", cat: "special", price: 190, mrp: 220, weight: "400 g", rating: 4.8, reviews: 51, tags: ["new"], badge: "New", photo: "../../assets/nimboo-pickle.png",
    desc: "Sun-cured lemon pickle in two moods — a mellow sweet and a bright spicy — rich in natural tang.",
    facts: ["Sweet & Spicy", "Sun-Cured", "No Preservatives"] },
];

window.MSShopData = { MS_CATEGORIES, MS_PRODUCTS };
