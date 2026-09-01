/* Mishthi Sattva — runtime config.
   The Supabase anon key is publishable: it is designed to ship in the browser
   and is restricted by the row-level security policies in supabase/schema.sql.
   Never put the service_role key here — it bypasses every policy. */
window.MS_CONFIG = {
  SUPABASE_URL: "https://wiuokqmggxkonxvzrnsb.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdW9rcW1nZ3hrb254dnpybnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1OTM2MjcsImV4cCI6MjEwMDE2OTYyN30.phmmDPy3UNZ99vFISaEtNXzfpwSNuOshVmjR4eh1Trc",
  WHATSAPP: "918557942246",
};

/* Product badge colours — one source of truth for every page (shop cards,
   website cards, admin preview). Each badge gets a distinct, meaningful hue so
   shoppers can tell them apart at a glance. bg = pill background, fg = text. */
window.MS_BADGE_STYLES = {
  "Bestseller":      { bg: "#C9A227", fg: "#24352A" }, // gold — premium / top-selling
  "Featured":        { bg: "#1F3D31", fg: "#F7F3E8" }, // deep forest — our pick
  "New":             { bg: "#2B7A4B", fg: "#FFFFFF" }, // fresh green — just launched
  "New Launched":    { bg: "#2B7A4B", fg: "#FFFFFF" }, // alias of New
  "Special Offer":   { bg: "#B3261E", fg: "#FFFFFF" }, // red — discount / deal
  "Limited":         { bg: "#6D2E5B", fg: "#FFFFFF" }, // plum — scarce / exclusive
  "Festive Special": { bg: "#B45309", fg: "#FFFFFF" }, // saffron / burnt orange — festive
  "Combo Offer":     { bg: "#2C7A7B", fg: "#FFFFFF" }, // teal — bundle / value
  "Party Pack":      { bg: "#9B2D6B", fg: "#FFFFFF" }, // berry — fun / party
  "Seasonal":        { bg: "#8A6D1F", fg: "#FFFFFF" }, // amber — seasonal
  "_default":        { bg: "#1F3D31", fg: "#F7F3E8" }, // any other label → brand forest
};
window.msBadgeStyle = function (label) {
  var m = window.MS_BADGE_STYLES || {};
  return (label && m[label]) || m._default || { bg: "#1F3D31", fg: "#F7F3E8" };
};
