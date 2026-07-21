-- Mishthi Sattva — seed the catalogue.
-- Run AFTER schema.sql, in the Supabase SQL editor.
-- Safe to re-run: matches on slug and updates instead of duplicating.
-- NOTE: prices came from the design project's shop data — CONFIRM them before
-- the site goes live.

insert into products (slug, name, category, price, mrp, weight, short_desc, benefits, photo, in_stock, featured, sort_order)
values
  ('shakti-laddu','Shakti Laddu','ayurvedic',540,600,'500 g','Energy-rich laddus made with dry fruits, edible gum and jaggery — a traditional strength tonic with no refined sugar.',ARRAY['No Refined Sugar','Dry Fruits & Gond','Daily Strength']::text[],'/assets/shakti-laddu.png',true,false,0),
  ('sampooran-laddu','Sampooran Laddu','ayurvedic',520,560,'500 g','A wholesome blend of seeds, nuts and Ayurvedic herbs bound in jaggery — nourishment in every bite.',ARRAY['Seeds & Nuts','Herb-Infused','Preservative-Free']::text[],'/assets/sampooran-laddu.png',true,false,10),
  ('chyawanprash','Sugar-Free Chyawanprash','ayurvedic',480,540,'500 g','Inspired by the traditional Ayurvedic preparation of amla, herbs and warming spices — slow-cooked in small batches. No refined sugar.',ARRAY['Amla & 40+ Herbs','Amla & Warming Spices','No Refined Sugar']::text[],'/assets/chyawanprash.jpg',true,true,20),
  ('herbal-heart-sip','Herbal Heart Sip','ayurvedic',360,400,'200 g','A warming herbal infusion of traditional herbs. One spoon in hot water, daily.',ARRAY['Traditional Herbs','Caffeine-Free','Herbal Blend']::text[],'/assets/herbal-heart-sip.png',true,false,30),
  ('namkeen-mix','Healthy Namkeen Mix','ayurvedic',240,280,'300 g','Roasted, never fried — a guilt-free namkeen made with millets, lentils and gentle spices.',ARRAY['Roasted not Fried','No Refined Oil','High Fibre']::text[],'/assets/namkeen-mix.png',true,false,40),
  ('ayurvedic-hair-oil','Ayurvedic Hair Oil','ayurvedic',320,360,'200 ml','Cold-infused with bhringraj, amla and curry leaf to nourish the scalp and strengthen roots.',ARRAY['Bhringraj & Amla','Cold-Infused','For All Hair Types']::text[],'/assets/ayurvedic-hair-oil.png',true,false,50),
  ('protein-sattu','Protein Sattu Drink','ayurvedic',290,320,'400 g','Roasted gram sattu, naturally high in protein and fibre. Mix sweet or savoury for an instant cooling drink.',ARRAY['Plant Protein','Cooling','No Additives']::text[],'/assets/protein-sattu.png',true,false,60),
  ('chat-masala','Chat Masala','spices',120,140,'100 g','Tangy, zesty and freshly ground — the finishing touch for fruits, chaats and snacks.',ARRAY['Freshly Ground','Tangy & Zesty','No Colour Added']::text[],'/assets/chat-masala.png',true,false,70),
  ('shinkaji-masala','Shinkaji Masala','spices',150,170,'100 g','A robust homestyle blend for hearty Punjabi gravies and dals.',ARRAY['Homestyle Blend','Rich Aroma','Small Batch']::text[],'/assets/shinkaji-masala-pack.png',true,false,80),
  ('thandai-premix','Thandai Premix','spices',280,320,'250 g','Almonds, fennel, rose and saffron, ground for a festive cooling thandai. Just add milk.',ARRAY['Saffron & Rose','Festive Favourite','No Preservatives']::text[],'/assets/protein-sattu.png',true,false,90),
  ('shahi-garam-masala','Shahi Garam Masala','spices',180,200,'100 g','A royal garam masala of whole spices roasted and stone-ground for deep, layered warmth.',ARRAY['Whole Spices','Roasted & Ground','Aromatic']::text[],'/assets/shahi-garam-masala.png',true,false,100),
  ('ice-cream-premix','Ice Cream Premix','spices',260,300,'200 g','A rich, creamy ice-cream premix loaded with almonds, pistachios and cashews. Just add milk, churn and freeze.',ARRAY['Made with All Nuts','Rich & Creamy','Just Add Milk']::text[],'/assets/ice-cream-premix.png',true,false,110),
  ('shahi-sip-scoop','Shahi Sip & Scoop','spices',290,330,'200 g','A badam-milk premix that doubles as ice cream — drink it, freeze it, love it. No artificial creamers.',ARRAY['Badam Milk & Ice Cream','No Artificial Creamers','Just Add Milk']::text[],'/assets/shahi-sip-scoop.png',true,false,120),
  ('jaljeera-sattu','Jaljeera Sattu','spices',180,210,'250 g','A cooling pudina-jaljeera sattu blend — instant, tasty and rich in protein. Just add water.',ARRAY['Cooling Pudina','Rich in Protein','Instant & Tasty']::text[],'/assets/jaljeera-sattu.png',true,false,130),
  ('energy-sattu','Energy Sattu','spices',220,250,'400 g','Roasted gram sattu with jaggery for natural, sustained energy and no refined sugar.',ARRAY['Jaggery Sweetened','Natural Energy','No Refined Sugar']::text[],'/assets/energy-sattu.png',true,false,140),
  ('kesh-vash-shampoo','Ayur Kesh Vash Shampoo','hair',340,380,'200 ml','A gentle herbal shampoo with shikakai and reetha — cleanses without stripping natural oils.',ARRAY['Shikakai & Reetha','Sulphate-Free','Gentle Cleanse']::text[],'/assets/kesh-vash-shampoo.png',true,false,150),
  ('kesh-vardaan-oil','Ayur Kesh Vardaan Oil','hair',360,400,'200 ml','An intensive hair-fall oil blend of bhringraj, brahmi and sesame for thicker, stronger hair.',ARRAY['Anti Hair-Fall','Brahmi & Bhringraj','Deep Nourishment']::text[],'/assets/kesh-vardaan-oil.png',true,false,160),
  ('urban-glow','Instant Ubtan Glow','beauty',420,470,'50 g','A brightening face pack for an instant, natural radiance — perfect before an occasion.',ARRAY['Instant Radiance','Natural Actives','All Skin Types']::text[],'/assets/ubtan-glow-pack.png',true,false,170),
  ('glow-radiance-cream','Glow Radiance Cream','beauty',460,520,'50 g','A lightweight daily moisturiser with saffron and natural oils for soft, glowing skin.',ARRAY['Saffron Infused','Daily Moisture','Non-Greasy']::text[],'/assets/glow-radiance-cream-pack.png',true,false,180),
  ('vitamin-c-serum','Vitamin C Serum','beauty',540,600,'30 ml','A brightening vitamin C serum that evens tone and adds a healthy glow over time.',ARRAY['Brightening','Evens Tone','Lightweight']::text[],'/assets/vitamin-c-serum-pack.png',true,false,190),
  ('paani-puri-combo','Paani Puri Combo','special',199,230,'Kit · 24 pc','Everything for a perfect paani puri party — crisp puris, masala and tangy paani mix.',ARRAY['Complete Kit','Crispy Puris','Party Favourite']::text[],'/assets/paani-puri-combo-uniform.png',true,false,200),
  ('mirchi-pickle','Mirchi Pickle','special',180,210,'400 g','Fiery green chillies cured in mustard oil and hand-ground spices — a bold, tangy kick for every meal.',ARRAY['Mustard Oil','Small Batch','No Preservatives']::text[],'/assets/mirchi-pickle.png',true,false,210),
  ('mango-pickle','Mango Pickle','special',180,210,'400 g','Raw mango chunks slow-cured with garlic, chilli and whole spices — the classic Punjabi aam ka achaar.',ARRAY['Raw Mango','Traditional Recipe','Mustard Oil']::text[],'/assets/mango-pickle.png',true,false,220),
  ('nimboo-pickle','Nimboo Pickle – Sweet & Spicy','special',190,220,'400 g','Sun-cured lemon pickle in two moods — a mellow sweet and a bright spicy — rich in natural tang.',ARRAY['Sweet & Spicy','Sun-Cured','No Preservatives']::text[],'/assets/nimboo-pickle.png',true,false,230);
on conflict (slug) do update set
  name       = excluded.name,
  category   = excluded.category,
  price      = excluded.price,
  mrp        = excluded.mrp,
  weight     = excluded.weight,
  short_desc = excluded.short_desc,
  benefits   = excluded.benefits,
  photo      = excluded.photo,
  updated_at = now();
