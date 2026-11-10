import { toast } from "sonner";

export interface SharePayload {
  title: string;
  text: string;
  shareType: "post" | "tonic" | "sermon" | "event" | "announcement";
  itemId: string;
  fallbackPath?: string;
  overrideUrl?: string;
  imageUrl?: string;
  fileName?: string;
  copySuccessMessage?: string;
}

const fetchImageAsFile = async (
  imageUrl: string,
  fileName: string
): Promise<File | null> => {
  try {
    const resolvedUrl = imageUrl.startsWith("http") || imageUrl.startsWith("data:")
      ? imageUrl
      : `${window.location.origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

    const res = await fetch(resolvedUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) return null;
    const ext = blob.type.split("/")[1]?.split(";")[0] || "jpg";
    const safeName = fileName.endsWith(`.${ext}`) ? fileName : `${fileName}.${ext}`;
    return new File([blob], safeName, { type: blob.type });
  } catch {
    return null;
  }
};

export const shareWithThumbnail = async ({
  title,
  text,
  shareType,
  itemId,
  fallbackPath = "/",
  overrideUrl,
  imageUrl,
  fileName = "vabt-share",
  copySuccessMessage = "Share link copied to clipboard!",
}: SharePayload): Promise<void> => {
  const origin = window.location.origin;
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const shareUrl = overrideUrl?.trim()
    ? overrideUrl.trim()
    : isLocal
      ? `${origin}${fallbackPath}`
      : `${origin}/share?type=${encodeURIComponent(shareType)}&id=${encodeURIComponent(itemId)}`;

  if (navigator.share) {
    if (imageUrl && navigator.canShare) {
      const file = await fetchImageAsFile(imageUrl, fileName);
      if (file && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title,
            text,
            url: shareUrl,
            files: [file],
          });
          return;
        } catch (err) {
          if ((err as Error)?.name === "AbortError") return;
        }
      }
    }

    try {
      await navigator.share({
        title,
        text,
        url: shareUrl,
      });
      return;
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
    toast.success(copySuccessMessage);
  } catch {
    toast.error("Could not copy share link. Please copy it manually from your browser.");
  }
};
