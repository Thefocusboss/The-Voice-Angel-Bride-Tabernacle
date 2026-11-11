import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, BookOpen, PenTool, ArrowRight } from "lucide-react";
import { BlogPostItem, useSiteData } from "@/lib/siteData";
import BlogShareDialog, { getBlogSignature } from "@/components/BlogShareDialog";

const Blog = () => {
  const { data } = useSiteData();
  const { blog } = data;
  const navigate = useNavigate();
  const [sharePostTarget, setSharePostTarget] = useState<BlogPostItem | null>(null);

  if (!blog.visible) {
    return null;
  }

  const openBlogPost = (postId?: string) => {
    const target = postId ? `/blog/${encodeURIComponent(postId)}` : "/blog";
    navigate(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const posts = blog.items || [];

  return (
    <section id="blog" className="py-14 sm:py-20 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title">{blog.sectionTitle || "Blog & Pastoral Updates"}</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {blog.sectionSubtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <Card className="max-w-xl mx-auto text-center p-8">
            <CardContent className="pt-4">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-3 opacity-70" />
              <p className="text-muted-foreground">
                No blog posts published yet. Check back soon for pastoral updates.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div
              className={
                posts.length === 1
                  ? "max-w-xl mx-auto"
                  : posts.length === 2
                    ? "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              {posts.map((post) => {
                const signature = getBlogSignature(post, blog.defaultSignature);
                return (
                  <Card
                    key={post.id}
                    className="card-hover group overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {post.thumbnail && (
                        <div
                          className="relative cursor-pointer overflow-hidden bg-muted"
                          onClick={() => openBlogPost(post.id)}
                        >
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground mb-2">
                          {post.date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              <span>{post.date}</span>
                            </div>
                          )}
                          {post.timestamp && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span>{post.timestamp}</span>
                            </div>
                          )}
                        </div>
                        <CardTitle
                          className="text-lg sm:text-xl leading-snug cursor-pointer hover:text-primary transition-colors"
                          onClick={() => openBlogPost(post.id)}
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
                      {/* Special Signature under every post */}
                      <div className="pt-3 border-t border-border/70 flex items-center gap-2">
                        <PenTool className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="font-serif italic font-semibold text-sm text-primary">
                          {signature}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="btn-secondary flex-1"
                          onClick={() => openBlogPost(post.id)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Post
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={`Share ${post.title}`}
                          onClick={() => setSharePostTarget(post)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Button
                variant="outline"
                className="btn-secondary gap-2 px-6"
                onClick={() => openBlogPost()}
              >
                Visit Full Blog Page
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <BlogShareDialog
        post={sharePostTarget}
        defaultSignature={blog.defaultSignature}
        onClose={() => setSharePostTarget(null)}
      />
    </section>
  );
};

export default Blog;
