-- ============================================================
-- Mishthi Sattva — rich product details
-- Run once in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- Adds the fields behind the product page's seven sections:
--   Product Description → Wellness Benefits → Ingredients →
--   Nutritional Information → Storage & Shelf Life → Our Promise →
--   Customer Reviews  (reviews already live in their own table)
--
-- Every field is optional: a section simply hides on the site when empty,
-- so nothing breaks for products you haven't filled in yet.
-- ============================================================

alter table products add column if not exists long_desc         text;
alter table products add column if not exists wellness_benefits jsonb  not null default '[]'::jsonb;  -- [{title, text}]
alter table products add column if not exists ingredients       text[] not null default '{}';         -- ["Almonds", "Jaggery", ...]
alter table products add column if not exists allergens         text;                                 -- "Contains tree nuts, milk"
alter table products add column if not exists nutrition         jsonb  not null default '{}'::jsonb;  -- {serving:"100 g", rows:[{label,value}]}
alter table products add column if not exists storage_info      text;
alter table products add column if not exists shelf_life        text;
alter table products add column if not exists promise           text[] not null default '{}';         -- overrides the brand-wide default
alter table products add column if not exists usage_info        text;                                 -- "How to use" (shown inside Description)
alter table products add column if not exists fssai_no          text;                                 -- per-product licence, if different

-- Seed the description from the short blurb so no product page opens empty.
update products set long_desc = short_desc where long_desc is null and short_desc is not null;

-- NOTE ON ACCURACY (important, this is a food business):
-- Ingredients, allergens and nutritional values are legally declarable
-- information under FSSAI / Legal Metrology rules. Fill them from your own
-- recipe and lab/kitchen figures in the admin panel — do not guess them.
