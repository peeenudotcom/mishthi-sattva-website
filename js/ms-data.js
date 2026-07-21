/* Mishthi Sattva — data layer (window.MSData).

   Talks to Supabase over its REST API, so there is no extra library to load.
   Every read falls back gracefully: if the database is unreachable or the
   schema has not been run yet, callers get null and the page keeps working
   from its built-in catalogue rather than rendering an empty shop. */
(function () {
  "use strict";

  var cfg = window.MS_CONFIG || {};
  var ROOT = cfg.SUPABASE_URL ? cfg.SUPABASE_URL.replace(/\/+$/, "") : null;
  var BASE = ROOT ? ROOT + "/rest/v1/" : null;
  var AUTH = ROOT ? ROOT + "/auth/v1/" : null;
  var KEY = cfg.SUPABASE_ANON_KEY || "";
  var configured = !!(BASE && KEY);
  var LS_SESSION = "ms_admin_session";

  function session() {
    try { return JSON.parse(localStorage.getItem(LS_SESSION) || "null"); } catch (e) { return null; }
  }

  /* Admin requests carry the logged-in user's token, which is what the
     "to authenticated" RLS policies check. Public visitors fall back to the
     anon key and stay restricted to reads + order/enquiry inserts. */
  function headers(extra) {
    var s = session();
    var bearer = s && s.access_token ? s.access_token : KEY;
    var h = {
      apikey: KEY,
      Authorization: "Bearer " + bearer,
      "Content-Type": "application/json",
    };
    for (var k in extra || {}) h[k] = extra[k];
    return h;
  }

  function rest(path, opts) {
    opts = opts || {};
    if (!configured) return Promise.reject(new Error("Supabase not configured"));
    return fetch(BASE + path, {
      method: opts.method || "GET",
      headers: headers(opts.headers),
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    }).then(function (r) {
      if (!r.ok) {
        return r.text().then(function (t) {
          throw new Error("Supabase " + r.status + ": " + t.slice(0, 200));
        });
      }
      /* A successful insert without `return=representation` replies 201 with an
         EMPTY body, so calling r.json() directly throws "Unexpected end of JSON
         input" and a saved order looks like a failure. Parse defensively. */
      return r.text().then(function (t) {
        if (!t) return null;
        try { return JSON.parse(t); } catch (e) { return null; }
      });
    });
  }

  /* Admin PATCH that proves the write actually landed (see note on the write
     helpers below). Returns the updated row, or throws if RLS filtered it out. */
  function adminPatch(table, id, patch) {
    return rest(table + "?id=eq." + encodeURIComponent(id), {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: patch,
    }).then(function (rows) {
      if (!rows || !rows.length) {
        throw new Error("Not saved — your admin session may have expired. Sign in again.");
      }
      return rows[0];
    });
  }

  /* Reads return null on failure so the caller can fall back to local data. */
  function safe(promise, label) {
    return promise.catch(function (err) {
      console.warn("[MSData] " + label + " unavailable — using local fallback.", err.message);
      return null;
    });
  }

  window.MSData = {
    configured: configured,

    /* ---- catalogue ---- */
    getProducts: function () {
      return safe(rest("products?select=*&order=sort_order.asc,name.asc"), "products");
    },

    /* ---- approved reviews only (RLS hides unpublished ones) ---- */
    getReviews: function () {
      return safe(rest("reviews?select=*&order=created_at.desc"), "reviews");
    },

    /* ---- writes: these must surface errors, so no silent fallback ----
       NOTE: do NOT ask for `Prefer: return=representation` here. Returning the
       inserted row needs SELECT permission, and anon deliberately has none on
       orders/enquiries (they hold phone numbers and addresses). Requesting it
       makes Postgres reject the whole insert with a 401. Fire-and-forget is
       correct: a 201 means the row was written. */
    createOrder: function (order) {
      return rest("orders", { method: "POST", body: order });
    },

    createEnquiry: function (enquiry) {
      return rest("enquiries", { method: "POST", body: enquiry });
    },

    /* ---- connectivity probe, used by the admin page ---- */
    health: function () {
      return rest("products?select=id&limit=1")
        .then(function () { return { ok: true }; })
        .catch(function (e) { return { ok: false, error: e.message }; });
    },

    /* ================= ADMIN ================= */

    session: session,
    isSignedIn: function () {
      var s = session();
      return !!(s && s.access_token);
    },

    signIn: function (email, password) {
      return fetch(AUTH + "token?grant_type=password", {
        method: "POST",
        headers: { apikey: KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then(function (r) {
          return r.text().then(function (t) {
            var d = t ? JSON.parse(t) : {};
            if (!r.ok) throw new Error(d.error_description || d.msg || d.message || "Sign-in failed");
            return d;
          });
        })
        .then(function (d) {
          localStorage.setItem(LS_SESSION, JSON.stringify(d));
          return d;
        });
    },

    signOut: function () {
      localStorage.removeItem(LS_SESSION);
    },

    /* ---- admin reads (RLS requires a signed-in user) ---- */
    adminProducts: function () {
      return rest("products?select=*&order=sort_order.asc");
    },
    adminOrders: function () {
      return rest("orders?select=*&order=created_at.desc&limit=200");
    },
    adminEnquiries: function () {
      return rest("enquiries?select=*&order=created_at.desc&limit=200");
    },
    adminReviews: function () {
      return rest("reviews?select=*&order=created_at.desc&limit=200");
    },

    /* ---- admin writes ----
       An UPDATE blocked by row-level security does NOT error: it simply matches
       zero rows and returns success. Without a check, an expired admin session
       would look like every edit saved while nothing changed. So each write asks
       for the updated row back and fails loudly if none came. */
    updateProduct: function (id, patch) {
      patch.updated_at = new Date().toISOString();
      return adminPatch("products", id, patch);
    },
    updateOrderStatus: function (id, status) {
      return adminPatch("orders", id, { status: status });
    },
    updateEnquiryStatus: function (id, status) {
      return adminPatch("enquiries", id, { status: status });
    },
    setReviewPublished: function (id, published) {
      return adminPatch("reviews", id, { is_published: published });
    },
  };
})();
