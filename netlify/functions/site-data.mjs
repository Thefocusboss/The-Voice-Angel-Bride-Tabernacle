import { getStore } from "@netlify/blobs";

const STORE_NAME = "vabt-site-content";
const BLOB_KEY = "site-data";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export default async (req) => {
  try {
    const store = getStore({
      name: STORE_NAME,
      consistency: "strong",
    });

    if (req.method === "GET") {
      const data = await store.get(BLOB_KEY, { type: "json" });
      return new Response(
        JSON.stringify({ exists: Boolean(data), data: data ?? null }),
        { status: 200, headers: jsonHeaders }
      );
    }

    if (req.method === "POST" || req.method === "PUT") {
      const body = await req.json();
      await store.setJSON(BLOB_KEY, body, {
        metadata: { updatedAt: new Date().toISOString() },
      });
      return new Response(
        JSON.stringify({ success: true, data: body }),
        { status: 200, headers: jsonHeaders }
      );
    }

    if (req.method === "DELETE") {
      await store.delete(BLOB_KEY);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: jsonHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method Not Allowed" }),
      { status: 405, headers: jsonHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to access site storage",
      }),
      { status: 500, headers: jsonHeaders }
    );
  }
};
