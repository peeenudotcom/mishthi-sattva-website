-- ============================================================
-- Mishthi Sattva — discount codes
-- Run once in the Supabase SQL editor (SQL Editor → New query → Run).
--
-- SECURITY: a discount is money. Codes are checked and applied by the SERVER
-- (Vercel /api), never in the browser — otherwise anyone could open developer
-- tools and give themselves 100% off. Nothing here is publicly readable: the
-- browser sends a code and is told the resulting discount, never the rules.
-- ============================================================

create table if not exists coupons (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,               -- stored UPPERCASE
  kind           text not null default 'percent',    -- percent | flat
  value          numeric not null,                   -- 10 = 10% (percent) or ₹10 (flat)
  max_discount   numeric,                            -- cap on a percentage, e.g. 200
  min_order      numeric not null default 0,         -- subtotal required to use it
  first_order_only boolean not null default false,   -- only a customer's first order
  active         boolean not null default true,
  starts_at      timestamptz,
  expires_at     timestamptz,
  usage_limit    int,                                -- null = unlimited
  used_count     int not null default 0,
  note           text,                               -- what it's for, for the admin's own reference
  created_at     timestamptz default now()
);

create index if not exists coupons_code_idx on coupons (upper(code));

-- Record what was actually given, so a discount can always be reconciled later.
alter table orders add column if not exists coupon_code text;
alter table orders add column if not exists discount    numeric not null default 0;

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- The public gets NO access at all. The server reads and updates coupons with
-- the service_role key; the admin panel reads/writes them while signed in.
-- ------------------------------------------------------------
alter table coupons enable row level security;

drop policy if exists coupons_admin_all on coupons;
create policy coupons_admin_all on coupons
  for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- The welcome offer. Change the numbers in /admin → Coupons at any time;
-- they are deliberately not hard-coded anywhere in the site.
-- ------------------------------------------------------------
insert into coupons (code, kind, value, max_discount, min_order, first_order_only, note)
values ('WELCOME10', 'percent', 10, 200, 0, true, 'Extra 10% off a customer''s first order')
on conflict (code) do nothing;
