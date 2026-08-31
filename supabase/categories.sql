-- ============================================================
-- Mishthi Sattva — Categories (owner-managed) + product regroup
-- Run ONCE in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- What this does:
--   1. Creates a `categories` table (public read, admin write) so the owner
--      can add / rename / delete shop categories from the admin panel.
--   2. Seeds the 4 new categories.
--   3. Re-files every product into one of the 4 (best-fit for now — the owner
--      can move any product to another category later in /admin).
--
-- Safe to re-run: creates are `if not exists`, seeds `on conflict` upsert.
-- ============================================================

-- ------------------------------------------------------------
-- 1. CATEGORIES table  (catalogue grouping — public read, admin write)
-- ------------------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,          -- referenced by products.category
  name        text not null,                 -- shown on the shop cards
  tint        text default '',               -- accent colour for the card
  sort_order  int  default 0,                -- left-to-right order on the shop
  created_at  timestamptz default now()
);

alter table categories enable row level security;

drop policy if exists categories_public_read on categories;
create policy categories_public_read on categories
  for select using (true);

drop policy if exists categories_admin_write on categories;
create policy categories_admin_write on categories
  for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- 2. Seed the 4 categories (upsert so re-running just refreshes names/tints)
-- ------------------------------------------------------------
insert into categories (slug, name, tint, sort_order) values
  ('sweetness', 'Wellness with Sweetness', 'var(--gold)',                                        1),
  ('sip',       'Sattvic Sip',             'var(--forest)',                                       2),
  ('immunity',  'Immunity Booster',        'color-mix(in oklab, var(--forest) 55%, var(--gold))', 3),
  ('bodycare',  'Sattvic Body Care',       'var(--gold-soft)',                                    4)
on conflict (slug) do update
  set name = excluded.name, tint = excluded.tint, sort_order = excluded.sort_order;

-- ------------------------------------------------------------
-- 3. Re-file products into the 4 new categories (best-fit).
--    Matches by slug; any product not listed keeps its current category.
--    The owner can reassign anything afterwards in /admin.
-- ------------------------------------------------------------
update products set category = 'sweetness'
  where slug in ('shakti-laddu','sampooran-laddu','ice-cream-premix','paani-puri-combo');

update products set category = 'sip'
  where slug in ('herbal-heart-sip','protein-sattu','jaljeera-sattu','thandai-premix','shahi-sip-scoop');

update products set category = 'immunity'
  where slug in ('chyawanprash','namkeen-mix','chat-masala','shahi-garam-masala','shinkaji-masala',
                 'nitya-poshan-formula-kids','nitya-poshan-formula-men','nitya-poshan-formula-women');

update products set category = 'bodycare'
  where slug in ('kesh-vardaan-oil','kesh-vash-shampoo','glow-radiance-cream','urban-glow','vitamin-c-serum');

-- ------------------------------------------------------------
-- 4. (Optional) Any product still on an old category after the moves above
--    lands in Immunity Booster so nothing is orphaned. Comment out if you'd
--    rather see leftovers and file them by hand.
-- ------------------------------------------------------------
update products set category = 'immunity'
  where category not in ('sweetness','sip','immunity','bodycare');

-- ============================================================
-- AFTER RUNNING THIS:
--   • The shop shows the 4 new category cards, populated correctly.
--   • /admin → "Categories" lets you add / rename / delete more.
--   • To keep the offline snapshot (data.js) in sync later, TARAhut runs
--     `npm run sync` which pulls categories + products from this database.
-- ============================================================
