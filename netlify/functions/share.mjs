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
        const datePrefix = post.date ? `${post.date} — ` : "";
        meta = {
          title: post.title || "Morning Tonic Post — Voice Angel Bride Tabernacle",
          description:
            `${datePrefix}${post.description || "Read, Reflect & Pray with Voice Angel Bride Tabernacle."}`,
          image: post.image || "/morning-tonic-post.jpg",
          redirect: "/#daily-devotion-post",
        };
      }
    } else if (type === "tonic") {
      const items = siteData?.morningTonic?.items || [
        {
          id: "tonic-1",
          date: "November 10, 2026",
          preacher: "Rev. Michael Chuzie Chukwuezi",
          thumbnail: "/morning-tonic-telegram.jpg",
        },
      ];
      const item = items.find((t) => t.id === id) || items[0];
      if (item) {
        const preacher = item.preacher || "Rev. Michael Chuzie Chukwuezi";
        const dateText = item.date ? ` (${item.date})` : "";
        meta = {
          title: `Morning Tonic${dateText} — ${preacher}`,
          description: `Listen to Morning Tonic${dateText} by ${preacher} at Voice Angel Bride Tabernacle.`,
          image: item.thumbnail || "/morning-tonic-telegram.jpg",
          redirect: "/#play-from-telegram",
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
      const sa = siteData?.specialAnnouncement || {
        title: "Special Announcement",
        description:
          "Bukuru Youth meetings hold on September 5th, 2025. Pray with us and plan to attend. God bless you.",
        thumbnail: "/Supernatural cloud.jpg",
        extraAnnouncements: [],
      };
      const extra = (sa.extraAnnouncements || [])
        .map((a) => (a.title ? `${a.title}: ${a.description}` : a.description))
        .filter(Boolean)
        .join(" • ");
      const fallbackThumb =
        sa.thumbnail ||
        (sa.extraAnnouncements || []).find((a) => a.thumbnail)?.thumbnail ||
        "/Supernatural cloud.jpg";
      meta = {
        title: sa.title || "Special Announcement — Voice Angel Bride Tabernacle",
        description: extra
          ? `${sa.description || ""} • ${extra}`
          : sa.description || FALLBACK_META.description,
        image: fallbackThumb,
        redirect: "/",
      };
    } else if (type === "blog") {
      const blog = siteData?.blog || {};
      const items = blog.items || [
        {
          id: "blog-1",
          title: "Preparing the Bride for His Appearing",
          content:
            "Beloved in Christ, we are living in the closing hours of the Gentile dispensation. Stay anchored in the Word, walk in love, and let every revelation produce Christ-like character in our daily walk.",
          thumbnail: "/Supernatural cloud.jpg",
          date: "November 11, 2026",
          timestamp: "9:00 AM",
        },
      ];
      const defaultSig = blog.defaultSignature || "Rev Michael Chuzie";
      const item = items.find((b) => String(b.id) === id) || items[0];
      if (item) {
        const signature = (item.signature || "").trim() || defaultSig;
        const dateTime = [item.date, item.timestamp].filter(Boolean).join(" at ");
        const excerpt = (item.content || "").trim().slice(0, 220);
        const parts = [
          dateTime ? `[${dateTime}]` : "",
          excerpt,
          signature ? `— ${signature}` : "",
        ].filter(Boolean);
        meta = {
          title: `${item.title} — Voice Angel Bride Tabernacle`,
          description: parts.join(" • ") || FALLBACK_META.description,
          image: item.thumbnail || "/Supernatural cloud.jpg",
          redirect: `/blog/${encodeURIComponent(item.id)}`,
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
        : `${origin}${encodeURI(meta.image.startsWith("/") ? meta.image : `/${meta.image}`)}`;
      return Response.redirect(fallbackUrl, 302);
    }

    let ogImageUrl = `${origin}/morning-tonic-telegram.jpg`;
    if (meta.image.startsWith("data:image/")) {
      ogImageUrl = `${origin}/share?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}&rawImage=1`;
    } else if (meta.image.startsWith("http")) {
      ogImageUrl = meta.image;
    } else if (meta.image) {
      ogImageUrl = `${origin}${encodeURI(meta.image.startsWith("/") ? meta.image : `/${meta.image}`)}`;
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
    <meta property="og:type" content="${type === "blog" ? "article" : "website"}" />
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
