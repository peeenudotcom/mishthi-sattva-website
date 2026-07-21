/* Mishthi Sattva — data layer (window.MSData).

   Talks to Supabase over its REST API, so there is no extra library to load.
   Every read falls back gracefully: if the database is unreachable or the
   schema has not been run yet, callers get null and the page keeps working
   from its built-in catalogue rather than rendering an empty shop. */
(function () {
  "use strict";

  var cfg = window.MS_CONFIG || {};
  var BASE = cfg.SUPABASE_URL ? cfg.SUPABASE_URL.replace(/\/+$/, "") + "/rest/v1/" : null;
  var KEY = cfg.SUPABASE_ANON_KEY || "";
  var configured = !!(BASE && KEY);

  function headers(extra) {
    var h = {
      apikey: KEY,
      Authorization: "Bearer " + KEY,
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
      return r.status === 204 ? null : r.json();
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

    /* ---- writes: these must surface errors, so no silent fallback ---- */
    createOrder: function (order) {
      return rest("orders", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: order,
      });
    },

    createEnquiry: function (enquiry) {
      return rest("enquiries", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: enquiry,
      });
    },

    /* ---- connectivity probe, used by the admin page ---- */
    health: function () {
      return rest("products?select=id&limit=1")
        .then(function () { return { ok: true }; })
        .catch(function (e) { return { ok: false, error: e.message }; });
    },
  };
})();
