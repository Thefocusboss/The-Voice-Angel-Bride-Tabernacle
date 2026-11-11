import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, ExternalLink, Send, Copy } from "lucide-react";
import { BlogPostItem } from "@/lib/siteData";
import { getShareUrl, shareWithThumbnail } from "@/lib/share";
import { toast } from "sonner";

export const getBlogSignature = (post: BlogPostItem, defaultSignature?: string): string =>
  post.signature?.trim() || defaultSignature?.trim() || "Rev Michael Chuzie";

export const buildBlogSharePayload = (post: BlogPostItem, defaultSignature?: string) => {
  const signature = getBlogSignature(post, defaultSignature);
  const dateTime = [post.date, post.timestamp].filter(Boolean).join(" • ");
  const shareText = [
    post.title,
    dateTime ? `(${dateTime})` : "",
    "",
    post.content,
    "",
    `— ${signature}`,
  ]
    .filter((line, idx, arr) => !(line === "" && (idx === 0 || arr[idx - 1] === "")))
    .join("\n");

  const shareUrl = getShareUrl({
    shareType: "blog",
    itemId: post.id,
    fallbackPath: `/blog/${encodeURIComponent(post.id)}`,
  });

  return { signature, dateTime, shareText, shareUrl };
};

interface BlogShareDialogProps {
  post: BlogPostItem | null;
  defaultSignature?: string;
  onClose: () => void;
}

const BlogShareDialog = ({ post, defaultSignature, onClose }: BlogShareDialogProps) => {
  if (!post) return null;

  const { signature, dateTime, shareText, shareUrl } = buildBlogSharePayload(
    post,
    defaultSignature
  );

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}&quote=${encodeURIComponent(`${post.title}\n— ${signature}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${post.title}\n— ${signature}`
  )}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(`${post.title}\n— ${signature}`)}`;

  const handleNativeShare = () =>
    shareWithThumbnail({
      title: post.title,
      text: shareText,
      shareType: "blog",
      itemId: post.id,
      fallbackPath: `/blog/${encodeURIComponent(post.id)}`,
      imageUrl: post.thumbnail,
      fileName: `vabt-blog-${post.id}`,
      copySuccessMessage: "Blog post, signature, and link copied to clipboard!",
    });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      toast.success("Blog post, signature, and link copied!");
    } catch {
      toast.error("Could not copy automatically. Please copy from your browser.");
    }
  };

  return (
    <Dialog open={Boolean(post)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[92vw] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Share Blog Post</DialogTitle>
          <DialogDescription>
            Share this post to WhatsApp and social platforms with thumbnail and signature attached.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-border overflow-hidden bg-muted/40">
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-3 space-y-1">
              {dateTime && <p className="text-xs text-muted-foreground">{dateTime}</p>}
              <p className="font-semibold text-sm leading-snug">{post.title}</p>
              <p className="text-xs font-serif italic text-primary font-medium">
                — {signature}
              </p>
            </div>
          </div>

          <Button className="btn-primary w-full gap-2" onClick={handleNativeShare}>
            <Share2 className="w-4 h-4" />
            Share with Thumbnail
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(facebookUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(twitterUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="w-4 h-4" />
              X / Twitter
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(telegramUrl, "_blank", "noopener,noreferrer")}
            >
              <Send className="w-4 h-4 text-sky-500" />
              Telegram
            </Button>
          </div>

          <Button variant="secondary" className="w-full gap-2" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
            Copy Post, Signature &amp; Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogShareDialog;
