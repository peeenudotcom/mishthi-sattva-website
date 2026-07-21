-- ============================================================
-- Mishthi Sattva — correct the catalogue prices
-- Run in the Supabase SQL editor, AFTER schema.sql + seed-products.sql
--
-- WHY: the seed used the design project's placeholder prices, which were all
-- wrong (Shakti Laddu was seeded at ₹540 but actually sells at ₹1,650).
-- Prices below are read from the official WhatsApp catalogue (21 Jul 2026).
-- ============================================================

-- ---- 1. CONFIRMED prices, from the WhatsApp catalogue ----
update products set price = 1650, mrp = 2000, updated_at = now() where slug = 'shakti-laddu';
update products set price = 1300, mrp = 1600, updated_at = now() where slug = 'sampooran-laddu';
update products set price =  200, mrp =  500, updated_at = now() where slug = 'herbal-heart-sip';
update products set price =  800, mrp = 1000, updated_at = now() where slug = 'namkeen-mix';
update products set price =  250, mrp =  350, updated_at = now() where slug = 'ayurvedic-hair-oil';
update products set price =  150, mrp =  500, updated_at = now() where slug = 'chat-masala';
update products set price =  150, mrp =  300, updated_at = now() where slug = 'thandai-premix';
update products set price =  200, mrp =  500, updated_at = now() where slug = 'shahi-sip-scoop';
update products set price =  200, mrp =  350, updated_at = now() where slug = 'urban-glow';
update products set price =  200, mrp =  450, updated_at = now() where slug = 'vitamin-c-serum';
update products set price =  160, mrp =  500, updated_at = now() where slug = 'paani-puri-combo';
update products set price =  200, mrp =  500, updated_at = now() where slug = 'kesh-vash-shampoo';

-- ---- 2. UNCONFIRMED prices -> show "Ask for price" instead of a wrong number ----
-- These are still sold but aren't in the WhatsApp catalogue, so their seeded
-- prices were never verified. NULL price makes the site say "Ask for price".
-- Replace each with a real `update ... set price = X, mrp = Y` as you confirm them.
update products
   set price = null, mrp = null, updated_at = now()
 where slug in (
   'protein-sattu',        -- Protein Sattu Drink
   'shinkaji-masala',      -- Shinkaji Masala
   'shahi-garam-masala',   -- Shahi Garam Masala
   'ice-cream-premix',     -- Ice Cream Premix
   'jaljeera-sattu',       -- Jaljeera Sattu
   'energy-sattu',         -- Energy Sattu
   'kesh-vardaan-oil',     -- Ayur Kesh Vardaan Oil
   'glow-radiance-cream',  -- Glow Radiance Cream
   'mirchi-pickle',        -- Mirchi Pickle
   'mango-pickle',         -- Mango Pickle
   'nimboo-pickle',        -- Nimboo Pickle
   'chyawanprash'          -- "Sugar-Free Chyawanprash": treated as a separate
                           -- product from the catalogue's "Premium Chyawanprash"
                           -- (₹500/₹750), so its own price is unconfirmed.
 );

-- ---- 3. check the result ----
select name,
       coalesce(price::text, 'ASK')  as price,
       coalesce(mrp::text,   '-')    as mrp
  from products
 order by price is null, price desc nulls last;
