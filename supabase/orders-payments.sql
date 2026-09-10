-- ============================================================
-- Mishthi Sattva — online payments
-- Run once in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- Orders are now written by the SERVER (Vercel /api), not the browser, so the
-- price a customer pays can never be edited in their browser. The server uses
-- the service_role key, which bypasses RLS — that key lives only in Vercel's
-- environment variables and must never appear in this repo or in js/config.js.
-- ============================================================

alter table orders add column if not exists email              text;
alter table orders add column if not exists pincode            text;
alter table orders add column if not exists state              text;
alter table orders add column if not exists payment_method     text not null default 'cod';   -- online | cod | whatsapp
alter table orders add column if not exists payment_status     text not null default 'pending'; -- pending | paid | failed | refunded
alter table orders add column if not exists razorpay_order_id  text;
alter table orders add column if not exists razorpay_payment_id text;
alter table orders add column if not exists paid_at            timestamptz;

create index if not exists orders_rzp_idx on orders (razorpay_order_id);

-- Stock: let the shop show "Only 3 left" and stop overselling during festivals.
alter table products add column if not exists stock int;   -- null = not tracked

-- ------------------------------------------------------------
-- RLS: the browser must no longer INSERT orders directly.
-- Dropping the public insert policy means a customer cannot fabricate an order
-- row (or its total) — every order now comes through the server, which checks
-- the payment signature first.
-- ------------------------------------------------------------
drop policy if exists orders_public_insert on orders;

-- Signed-in customers may read THEIR OWN orders (matched on email), so the
-- account page can show an order history. Nobody can read anyone else's.
alter table orders add column if not exists user_email text;
drop policy if exists orders_own_read on orders;
create policy orders_own_read on orders
  for select to authenticated
  using (user_email is not null and lower(user_email) = lower(auth.jwt() ->> 'email'));
