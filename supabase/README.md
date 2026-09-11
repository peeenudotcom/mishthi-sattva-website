# Database — what to run, and in what order

Every change ever made to the Supabase database is in this folder as a `.sql`
file. They are run by hand in **Supabase → SQL Editor → New query → Run**.

The files are written to be safe to run twice (`if not exists` /
`drop policy if exists` throughout), so re-running one you're unsure about
won't break anything.

## Setting up from scratch

If this project ever had to be rebuilt on a new Supabase project, run these in
**this order** — later files depend on tables the earlier ones create:

| # | File | What it does |
|---|------|--------------|
| 1 | `schema.sql` | `products`, `orders`, `enquiries`, `reviews` + row-level security |
| 2 | `accounts.sql` | `profiles` + customer sign-in |
| 3 | `seed-products.sql` | The starting catalogue |
| 4 | `categories.sql` | `categories` table, seeds the four groups, reassigns products |
| 5 | `variants.sql` | `products.variants` — one product sold in several weights |
| 6 | `product-details.sql` | The seven product-page sections (ingredients, nutrition, …) |
| 7 | `orders-payments.sql` | Payment columns, stock, and **removes the browser's permission to write orders** |

`update-prices.sql` is a one-off price correction, not part of a fresh setup.

### After the SQL, before the site works

Step 7 deliberately takes order-writing away from the browser — that is what
makes prices impossible to fake. From then on only the server can write an
order, and it needs `SUPABASE_SERVICE_ROLE_KEY` in Vercel to do it.

**So set that environment variable before (or immediately after) running step
7**, or orders will silently stop reaching the admin list. See `.env.example`
in the project root for every variable and where its value comes from.

Environment variables are only read when the site **builds**. After adding
one, redeploy — any new deployment will do.

## What is NOT in this repo

- **The data itself.** Products, orders, customers and reviews live only in
  Supabase. The catalogue has a readable snapshot in `ui_kits/shop/data.js`
  (regenerate with `npm run sync` after changing products in `/admin`), but
  orders and customer records do not — they hold phone numbers and addresses
  and must never sit in a git repository.
- **Any secret value.** See the warning at the top of `.env.example`.

For real backups of the data, use Supabase's own: **Database → Backups**.
Check that they're enabled — that is the only thing standing between you and a
bad afternoon, and nothing in this repository substitutes for it.
