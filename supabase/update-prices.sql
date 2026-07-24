-- Mishthi Sattva — set ALL catalogue prices (24 products), from the owner's
-- WhatsApp catalogue (confirmed 23 Jul 2026). Run once in the Supabase SQL editor.
-- Products with mrp = null show just the price (no strike-through).

update products set price = 1650, mrp = 2000, updated_at = now() where slug = 'shakti-laddu';  -- Shakti Laddu
update products set price = 1300, mrp = 1600, updated_at = now() where slug = 'sampooran-laddu';  -- Sampooran Laddu
update products set price = 500, mrp = 750, updated_at = now() where slug = 'chyawanprash';  -- Sugar-Free Chyawanprash
update products set price = 200, mrp = 500, updated_at = now() where slug = 'herbal-heart-sip';  -- Herbal Heart Sip
update products set price = 800, mrp = 1000, updated_at = now() where slug = 'namkeen-mix';  -- Healthy Namkeen Mix
update products set price = 250, mrp = 350, updated_at = now() where slug = 'ayurvedic-hair-oil';  -- Ayurvedic Hair Oil
update products set price = 260, mrp = null, updated_at = now() where slug = 'protein-sattu';  -- Protein Sattu Drink
update products set price = 150, mrp = 500, updated_at = now() where slug = 'chat-masala';  -- Chat Masala
update products set price = 200, mrp = null, updated_at = now() where slug = 'shinkaji-masala';  -- Shinkaji Masala
update products set price = 150, mrp = 300, updated_at = now() where slug = 'thandai-premix';  -- Thandai Premix
update products set price = 120, mrp = null, updated_at = now() where slug = 'shahi-garam-masala';  -- Shahi Garam Masala
update products set price = 200, mrp = null, updated_at = now() where slug = 'ice-cream-premix';  -- Ice Cream Premix
update products set price = 200, mrp = 500, updated_at = now() where slug = 'shahi-sip-scoop';  -- Shahi Sip & Scoop
update products set price = 260, mrp = null, updated_at = now() where slug = 'jaljeera-sattu';  -- Jaljeera Sattu
update products set price = 260, mrp = null, updated_at = now() where slug = 'energy-sattu';  -- Energy Sattu
update products set price = 200, mrp = 500, updated_at = now() where slug = 'kesh-vash-shampoo';  -- Ayur Kesh Vash Shampoo
update products set price = 200, mrp = null, updated_at = now() where slug = 'kesh-vardaan-oil';  -- Ayur Kesh Vardaan Oil
update products set price = 200, mrp = 350, updated_at = now() where slug = 'urban-glow';  -- Instant Ubtan Glow
update products set price = 300, mrp = null, updated_at = now() where slug = 'glow-radiance-cream';  -- Glow Radiance Cream
update products set price = 200, mrp = 450, updated_at = now() where slug = 'vitamin-c-serum';  -- Vitamin C Serum
update products set price = 160, mrp = 500, updated_at = now() where slug = 'paani-puri-combo';  -- Paani Puri Combo
update products set price = 250, mrp = null, updated_at = now() where slug = 'mirchi-pickle';  -- Mirchi Pickle
update products set price = 300, mrp = null, updated_at = now() where slug = 'mango-pickle';  -- Mango Pickle
update products set price = 250, mrp = null, updated_at = now() where slug = 'nimboo-pickle';  -- Nimboo Pickle – Sweet & Spicy
