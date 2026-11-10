import { getStore } from "@netlify/blobs";

const STORE_NAME = "vabt-site-content";
const BLOB_KEY = "site-data";

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const FALLBACK_META = {
  title: "Voice Angel Bride Tabernacle",
  description:
    "Experience God's love, grow in faith, and listen to our Morning Tonics and Live Services.",
  image: "/morning-tonic-telegram.jpg",
  redirect: "/",
};

export default async (req) => {
  try {
    const reqUrl = new URL(req.url);
    const origin = reqUrl.origin;
    const type = reqUrl.searchParams.get("type") || "";
    const id = reqUrl.searchParams.get("id") || "";
    const rawImage = reqUrl.searchParams.get("rawImage") === "1";

    let siteData = null;
    try {
      const store = getStore({ name: STORE_NAME, consistency: "strong" });
      siteData = await store.get(BLOB_KEY, { type: "json" });
    } catch {
      siteData = null;
    }

    let meta = { ...FALLBACK_META };

    if (type === "post") {
      const posts = siteData?.morningTonic?.posts || [
        {
          id: "post-1",
          title: "Daily Devotion — Read • Reflect • Pray",
          description:
            "Grow closer to God every day with Voice Angel Bride Tabernacle, Suleja.",
          image: "/morning-tonic-post.jpg",
        },
      ];
      const post = posts.find((p) => p.id === id) || posts[0];
      if (post) {
        meta = {
          title: post.title || "Morning Tonic Post — Voice Angel Bride Tabernacle",
          description:
            post.description ||
            "Read, Reflect & Pray with Voice Angel Bride Tabernacle.",
          image: post.image || "/morning-tonic-post.jpg",
          redirect: "/#about",
        };
      }
    } else if (type === "tonic") {
      const items = siteData?.morningTonic?.items || [
        {
          id: "tonic-1",
          title: "Daily Devotions with Pastor Michael",
          description:
            "Start your day with inspiring words from God's messenger",
          thumbnail: "/morning-tonic-telegram.jpg",
        },
      ];
      const item = items.find((t) => t.id === id) || items[0];
      if (item) {
        meta = {
          title: `${item.title} — Morning Tonic`,
          description: item.description || FALLBACK_META.description,
          image: item.thumbnail || "/morning-tonic-telegram.jpg",
          redirect: "/#about",
        };
      }
    } else if (type === "sermon") {
      const items = siteData?.liveServices?.items || [];
      const item = items.find((s) => String(s.id) === id) || items[0];
      if (item) {
        meta = {
          title: `${item.title} — Voice Angel Bride Tabernacle`,
          description: item.description || FALLBACK_META.description,
          image: item.thumbnail || "/morning-tonic-telegram.jpg",
          redirect: item.videoUrl || "/#sermons",
        };
      }
    } else if (type === "event") {
      const items = siteData?.upcomingEvents?.items || [];
      const item = items.find((e) => e.id === id) || items[0];
      if (item) {
        meta = {
          title: `${item.title} — Upcoming Event`,
          description:
            `${item.date} • ${item.time} • ${item.location}. ${item.description || ""}`.trim(),
          image: item.image || "/Supernatural cloud.jpg",
          redirect: "/#events",
        };
      }
    } else if (type === "announcement") {
      const sa = siteData?.specialAnnouncement;
      if (sa) {
        meta = {
          title: sa.title || "Special Announcement — Voice Angel Bride Tabernacle",
          description: sa.description || FALLBACK_META.description,
          image: sa.thumbnail || "/Supernatural cloud.jpg",
          redirect: "/",
        };
      }
    }

    // Serve base64-uploaded image directly so social scrapers receive real image bytes
    if (rawImage) {
      if (meta.image.startsWith("data:image/")) {
        const match = meta.image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (match) {
          const buffer = Buffer.from(match[2], "base64");
          return new Response(buffer, {
            status: 200,
            headers: {
              "Content-Type": match[1],
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      }
      const fallbackUrl = meta.image.startsWith("http")
        ? meta.image
        : `${origin}${meta.image.startsWith("/") ? "" : "/"}${meta.image}`;
      return Response.redirect(fallbackUrl, 302);
    }

    let ogImageUrl = `${origin}/morning-tonic-telegram.jpg`;
    if (meta.image.startsWith("data:image/")) {
      ogImageUrl = `${origin}/share?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}&rawImage=1`;
    } else if (meta.image.startsWith("http")) {
      ogImageUrl = meta.image;
    } else if (meta.image) {
      ogImageUrl = `${origin}${meta.image.startsWith("/") ? "" : "/"}${meta.image}`;
    }

    const redirectTarget = meta.redirect.startsWith("http")
      ? meta.redirect
      : `${origin}${meta.redirect}`;

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />
    <meta property="og:url" content="${escapeHtml(reqUrl.href)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />
    <meta http-equiv="refresh" content="0;url=${escapeHtml(redirectTarget)}" />
    <script>window.location.replace(${JSON.stringify(redirectTarget)});</script>
  </head>
  <body>
    <p>Redirecting to <a href="${escapeHtml(redirectTarget)}">${escapeHtml(meta.title)}</a>...</p>
  </body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.redirect("/", 302);
  }
};
