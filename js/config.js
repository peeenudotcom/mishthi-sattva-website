/* Mishthi Sattva — runtime config.
   The Supabase anon key is publishable: it is designed to ship in the browser
   and is restricted by the row-level security policies in supabase/schema.sql.
   Never put the service_role key here — it bypasses every policy. */
window.MS_CONFIG = {
  SUPABASE_URL: "https://wiuokqmggxkonxvzrnsb.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdW9rcW1nZ3hrb254dnpybnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1OTM2MjcsImV4cCI6MjEwMDE2OTYyN30.phmmDPy3UNZ99vFISaEtNXzfpwSNuOshVmjR4eh1Trc",
  WHATSAPP: "918557942246",
};
