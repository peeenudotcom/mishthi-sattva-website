/* Mishthi Sattva — Shop catalogue (instant-load snapshot).
   AUTO-GENERATED from the live Supabase 'products' table by scripts/sync-catalogue.mjs.
   Do not hand-edit product prices here — change them in the admin panel, then run
   `npm run sync` to regenerate this file. Presentation extras (rating, reviews,
   tags, badge, long desc) are preserved per product across syncs.
   Exposes window.MSShopData. */

const MS_CATEGORIES = [
  { id: "ayurvedic", name: "Ayurvedic & Health", tint: "var(--forest)" },
  { id: "spices", name: "Spices & Masala", tint: "var(--gold)" },
  { id: "hair", name: "Hair Care", tint: "var(--forest-deep)" },
  { id: "beauty", name: "Beauty & Skincare", tint: "var(--gold-soft)" },
  { id: "special", name: "Special Foods", tint: "color-mix(in oklab, var(--forest) 55%, var(--gold))" },
];

const MS_PRODUCTS = [
  // ---- Ayurvedic & Health ----
  { id: "namkeen-mix", name: "Healthy Namkeen Mix", cat: "ayurvedic", price: 800, mrp: 1000, weight: "1 Kg", rating: 4.6, reviews: 72, tags: [], photo: "../../assets/namkeen-mix.png",
    desc: "Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.",
    facts: ["Roasted not Fried","No Refined Oil","High Fibre"] },
  { id: "herbal-heart-sip", name: "Herbal Heart Sip", cat: "ayurvedic", price: 200, mrp: 500, weight: "40 g", rating: 4.7, reviews: 54, tags: [], photo: "../../assets/herbal-heart-sip.png",
    desc: "A warming herbal infusion blended to support heart health and circulation. One pinch in hot water, daily.",
    facts: ["Heart-Friendly","Caffeine-Free","Herbal Blend"] },
  { id: "protein-sattu", name: "Protein Sattu Drink", cat: "ayurvedic", price: 260, mrp: 500, weight: "400 g", rating: 4.7, reviews: 61, tags: ["new"], badge: "New", photo: "../../assets/protein-sattu.png",
    desc: "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.",
    facts: ["Plant Protein","Cooling","No Additives"] },
  { id: "sampooran-laddu", name: "Sampooran Laddu", cat: "ayurvedic", price: 1300, mrp: 1800, weight: "1 Kg", rating: 4.8, reviews: 86, tags: ["sugar-free"], photo: "../../assets/sampooran-laddu.png",
    desc: "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.",
    facts: ["Seeds & Nuts","Herb-Infused","Preservative-Free"] },
  { id: "shakti-laddu", name: "Shakti Laddu", cat: "ayurvedic", price: 850, mrp: 1200, weight: "500 g", rating: 4.9, reviews: 128, tags: ["bestseller","sugar-free"], badge: "Bestseller", photo: "../../assets/shakti-laddu.png",
    desc: "Energy-rich laddu made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.",
    facts: ["No Refined Sugar","Dry Fruits & Gond","Daily Strength"] },
  { id: "chyawanprash", name: "Sugar-Free Chyawanprash", cat: "ayurvedic", price: 600, mrp: 1000, weight: "500 g", rating: 5, reviews: 214, tags: ["bestseller","sugar-free","new"], badge: "Featured", photo: "../../assets/chyawanprash.jpg",
    desc: "A modern take on the 5,000-year-old recipe — slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar.",
    facts: ["Amla & 40+ Herbs","Supports Immunity","No Refined Sugar"] },

  // ---- Spices & Masala ----
  { id: "chat-masala", name: "Chat Masala", cat: "spices", price: 150, mrp: 500, weight: "100 g", rating: 4.8, reviews: 143, tags: ["bestseller"], photo: "../../assets/chat-masala.png",
    desc: "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.",
    facts: ["Freshly Ground","Tangy & Zesty","No Colour Added"] },
  { id: "ice-cream-premix", name: "Ice Cream Premix", cat: "spices", price: 200, mrp: 500, weight: "100 g", rating: 4.9, reviews: 24, tags: ["new"], badge: "New", photo: "../../assets/ice-cream-premix.png",
    desc: "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.",
    facts: ["Made with All Nuts","Rich & Creamy","Just Add Milk"] },
  { id: "jaljeera-sattu", name: "Jaljeera Sattu", cat: "spices", price: 260, mrp: 500, weight: "400 g", rating: 4.8, reviews: 27, tags: ["new"], photo: "../../assets/jaljeera-sattu.png",
    desc: "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.",
    facts: ["Cooling Pudina","Rich in Protein","Instant & Tasty"] },
  { id: "shahi-garam-masala", name: "Shahi Garam Masala", cat: "spices", price: 120, mrp: 300, weight: "50 g", rating: 4.9, reviews: 112, tags: ["bestseller"], photo: "../../assets/shahi-garam-masala.png",
    desc: "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.",
    facts: ["Whole Spices","Roasted & Ground","Aromatic"] },
  { id: "shahi-sip-scoop", name: "Shahi Sip & Scoop", cat: "spices", price: 200, mrp: 500, weight: "100 g", rating: 4.9, reviews: 19, tags: ["new"], badge: "New", photo: "../../assets/shahi-sip-scoop.png",
    desc: "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.",
    facts: ["Badam Milk & Ice Cream","No Artificial Creamers","Just Add Milk"] },
  { id: "shinkaji-masala", name: "Shinkaji Masala", cat: "spices", price: 200, mrp: 500, weight: "100 g", rating: 4.7, reviews: 38, tags: [], photo: "../../assets/shinkaji-masala-pack.png",
    desc: "A robust homestyle blend for hearty Punjabi gravies and dals.",
    facts: ["Homestyle Blend","Rich Aroma","Small Batch"] },
  { id: "thandai-premix", name: "Thandai Premix", cat: "spices", price: 150, mrp: 300, weight: "50 g", rating: 4.9, reviews: 67, tags: ["new"], badge: "Seasonal", photo: "../../assets/protein-sattu.png",
    desc: "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.",
    facts: ["Saffron & Rose","Festive Favourite","No Preservatives"] },

  // ---- Hair Care ----
  { id: "kesh-vardaan-oil", name: "AyurKesh Vardaan Hair Oil", cat: "hair", price: 250, mrp: 350, weight: "100 ml", rating: 4.8, reviews: 74, tags: [], photo: "../../assets/kesh-vardaan-oil.png",
    desc: "An intensive hair-fall oil blend of bhringraj, brahmi, sesame and amaltas pods for thicker, stronger hair and to help reverse greying.",
    facts: ["Anti Hair-Fall","Brahmi & Bhringraj","Deep Nourishment"] },
  { id: "kesh-vash-shampoo", name: "AyurKesh Wash", cat: "hair", price: 200, mrp: 500, weight: "100 g", rating: 4.7, reviews: 88, tags: ["bestseller"], photo: "../../assets/kesh-vash-shampoo.png",
    desc: "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.",
    facts: ["Shikakai & Reetha","Sulphate-Free","Gentle Cleanse"] },

  // ---- Beauty & Skincare ----
  { id: "glow-radiance-cream", name: "Glow Radiance Cream", cat: "beauty", price: 300, mrp: 500, weight: "50 g", rating: 4.7, reviews: 63, tags: ["bestseller"], photo: "../../assets/glow-radiance-cream-pack.png",
    desc: "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.",
    facts: ["Saffron Infused","Daily Moisture","Non-Greasy"] },
  { id: "urban-glow", name: "Instant Ubtan Glow", cat: "beauty", price: 200, mrp: 350, weight: "100 g", rating: 4.6, reviews: 52, tags: ["new"], badge: "New", photo: "../../assets/ubtan-glow-pack.png",
    desc: "A brightening face pack for an instant, natural radiance — perfect before an occasion.",
    facts: ["Instant Radiance","Natural Actives","All Skin Types"] },
  { id: "vitamin-c-serum", name: "Vitamin C Serum", cat: "beauty", price: 200, mrp: 450, weight: "100 ml", rating: 4.8, reviews: 91, tags: ["bestseller","new"], photo: "../../assets/vitamin-c-serum-pack.png",
    desc: "A brightening vitamin C serum that evens tone and adds a healthy glow over time.",
    facts: ["Brightening","Evens Tone","Lightweight"] },

  // ---- Special Foods ----
  { id: "nitya-poshan-formula-kids", name: "Nitya Poshan Formula- Kids", cat: "special", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-kids-1784983057177.png",
    desc: "A wholesome daily protein powder made for growing kids — clean nutrition from our kitchen.",
    facts: ["For Kids","Daily Nutrition","No Additives"] },
  { id: "nitya-poshan-formula-men", name: "Nitya Poshan Formula- Men", cat: "special", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-men-1784983323822.png",
    desc: "A daily protein powder blend for men — wholesome nutrition to support everyday strength.",
    facts: ["For Men","Daily Nutrition","No Additives"] },
  { id: "nitya-poshan-formula-women", name: "Nitya Poshan Formula- Women", cat: "special", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-women-1784983223006.png",
    desc: "A daily protein powder blend for women — wholesome nutrition for everyday wellness.",
    facts: ["For Women","Daily Nutrition","No Additives"] },
  { id: "paani-puri-combo", name: "Paani Puri Combo", cat: "special", price: 160, mrp: 500, weight: "Kit · 100 pc", rating: 4.9, reviews: 156, tags: ["bestseller"], badge: "Party Pack", photo: "../../assets/paani-puri-combo-uniform.png",
    desc: "Everything for a perfect paani puri party — crisp puris, masala and tangy paani mix.",
    facts: ["Complete Kit","Crispy Puris","Party Favourite"] },
];

window.MSShopData = { MS_CATEGORIES, MS_PRODUCTS };
