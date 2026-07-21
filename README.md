# Mishthi Sattva — Website & Shop

Marketing website and e-commerce storefront for **Mishthi Sattva**, a homemade
Ayurvedic foods, spices and wellness brand by Kiran Bansal in Kotkapura, Punjab.
Orders are taken over WhatsApp.

Built from the **Mishthi Sattva Design System** (Claude Design). The pages compose
design-system components and brand tokens for a consistent, premium look.

## Structure

```
styles.css              # design-system entry point (imports tokens)
tokens/                 # colors, fonts, typography, spacing, radius, base
_ds_bundle.js           # compiled design-system components (Button, ProductCard, etc.)
assets/                 # product photography, founder photo, hero, logos
ui_kits/
  website/              # marketing site (React via in-browser Babel)
    index.html          # Home
    about.html          # Our Story
    products.html       # Products
    contact.html        # Contact
    Sections.jsx        # all website sections (Header, Hero, HomeProducts, Founder, …)
  shop/                 # e-commerce storefront
    index.html          # Shop (catalogue, cart, wishlist, checkout → WhatsApp)
    Shop.jsx            # app shell + state
    ShopParts.jsx       # presentational parts (cards, quick-view, drawers)
    data.js             # product catalogue
```

## Running locally

The pages compile JSX in the browser, so they must be served over HTTP
(opening the files directly with `file://` will show a blank page):

```bash
cd mishthi-sattva-website
python3 -m http.server 8642
```

Then open:

- Home — http://localhost:8642/ui_kits/website/index.html
- Story — http://localhost:8642/ui_kits/website/about.html
- Products — http://localhost:8642/ui_kits/website/products.html
- Contact — http://localhost:8642/ui_kits/website/contact.html
- Shop — http://localhost:8642/ui_kits/shop/index.html

## Before going live (TODO)

- Add real Chyawanprash price + jar size (see `TODO` in `ui_kits/website/Sections.jsx`).
- Add the FSSAI licence number in the footer.
- Replace the sample testimonials with real, verified WhatsApp/Google reviews.
- Compress images to WebP/AVIF (the `assets/` originals are full-resolution).
- Add SEO meta + LocalBusiness/Product/FAQ schema and analytics.
