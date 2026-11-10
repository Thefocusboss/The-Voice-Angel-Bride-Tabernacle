import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Star, Globe, Clock, Play, Share2, Volume2, ExternalLink, X } from "lucide-react";
import { useSiteData, MorningTonicItem, MorningTonicPostItem } from "@/lib/siteData";
import { shareWithThumbnail } from "@/lib/share";
import { useState } from "react";
import { toast } from "sonner";

const getAudioStreamUrl = (link?: string): string | null => {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\/(?:t\.me|telegram\.me)\//i.test(trimmed)) {
    return `/.netlify/functions/telegram-audio?url=${encodeURIComponent(trimmed)}`;
  }
  return trimmed;
};

const About = () => {
  const { data } = useSiteData();
  const { morningTonic } = data;
  const [activeTonic, setActiveTonic] = useState<MorningTonicItem | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);

  const handleListenNow = async (podcast: MorningTonicItem) => {
    const rawLink = podcast.link?.trim();
    if (!rawLink) {
      toast.info("Audio stream link has not been added for this Morning Tonic yet.");
      return;
    }

    setStreamError(null);
    setActiveTonic(podcast);

    // Pre-check Telegram links so we can surface clear feedback if it's a private channel
    if (/^https?:\/\/(?:t\.me|telegram\.me)\//i.test(rawLink)) {
      try {
        const probe = await fetch(
          `/.netlify/functions/telegram-audio?url=${encodeURIComponent(rawLink)}`,
          { method: "GET", headers: { Range: "bytes=0-1" } }
        );
        const contentType = probe.headers.get("content-type") || "";
        if (!probe.ok && contentType.includes("application/json")) {
          const errData = await probe.json();
          setStreamError(
            errData?.message ||
              "Unable to stream this Telegram link directly. You can open it in Telegram below."
          );
        } else if (!probe.ok || contentType.includes("text/html")) {
          setStreamError(
            "Direct Telegram streaming is unavailable in this environment. Open in Telegram or use a direct MP3 URL."
          );
        }
      } catch {
        // Let the <audio> element attempt playback or trigger onError
      }
    }
  };

  const handleShareTonic = (podcast: MorningTonicItem) => {
    const shareText = `Listen to "${podcast.title}" by ${podcast.preacher} - Voice Angel Bride Tabernacle`;
    return shareWithThumbnail({
      title: podcast.title,
      text: shareText,
      shareType: "tonic",
      itemId: podcast.id,
      fallbackPath: "/#about",
      imageUrl: podcast.thumbnail,
      fileName: `morning-tonic-${podcast.id}`,
      copySuccessMessage: "Morning Tonic link copied to clipboard!",
    });
  };

  const handleSharePost = (post: MorningTonicPostItem) => {
    const title = post.title || "Morning Tonic Post — Voice Angel Bride Tabernacle";
    const text = post.description
      ? `${title}\n${post.description}`
      : `${title} - Voice Angel Bride Tabernacle`;
    return shareWithThumbnail({
      title,
      text,
      shareType: "post",
      itemId: post.id,
      fallbackPath: "/#about",
      imageUrl: post.image,
      fileName: `morning-tonic-post-${post.id}`,
      copySuccessMessage: "Morning Tonic post link copied to clipboard!",
    });
  };

  return (
    <section id="about" className="py-14 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title">About VABT</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about our history, mission, and the end-time message we proclaim to the world.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center mb-12 sm:mb-16">
          {/* Church History */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-2xl font-bold">Our Foundation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Voice Angel Bride Tabernacle, formerly known as Omega Bride Fellowship church, 
                  is an End time message church. We proclaim the original Apostolic Faith and Belief 
                  of the Bible promise to send a Voice at the end of the Gentile dispensation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in calling the Bride out of the church denominations into the living 
                  reality of the living God, confirming the Bible Truth that Jesus Christ is the 
                  same yesterday, today, and forever.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl sm:text-2xl font-bold">Seven Church Ages</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We believe the Gentiles were allotted seven church age dispensations before 
                  the Gospel returns back to the Jews as the original vine according to the 
                  mystery of God revealed by Apostle Paul in Romans chapter 11.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="space-y-6">
            <Card className="card-hover bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center mb-4">
                  <Globe className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl sm:text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a Church, we stand unwavering and committed to the teachings of God's 
                  prophet messenger William Marion Branham and the Apostolic Echo Voice 
                  messenger Joseph Coleman of New York City.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that every true ministry of Ephesians 4:11-13 will stand 
                  identified with God's prophet to say just what those tapes say.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-5 sm:p-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl sm:text-2xl font-bold">End Time Revelation</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  At the close of the seven church ages, we see Jesus standing at the door 
                  outside the church knocking to enter. The son of man is revealed to this 
                  Age through a prophetic office of the seventh angel messenger.
                </p>
                <div className="mt-6">
                  <img
                    src="/william marrion branham.jpg"
                    alt="End Time Revelation illustration"
                    className="w-full rounded-xl shadow-md object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Morning Tonic Section - Two Parts: Post Section & Play from Telegram */}
        {morningTonic.visible && (
          <div className="bg-card rounded-2xl p-4 sm:p-8 shadow-lg space-y-10 sm:space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">{morningTonic.sectionTitle}</h3>
              <p className="text-muted-foreground">{morningTonic.sectionSubtitle}</p>
            </div>

            {/* Part 1: Portrait Post Section */}
            {morningTonic.posts && morningTonic.posts.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-center mb-6">
                  {morningTonic.postsHeading || "Daily Devotion Post"}
                </h4>
                <div
                  className={
                    morningTonic.posts.length === 1
                      ? "max-w-sm mx-auto"
                      : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  }
                >
                  {morningTonic.posts.map((post, index) => (
                    <Card
                      key={post.id || index}
                      className="card-hover bg-background overflow-hidden"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title || "Morning Tonic Post"}
                          className="w-full aspect-[4/5] object-cover object-center"
                        />
                      </div>
                      <CardContent className="p-4 sm:p-5 text-center">
                        {post.title && (
                          <h5 className="font-semibold text-base sm:text-lg mb-1">
                            {post.title}
                          </h5>
                        )}
                        {post.description && (
                          <p className="text-muted-foreground text-sm mb-4">
                            {post.description}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => handleSharePost(post)}
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Part 2: Play from Telegram Audio Cards */}
            <div className="pt-4 border-t border-border/60">
              <h4 className="text-xl font-bold text-center mb-6">
                {morningTonic.telegramHeading || "Play from Telegram"}
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                {morningTonic.items.map((podcast, index) => (
                  <Card
                    key={podcast.id || index}
                    className="card-hover bg-background group overflow-hidden"
                  >
                    <div
                      className="relative cursor-pointer"
                      onClick={() => handleListenNow(podcast)}
                    >
                      <img
                        src={podcast.thumbnail}
                        alt={podcast.title}
                        className="w-full aspect-video object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <CardContent className="p-5 sm:p-6 text-center">
                      <h5 className="font-semibold text-lg mb-2">{podcast.title}</h5>
                      <p className="text-muted-foreground text-sm mb-4">{podcast.description}</p>
                      <div className="text-primary font-semibold mb-4">{podcast.preacher}</div>
                      <Button
                        className="btn-secondary w-full"
                        onClick={() => handleListenNow(podcast)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Listen Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full mt-2 gap-2"
                        onClick={() => handleShareTonic(podcast)}
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Inline Audio Stream Player */}
            {activeTonic && (
              <div className="mt-8 p-5 rounded-xl bg-background border border-primary/30 shadow-md">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{activeTonic.title}</p>
                      <p className="text-xs text-muted-foreground">{activeTonic.preacher}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setActiveTonic(null);
                      setStreamError(null);
                    }}
                    aria-label="Close audio player"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {!streamError && getAudioStreamUrl(activeTonic.link) && (
                  <audio
                    key={activeTonic.id + activeTonic.link}
                    controls
                    autoPlay
                    preload="metadata"
                    className="w-full"
                    src={getAudioStreamUrl(activeTonic.link) || undefined}
                    onError={() =>
                      setStreamError(
                        "Unable to stream this audio directly in the browser. You can open the source link below."
                      )
                    }
                  />
                )}

                {streamError && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-muted text-sm text-muted-foreground">
                    <span>{streamError}</span>
                    {activeTonic.link && (
                      <Button
                        size="sm"
                        className="btn-primary py-2 px-4 text-sm gap-2 flex-shrink-0"
                        onClick={() =>
                          window.open(activeTonic.link, "_blank", "noopener,noreferrer")
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in Telegram
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;