-- ============================================================
-- Mishthi Sattva — customer accounts, order history & delivery tracking
-- Run in the Supabase SQL editor AFTER schema.sql (and the price/seed files).
--
-- IMPORTANT — this also CLOSES a security gap. The original policies granted
-- every "authenticated" user admin powers. Once customers can sign up, that
-- would let any customer edit the catalogue and read everyone's orders. Below,
-- admin is a specific role and customers only ever see their OWN orders.
-- ============================================================

-- 1. PROFILES — one row per auth user, carries the role -----------------------
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  role       text not null default 'customer',   -- 'customer' | 'admin'
  created_at timestamptz default now()
);
alter table profiles enable row level security;

-- Are we the admin? SECURITY DEFINER so it can read profiles under any RLS.
create or replace function is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists profiles_read on profiles;
create policy profiles_read on profiles for select
  using (id = auth.uid() or is_admin());
drop policy if exists profiles_insert on profiles;
create policy profiles_insert on profiles for insert
  with check (id = auth.uid());
drop policy if exists profiles_update on profiles;
create policy profiles_update on profiles for update
  using (id = auth.uid()) with check (id = auth.uid());

-- Auto-create a profile whenever someone signs up.
create or replace function handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- 2. ORDERS — link to the customer, so they can see their own history ---------
alter table orders add column if not exists user_id uuid references auth.users(id);

-- Stamp the logged-in customer onto the order automatically (guests stay null).
create or replace function set_order_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  if new.user_id is null then new.user_id := auth.uid(); end if;
  return new;
end; $$;
drop trigger if exists orders_set_user on orders;
create trigger orders_set_user before insert on orders
  for each row execute function set_order_user();

-- 3. RE-POLICY everything around is_admin() + per-customer order access -------
-- products: public read, admin write
drop policy if exists products_admin_write on products;
create policy products_admin_write on products for all
  using (is_admin()) with check (is_admin());

-- orders: anyone may create (guest or customer); customers read their own,
-- admin reads all; only admin changes status.
drop policy if exists orders_admin_read on orders;
drop policy if exists orders_admin_update on orders;
drop policy if exists orders_read on orders;
create policy orders_read on orders for select
  using (is_admin() or user_id = auth.uid());
create policy orders_admin_update on orders for update
  using (is_admin()) with check (is_admin());
-- (orders_public_insert from schema.sql stays: anyone may place an order.)

-- enquiries: admin-only read/update
drop policy if exists enquiries_admin_read on enquiries;
create policy enquiries_admin_read on enquiries for select using (is_admin());
drop policy if exists enquiries_admin_update on enquiries;
create policy enquiries_admin_update on enquiries for update
  using (is_admin()) with check (is_admin());

-- reviews: admin manages; public still sees only published (from schema.sql)
drop policy if exists reviews_admin_all on reviews;
create policy reviews_admin_all on reviews for all
  using (is_admin()) with check (is_admin());

-- 4. MAKE YOUR ADMIN AN ADMIN -------------------------------------------------
-- After you've created the admin user in Authentication → Users, run this once
-- with that account's email so the admin panel keeps working:
--
--   insert into profiles (id, role)
--   select id, 'admin' from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
--   on conflict (id) do update set role = 'admin';
--
-- (Replace the email. Customers who sign up get role 'customer' automatically.)
