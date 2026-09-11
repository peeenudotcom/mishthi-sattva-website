/* Mishthi Sattva — Shop catalogue (instant-load snapshot).
   AUTO-GENERATED from the live Supabase 'products' table by scripts/sync-catalogue.mjs.
   Do not hand-edit product prices here — change them in the admin panel, then run
   `npm run sync` to regenerate this file. Presentation extras (rating, reviews,
   tags, badge, long desc) are preserved per product across syncs.
   Exposes window.MSShopData. */

const MS_CATEGORIES = [
  { id: "sweetness", name: "Wellness with Sweetness", tint: "var(--gold)" },
  { id: "sip", name: "Sattvic Sip", tint: "var(--forest)" },
  { id: "immunity", name: "Immunity Booster", tint: "color-mix(in oklab, var(--forest) 55%, var(--gold))" },
  { id: "bodycare", name: "Sattvic Body Care", tint: "var(--gold-soft)" },
  { id: "handcrafted-pickles", name: "Handcrafted Pickles", tint: "var(--forest)" },
  { id: "masala-premix", name: "Masala & Premix", tint: "var(--gold-soft)" },
  { id: "munching", name: "Munching", tint: "var(--gold)" },
  { id: "ms-special", name: "MS Special", tint: "var(--forest-deep)" },
];

