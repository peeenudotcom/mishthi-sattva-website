-- ============================================================
-- Mishthi Sattva — product weight variants
-- Run ONCE in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- Adds a `variants` column so a product can be sold in several weights, each
-- with its own price/MRP — e.g. Shakti Laddu in 250 g / 500 g / 1 Kg.
--
--   variants shape (JSON array, ordered — first = default shown on the card):
--   [
--     { "weight": "250 g", "price": 450, "mrp": 600 },
--     { "weight": "500 g", "price": 850, "mrp": 1200 },
--     { "weight": "1 Kg",  "price": 1550, "mrp": 2000 }
--   ]
--
-- A product with an empty [] variants list behaves exactly as before (its single
-- price + weight are used). Set variants per product in /admin → "Sizes".
-- ============================================================

alter table products
  add column if not exists variants jsonb not null default '[]'::jsonb;

-- (No RLS change needed — `variants` is part of the products row, already
--  world-readable and admin-writable by the existing products policies.)
