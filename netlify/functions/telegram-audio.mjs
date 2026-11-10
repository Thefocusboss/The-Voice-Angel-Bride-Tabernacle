export default async (req) => {
  try {
    const reqUrl = new URL(req.url);
    const targetUrl = reqUrl.searchParams.get("url") || "";

    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: "MISSING_URL", message: "Missing Telegram URL" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Private Telegram channel links (/c/<channelId>/<msgId>) cannot be fetched publicly
    if (/https?:\/\/(t\.me|telegram\.me)\/c\/\d+\/\d+/i.test(targetUrl)) {
      return new Response(
        JSON.stringify({
          error: "PRIVATE_CHANNEL",
          message:
            "This Telegram link is from a private channel (/c/...) and requires Telegram membership to access. Open it in Telegram or use a public channel link / direct MP3 URL for in-page streaming.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Public Telegram post URL: https://t.me/<username>/<msgId>
    const publicMatch = targetUrl.match(
      /https?:\/\/(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)\/(\d+)/i
    );
    if (!publicMatch) {
      return new Response(
        JSON.stringify({
          error: "INVALID_URL",
          message: "Unsupported Telegram link format.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [, channel, msgId] = publicMatch;
    const embedUrl = `https://t.me/${channel}/${msgId}?embed=1`;
    const embedRes = await fetch(embedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!embedRes.ok) {
      return new Response(
        JSON.stringify({
          error: "FETCH_FAILED",
          message: "Could not load Telegram post.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const html = await embedRes.text();
    const audioMatch =
      html.match(/<audio[^>]+src=["']([^"']+)["']/i) ||
      html.match(/<source[^>]+src=["']([^"']+)["']/i) ||
      html.match(/<video[^>]+src=["']([^"']+)["']/i) ||
      html.match(/https:\/\/cdn\d*\.telegram-cdn\.org\/file\/[^"'\s<>]+/i);

    if (!audioMatch) {
      return new Response(
        JSON.stringify({
          error: "NO_MEDIA_FOUND",
          message:
            "No streamable audio was found in this Telegram post. For large files (>20MB) or private posts, use a direct MP3/audio URL.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const mediaUrl = (audioMatch[1] || audioMatch[0]).replace(/&amp;/g, "&");
    const forwardHeaders = {};
    const rangeHeader = req.headers.get("range");
    if (rangeHeader) {
      forwardHeaders["Range"] = rangeHeader;
    }

    const mediaRes = await fetch(mediaUrl, { headers: forwardHeaders });
    const headers = new Headers();
    headers.set(
      "Content-Type",
      mediaRes.headers.get("content-type") || "audio/mpeg"
    );
    if (mediaRes.headers.get("content-length")) {
      headers.set("Content-Length", mediaRes.headers.get("content-length"));
    }
    if (mediaRes.headers.get("content-range")) {
      headers.set("Content-Range", mediaRes.headers.get("content-range"));
    }
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=3600");

    return new Response(mediaRes.body, {
      status: mediaRes.status,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "SERVER_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to stream audio",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