const MS_PRODUCTS = [
  // ---- Wellness with Sweetness ----
  { id: "ice-cream-premix", name: "Ice Cream Premix", cat: "sweetness", price: 200, mrp: 500, weight: "100 g", rating: 4.9, reviews: 24, tags: ["new"], badge: "New", photo: "../../assets/ice-cream-premix.png",
    desc: "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.",
    facts: ["Made with All Nuts","Rich & Creamy","Just Add Milk"],
    long_desc: "A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze." },
  { id: "sampooran-laddu", name: "Sampooran Laddu", cat: "sweetness", price: 1300, mrp: 1800, weight: "1 Kg", rating: 4.8, reviews: 86, tags: ["sugar-free"], photo: "../../assets/sampooran-laddu.png",
    desc: "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.",
    facts: ["Seeds & Nuts","Herb-Infused","Preservative-Free"],
    long_desc: "A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite." },
  { id: "shakti-laddu", name: "Shakti Laddu", cat: "sweetness", price: 450, mrp: 600, weight: "250 g", rating: 4.9, reviews: 128, tags: ["bestseller","sugar-free"], badge: "Bestseller", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/shakti-laddu-1786079527965.png",
    desc: "Energy-rich laddu made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.",
    facts: ["No Refined Sugar","Dry Fruits & Gond","Daily Strength"],
    variants: [{"weight":"250 g","price":450,"mrp":600},{"weight":"500 g","price":850,"mrp":1200},{"weight":"1 Kg","price":1650,"mrp":2200}],
    long_desc: "A wholesome blend of traditional ingredients crafted to naturally support your everyday energy and vitality. Shakti Laddu brings together the goodness of nuts, seeds, natural sweeteners and nourishing ingredients in every delicious bite.",
    ingredients: ["Nourishing blend of","nuts like almonds, cashews, walnuts, raisins and","seeds like pumpkin seeds, flaxseeds, melon seeds, watermelon seeds, sesame seeds, sunflower seeds, poppy seeds.","Natural sweetener - unprocessed dates.","White and black pepper,","Ginger powder and","Nutmeg to boost immunity and flavour.","Cow’s pure ghee"],
    storage_info: "Store in an airtight container in a cool and dry place. Keep away from direct sunlight and moisture. Refrigerate in summers. Can consume till 6 months if refrigerated.",
    shelf_life: "6 months from the date of packaging",
    promise: ["Made with carefully selected ingredients, traditional wisdom and no compromise on quality. Every Mishthi Sattva product is crafted with love, purity and a focus on wholesome goodness."] },

  // ---- Sattvic Sip ----
  { id: "jaljeera-sattu", name: "Jaljeera Sattu", cat: "sip", price: 260, mrp: 500, weight: "400 g", rating: 4.8, reviews: 27, tags: ["new"], photo: "../../assets/jaljeera-sattu.png",
    desc: "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.",
    facts: ["Cooling Pudina","Rich in Protein","Instant & Tasty"],
    long_desc: "A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water." },
  { id: "protein-sattu", name: "Protein Sattu Drink", cat: "sip", price: 260, mrp: 500, weight: "400 g", rating: 4.7, reviews: 61, tags: ["new"], badge: "New", photo: "../../assets/protein-sattu.png",
    desc: "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.",
    facts: ["Plant Protein","Cooling","No Additives"],
    long_desc: "Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink." },
  { id: "shahi-sip-scoop", name: "Shahi Sip & Scoop", cat: "sip", price: 200, mrp: 500, weight: "100 g", rating: 4.9, reviews: 19, tags: ["new"], badge: "New", photo: "../../assets/shahi-sip-scoop.png",
    desc: "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.",
    facts: ["Badam Milk & Ice Cream","No Artificial Creamers","Just Add Milk"],
    long_desc: "A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers." },
  { id: "thandai-premix", name: "Thandai Premix", cat: "sip", price: 150, mrp: 300, weight: "50 g", rating: 4.9, reviews: 67, tags: ["new"], badge: "Seasonal", photo: "../../assets/protein-sattu.png",
    desc: "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.",
    facts: ["Saffron & Rose","Festive Favourite","No Preservatives"],
    long_desc: "Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk." },

  // ---- Immunity Booster ----
  { id: "chat-masala", name: "Chat Masala", cat: "immunity", price: 150, mrp: 400, weight: "100 g", rating: 4.8, reviews: 143, tags: ["bestseller"], photo: "../../assets/chat-masala.png",
    desc: "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.",
    facts: ["Freshly Ground","Tangy & Zesty","No Colour Added"],
    long_desc: "Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks." },
  { id: "nitya-poshan-formula-kids", name: "Nitya Poshan Formula- Kids", cat: "immunity", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-kids-1784983057177.png",
    desc: "A wholesome daily protein powder made for growing kids — clean nutrition from our kitchen.",
    facts: ["For Kids","Daily Nutrition","No Additives"],
    long_desc: "Protein Powder for Kids" },
  { id: "nitya-poshan-formula-men", name: "Nitya Poshan Formula- Men", cat: "immunity", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-men-1784983323822.png",
    desc: "A daily protein powder blend for men — wholesome nutrition to support everyday strength.",
    facts: ["For Men","Daily Nutrition","No Additives"],
    long_desc: "Protein Powder for Men" },
  { id: "nitya-poshan-formula-women", name: "Nitya Poshan Formula- Women", cat: "immunity", price: 750, mrp: 1000, weight: "500 g", rating: 4.8, reviews: 0, tags: ["new"], badge: "New", photo: "https://wiuokqmggxkonxvzrnsb.supabase.co/storage/v1/object/public/product-photos/nitya-poshan-formula-women-1784983223006.png",
    desc: "A daily protein powder blend for women — wholesome nutrition for everyday wellness.",
    facts: ["For Women","Daily Nutrition","No Additives"],
    long_desc: "Protein Powder for Women" },
  { id: "shinkaji-masala", name: "Shinkaji Masala", cat: "immunity", price: 200, mrp: 350, weight: "100 g", rating: 4.7, reviews: 38, tags: [], photo: "../../assets/shinkaji-masala-pack.png",
    desc: "A robust homestyle blend for hearty Punjabi gravies and dals.",
    facts: ["Homestyle Blend","Rich Aroma","Small Batch"],
    long_desc: "A robust homestyle blend for hearty Punjabi gravies and dals." },

  // ---- Sattvic Body Care ----
  { id: "kesh-vardaan-oil", name: "AyurKesh Vardaan Hair Oil", cat: "bodycare", price: 250, mrp: 350, weight: "100 ml", rating: 4.8, reviews: 74, tags: [], photo: "../../assets/kesh-vardaan-oil.png",
    desc: "An intensive hair-fall oil blend of bhringraj, brahmi, sesame and amaltas pods for thicker, stronger hair and to help reverse greying.",
    facts: ["Anti Hair-Fall","Brahmi & Bhringraj","Deep Nourishment"],
    long_desc: "An intensive hair-fall oil blend of bhringraj, brahmi, sesame and amaltas pods for thicker, stronger hair and to help reverse greying." },
  { id: "kesh-vash-shampoo", name: "AyurKesh Wash", cat: "bodycare", price: 200, mrp: 500, weight: "100 g", rating: 4.7, reviews: 88, tags: ["bestseller"], photo: "../../assets/kesh-vash-shampoo.png",
    desc: "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.",
    facts: ["Shikakai & Reetha","Sulphate-Free","Gentle Cleanse"],
    long_desc: "A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils." },
  { id: "glow-radiance-cream", name: "Glow Radiance Cream", cat: "bodycare", price: 300, mrp: 500, weight: "50 g", rating: 4.7, reviews: 63, tags: ["bestseller"], photo: "../../assets/glow-radiance-cream-pack.png",
    desc: "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.",
    facts: ["Saffron Infused","Daily Moisture","Non-Greasy"],
    long_desc: "A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin." },
  { id: "urban-glow", name: "Instant Ubtan Glow", cat: "bodycare", price: 200, mrp: 350, weight: "100 g", rating: 4.6, reviews: 52, tags: ["new"], badge: "New", photo: "../../assets/ubtan-glow-pack.png",
    desc: "A brightening face pack for an instant, natural radiance — perfect before an occasion.",
    facts: ["Instant Radiance","Natural Actives","All Skin Types"],
    long_desc: "A brightening face pack for an instant, natural radiance — perfect before an occasion." },
  { id: "vitamin-c-serum", name: "Vitamin C Serum", cat: "bodycare", price: 200, mrp: 450, weight: "100 ml", rating: 4.8, reviews: 91, tags: ["bestseller","new"], photo: "../../assets/vitamin-c-serum-pack.png",
    desc: "A brightening vitamin C serum that evens tone and adds a healthy glow over time.",
    facts: ["Brightening","Evens Tone","Lightweight"],
    long_desc: "A brightening vitamin C serum that evens tone and adds a healthy glow over time." },

  // ---- Masala & Premix ----
  { id: "shahi-garam-masala", name: "Shahi Garam Masala", cat: "masala-premix", price: 120, mrp: 300, weight: "50 g", rating: 4.9, reviews: 112, tags: ["bestseller"], photo: "../../assets/shahi-garam-masala.png",
    desc: "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.",
    facts: ["Whole Spices","Roasted & Ground","Aromatic"],
    long_desc: "A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth." },

  // ---- Munching ----
  { id: "namkeen-mix", name: "Healthy Murmura Namkeen Mix", cat: "munching", price: 600, mrp: 850, weight: "1 Kg", rating: 4.6, reviews: 72, tags: [], photo: "../../assets/namkeen-mix.png",
    desc: "Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.",
    facts: ["Roasted not Fried","No Refined Oil","High Fibre"],
    long_desc: "A light and crunchy namkeen mix made with puffed and flattened rice, nuts, seeds, peanuts and roasted chana—prepared in pure cow ghee for wholesome flavour." },

  // ---- MS Special ----
  { id: "chyawanprash", name: "Chyawanprash", cat: "ms-special", price: 600, mrp: 1000, weight: "500 g", rating: 5, reviews: 214, tags: ["bestseller","sugar-free","new"], badge: "Featured", photo: "../../assets/chyawanprash.jpg",
    desc: "A modern take on the 5,000-year-old recipe — slow-cooked with amla, herbs and natural sweeteners. Zero refined sugar.",
    facts: ["Amla & 40+ Herbs","Supports Immunity","No Refined Sugar"],
    long_desc: "Inspired by the traditional Ayurvedic preparation of amla, herbs and warming spices — slow-cooked in small batches. No refined sugar." },
  { id: "herbal-heart-sip", name: "Herbal Heart Sip", cat: "ms-special", price: 200, mrp: 450, weight: "1 month Pack", rating: 4.7, reviews: 54, tags: [], photo: "../../assets/herbal-heart-sip.png",
    desc: "A warming herbal infusion blended to support heart health and circulation. One pinch in hot water, daily.",
    facts: ["Heart-Friendly","Caffeine-Free","Herbal Blend"],
    long_desc: "A warming herbal infusion of traditional herbs. One pinch in hot water, daily." },
];

window.MSShopData = { MS_CATEGORIES, MS_PRODUCTS };
