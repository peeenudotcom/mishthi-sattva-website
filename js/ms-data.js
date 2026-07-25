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

  /* Exchange the refresh token for a fresh access token. Supabase access tokens
     expire after ~1 hour; without this, the admin would start getting 401s and
     an endless "Retry". Called automatically by rest() on a 401. */
  function refreshSession() {
    var s = session();
    if (!s || !s.refresh_token) return Promise.reject(new Error("no refresh token"));
    return fetch(AUTH + "token?grant_type=refresh_token", {
      method: "POST",
      headers: { apikey: KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: s.refresh_token }),
    }).then(function (r) {
      return r.text().then(function (t) {
        var d = t ? JSON.parse(t) : {};
        if (!r.ok || !d.access_token) {
          // Only wipe the session when the refresh token is truly rejected (400/401).
          // A transient 5xx/network blip must NOT nuke a valid login.
          if (r.status === 400 || r.status === 401) localStorage.removeItem(LS_SESSION);
          throw new Error("session refresh failed");
        }
        var merged = Object.assign({}, s, d);
        localStorage.setItem(LS_SESSION, JSON.stringify(merged));
        return merged;
      });
    });
  }

  /* Admin requests carry the logged-in user's token, which is what the
     "to authenticated" RLS policies check. Public visitors fall back to the
     anon key and stay restricted to reads + order/enquiry inserts. */
  function headers(extra, anon) {
    var s = anon ? null : session();
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
    var method = opts.method || "GET";
    var run = function () {
      return fetch(BASE + path, {
        method: method,
        headers: headers(opts.headers, opts.anon),
        body: opts.body ? JSON.stringify(opts.body) : undefined,
      }).then(function (r) {
        if (!r.ok) {
          return r.text().then(function (t) {
            var e = new Error("Supabase " + r.status + ": " + t.slice(0, 200));
            e.status = r.status;
            throw e;
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
    };
    /* One transparent retry for reads on a transient failure (network error or
       5xx). The free-tier DB sometimes drops the FIRST request after it's idle,
       which succeeds on retry. Never retry writes — that could duplicate rows. */
    return run().catch(function (e) {
      // Expired/invalid token → refresh once and retry (safe for any method:
      // a 401 means the request was rejected before it ran, so no duplicate writes).
      if (e.status === 401 && session() && session().refresh_token) {
        return refreshSession().then(run).catch(function () { throw e; });
      }
      var transient = e.status == null || e.status >= 500;
      if (method === "GET" && transient) {
        return new Promise(function (res) { setTimeout(res, 500); }).then(run);
      }
      throw e;
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

    /* Create a customer account. full_name/phone go into user metadata, which a
       DB trigger copies into their profile row (see accounts.sql). If the
       project requires email confirmation, no session comes back yet — the
       caller shows a "check your email" message. */
    signUp: function (email, password, fullName, phone) {
      return fetch(AUTH + "signup", {
        method: "POST",
        headers: { apikey: KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, data: { full_name: fullName, phone: phone } }),
      })
        .then(function (r) {
          return r.text().then(function (t) {
            var d = t ? JSON.parse(t) : {};
            if (!r.ok) throw new Error(d.error_description || d.msg || d.message || "Sign-up failed");
            return d;
          });
        })
        .then(function (d) {
          // A confirmed/instant signup includes tokens; store them to log in.
          if (d.access_token) localStorage.setItem(LS_SESSION, JSON.stringify(d));
          return d; // { access_token?, user }
        });
    },

    signOut: function () {
      localStorage.removeItem(LS_SESSION);
      // Also clear the device cart + wishlist so signing out (e.g. on a shared
      // device) doesn't leave the next person your cart/favourites.
      try { localStorage.removeItem("ms_shop_cart"); localStorage.removeItem("ms_shop_wish"); } catch (e) {}
    },

    /* ---- Google sign-in (OAuth) ----
       Kick off Google's OAuth via Supabase. We use the implicit flow (no PKCE),
       so Supabase redirects back to `redirect_to` with the tokens in the URL
       fragment; handleOAuthReturn() below captures them. redirect_to uses the
       live origin, so it works on the vercel URL now and a custom domain later
       (just add that origin to Supabase's Redirect URLs allow-list). */
    signInWithGoogle: function () {
      if (!AUTH) return;
      var redirect = window.location.origin + "/account";
      window.location.href = AUTH + "authorize?provider=google&redirect_to=" + encodeURIComponent(redirect);
    },
    /* Call once on page load. If we just came back from Google, store the session
       and return true so the UI can flip to the signed-in view. */
    handleOAuthReturn: function () {
      var hash = window.location.hash || "";
      if (hash.indexOf("access_token=") === -1) return Promise.resolve(false);
      var p = new URLSearchParams(hash.replace(/^#/, ""));
      var access_token = p.get("access_token");
      var refresh_token = p.get("refresh_token");
      var expires_in = parseInt(p.get("expires_in") || "3600", 10);
      if (!access_token) return Promise.resolve(false);
      return fetch(AUTH + "user", { headers: { apikey: KEY, Authorization: "Bearer " + access_token } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (user) {
          if (!user) return false;
          var sess = { access_token: access_token, refresh_token: refresh_token, expires_in: expires_in,
            expires_at: Math.floor(Date.now() / 1000) + expires_in, token_type: p.get("token_type") || "bearer", user: user };
          localStorage.setItem(LS_SESSION, JSON.stringify(sess));
          try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) {}
          return true;
        })
        .catch(function () { return false; });
    },

    /* ---- customer account ---- */
    currentUser: function () {
      var s = session();
      return s && s.user ? s.user : null;
    },
    myProfile: function () {
      var u = this.currentUser();
      if (!u) return Promise.resolve(null);
      return rest("profiles?select=*&id=eq." + u.id).then(function (rows) { return rows && rows[0]; }).catch(function () { return null; });
    },
    // The customer's own orders (RLS returns only rows where user_id = auth.uid()).
    myOrders: function () {
      if (!this.isSignedIn()) return Promise.resolve([]);
      return rest("orders?select=*&order=created_at.desc").catch(function () { return []; });
    },

    /* ---- admin reads (RLS requires a signed-in user) ---- */
    adminProducts: function () {
      // Products are publicly readable, so read them with the anon key. This keeps
      // the admin list loading even if the admin's session token has expired
      // (writes below still require the logged-in token / admin role).
      return rest("products?select=*&order=sort_order.asc,name.asc", { anon: true });
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

    /* ---- admin: create / delete products + photo upload ---- */
    createProduct: function (fields) {
      return rest("products", { method: "POST", headers: { Prefer: "return=representation" }, body: fields })
        .then(function (rows) {
          if (!rows || !rows.length) throw new Error("Not created — your admin session may have expired, or this account isn't an admin.");
          return rows[0];
        });
    },
    updateProductFields: function (id, patch) {
      patch.updated_at = new Date().toISOString();
      return adminPatch("products", id, patch);
    },
    deleteProduct: function (id) {
      return rest("products?id=eq." + encodeURIComponent(id), { method: "DELETE" });
    },
    /* Upload an image to the public product-photos bucket; returns its public URL. */
    uploadProductImage: function (file, slug) {
      var s = session();
      var token = s && s.access_token ? s.access_token : KEY;
      var ext = ((file.name || "").split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
      var path = (slug || "product") + "-" + Date.now() + "." + ext;
      return fetch(ROOT + "/storage/v1/object/product-photos/" + path, {
        method: "POST",
        headers: { apikey: KEY, Authorization: "Bearer " + token, "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
        body: file,
      }).then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error("Photo upload failed: " + t.slice(0, 160)); });
        return ROOT + "/storage/v1/object/public/product-photos/" + path;
      });
    },
  };
})();
