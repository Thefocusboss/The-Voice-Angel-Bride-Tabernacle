import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogShareDialog, { getBlogSignature } from "@/components/BlogShareDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  PenTool,
  Send,
  Share2,
} from "lucide-react";
import { BlogPostItem, getFormattedToday, getFormattedCurrentTime, useSiteData } from "@/lib/siteData";
import { toast } from "sonner";

interface BlogComment {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

interface BlogEngagementMap {
  [postId: string]: {
    likes: number;
    liked: boolean;
    comments: BlogComment[];
  };
}

const ENGAGEMENT_STORAGE_KEY = "vabt_blog_engagement_v1";

const loadEngagement = (): BlogEngagementMap => {
  try {
    const raw = localStorage.getItem(ENGAGEMENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const BlogPage = () => {
  const { data } = useSiteData();
  const { blog } = data;
  const { postId } = useParams<{ postId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resolvedPostId = postId || searchParams.get("id") || "";
  const posts = blog.items || [];
  const activePost = resolvedPostId
    ? posts.find((item) => item.id === resolvedPostId) || null
    : null;

  const [shareTarget, setShareTarget] = useState<BlogPostItem | null>(null);
  const [engagement, setEngagement] = useState<BlogEngagementMap>(loadEngagement);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [resolvedPostId]);

  const saveEngagement = (next: BlogEngagementMap) => {
    setEngagement(next);
    try {
      localStorage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const getPostStats = (id: string) =>
    engagement[id] || { likes: 0, liked: false, comments: [] };

  const handleToggleLike = (id: string) => {
    const current = getPostStats(id);
    const nextLiked = !current.liked;
    const nextLikes = Math.max(0, current.likes + (nextLiked ? 1 : -1));
    saveEngagement({
      ...engagement,
      [id]: {
        ...current,
        liked: nextLiked,
        likes: nextLikes,
      },
    });
  };

  const handleAddComment = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const author = commentAuthor.trim();
    const message = commentMessage.trim();
    if (!author || !message) {
      toast.error("Please enter your name and comment.");
      return;
    }

    const current = getPostStats(id);
    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      author,
      message,
      createdAt: `${getFormattedToday()} • ${getFormattedCurrentTime()}`,
    };

    saveEngagement({
      ...engagement,
      [id]: {
        ...current,
        comments: [newComment, ...current.comments],
      },
    });

    setCommentAuthor("");
    setCommentMessage("");
    toast.success("Thank you for sharing your reflection!");
  };

  const openPost = (id: string) => {
    navigate(`/blog/${encodeURIComponent(id)}`);
  };

  const otherPosts = activePost ? posts.filter((p) => p.id !== activePost.id) : posts;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => (activePost ? navigate("/blog") : navigate("/"))}
              >
                <ArrowLeft className="w-4 h-4" />
                {activePost ? "All Blog Posts" : "Back to Home"}
              </Button>
            </div>

            {!activePost && (
              <div className="text-center max-w-3xl mx-auto pt-2">
                <h1 className="section-title">{blog.sectionTitle || "Blog & Pastoral Updates"}</h1>
                <p className="text-base sm:text-xl text-muted-foreground">
                  {blog.sectionSubtitle}
                </p>
              </div>
            )}
          </div>

          {/* Focused Single Blog Post Reader & Engagement */}
          {activePost && (
            <div className="max-w-4xl mx-auto mb-16 space-y-8">
              <article className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                {activePost.thumbnail && (
                  <div className="relative w-full max-h-[440px] overflow-hidden bg-muted">
                    <img
                      src={activePost.thumbnail}
                      alt={activePost.title}
                      className="w-full h-full max-h-[440px] object-cover"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-10 space-y-6">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    {activePost.date && (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4 text-primary" />
                        {activePost.date}
                      </span>
                    )}
                    {activePost.timestamp && (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-primary" />
                        {activePost.timestamp}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-bold font-serif leading-tight text-foreground">
                    {activePost.title}
                  </h1>

                  <div className="text-base sm:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                    {activePost.content}
                  </div>

                  {/* Special Signature */}
                  <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <PenTool className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Written by
                        </p>
                        <p className="font-serif italic font-bold text-lg text-primary">
                          — {getBlogSignature(activePost, blog.defaultSignature)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {(() => {
                        const stats = getPostStats(activePost.id);
                        return (
                          <Button
                            variant={stats.liked ? "default" : "outline"}
                            className="gap-2"
                            onClick={() => handleToggleLike(activePost.id)}
                          >
                            <Heart
                              className={`w-4 h-4 ${stats.liked ? "fill-current" : "text-primary"}`}
                            />
                            <span>Amen / Like</span>
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-background/20 font-semibold">
                              {stats.likes}
                            </span>
                          </Button>
                        );
                      })()}

                      <Button
                        className="btn-primary gap-2"
                        onClick={() => setShareTarget(activePost)}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Post
                      </Button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Reader Engagement & Reflections */}
              {(() => {
                const stats = getPostStats(activePost.id);
                return (
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl font-serif">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Reader Reflections ({stats.comments.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form
                        onSubmit={(e) => handleAddComment(e, activePost.id)}
                        className="space-y-4 p-4 sm:p-5 rounded-xl bg-muted/40 border border-border/70"
                      >
                        <div className="space-y-1.5">
                          <Label htmlFor="blog-comment-author">Your Name</Label>
                          <Input
                            id="blog-comment-author"
                            placeholder="Enter your name"
                            value={commentAuthor}
                            onChange={(e) => setCommentAuthor(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="blog-comment-message">Share Your Reflection or Amen</Label>
                          <Textarea
                            id="blog-comment-message"
                            rows={3}
                            placeholder="Write your thoughts, prayer, or reflection on this message..."
                            value={commentMessage}
                            onChange={(e) => setCommentMessage(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="btn-primary gap-2">
                          <Send className="w-4 h-4" />
                          Post Reflection
                        </Button>
                      </form>

                      {stats.comments.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Be the first to share a reflection on this post.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {stats.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="p-4 rounded-xl border border-border bg-background space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">
                                  {comment.createdAt}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                {comment.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          )}

          {/* All Posts / More Posts Feed */}
          {posts.length === 0 ? (
            <Card className="max-w-xl mx-auto text-center p-10">
              <CardContent>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-3 opacity-70" />
                <p className="text-muted-foreground">
                  No blog posts published yet. Check back soon for pastoral updates.
                </p>
              </CardContent>
            </Card>
          ) : otherPosts.length > 0 ? (
            <div className="space-y-6">
              {activePost && (
                <h2 className="text-2xl font-bold font-serif text-center">More Blog Posts</h2>
              )}
              <div
                className={
                  otherPosts.length === 1
                    ? "max-w-xl mx-auto"
                    : otherPosts.length === 2
                      ? "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                      : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                }
              >
                {otherPosts.map((post) => {
                  const signature = getBlogSignature(post, blog.defaultSignature);
                  const stats = getPostStats(post.id);
                  return (
                    <Card
                      key={post.id}
                      className="card-hover group overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {post.thumbnail && (
                          <div
                            className="relative cursor-pointer overflow-hidden bg-muted"
                            onClick={() => openPost(post.id)}
                          >
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground mb-2">
                            {post.date && (
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                {post.date}
                              </span>
                            )}
                            {post.timestamp && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                {post.timestamp}
                              </span>
                            )}
                          </div>
                          <CardTitle
                            className="text-lg sm:text-xl leading-snug cursor-pointer hover:text-primary transition-colors"
                            onClick={() => openPost(post.id)}
                          >
                            {post.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0 pb-4">
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line line-clamp-4">
                            {post.content}
                          </p>
                        </CardContent>
                      </div>

                      <CardContent className="pt-0 space-y-4">
                        <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <PenTool className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="font-serif italic font-semibold text-sm text-primary truncate">
                              {signature}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                            <span className="inline-flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5 text-primary" />
                              {stats.likes}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageSquare className="w-3.5 h-3.5 text-primary" />
                              {stats.comments.length}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="btn-secondary flex-1"
                            onClick={() => openPost(post.id)}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read &amp; Engage
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Share ${post.title}`}
                            onClick={() => setShareTarget(post)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />

      <BlogShareDialog
        post={shareTarget}
        defaultSignature={blog.defaultSignature}
        onClose={() => setShareTarget(null)}
      />
    </div>
  );
};

export default BlogPage;
