import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Star, Globe, Clock, Play, Share2, Calendar } from "lucide-react";
import { useSiteData, MorningTonicItem, MorningTonicPostItem, TELEGRAM_PAGE_URL } from "@/lib/siteData";
import { shareWithThumbnail } from "@/lib/share";

const About = () => {
  const { data } = useSiteData();
  const { aboutVabt, morningTonic } = data;

  if (!aboutVabt.visible && !morningTonic.visible) {
    return null;
  }

  const handleListenNow = (podcast: MorningTonicItem) => {
    const targetUrl = podcast.link?.trim() || TELEGRAM_PAGE_URL;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareTonic = (podcast: MorningTonicItem) => {
    const dateLabel = podcast.date ? ` (${podcast.date})` : "";
    const title = `Morning Tonic${dateLabel} — ${podcast.preacher}`;
    const audioLink = podcast.link?.trim() || TELEGRAM_PAGE_URL;
    const shareText = `Listen to Morning Tonic${dateLabel} by ${podcast.preacher} - Voice Angel Bride Tabernacle`;
    return shareWithThumbnail({
      title,
      text: shareText,
      shareType: "tonic",
      itemId: podcast.id,
      fallbackPath: "/#daily-devotion-post",
      overrideUrl: audioLink,
      imageUrl: podcast.thumbnail,
      fileName: `morning-tonic-${podcast.id}`,
      copySuccessMessage: "Morning Tonic Telegram audio link copied!",
    });
  };

  const handleSharePost = (post: MorningTonicPostItem) => {
    const title = post.title || "Morning Tonic Post — Voice Angel Bride Tabernacle";
    const datePrefix = post.date ? `[${post.date}] ` : "";
    const text = post.description
      ? `${datePrefix}${title}\n${post.description}`
      : `${datePrefix}${title} - Voice Angel Bride Tabernacle`;
    return shareWithThumbnail({
      title,
      text,
      shareType: "post",
      itemId: post.id,
      fallbackPath: "/#daily-devotion-post",
      imageUrl: post.image,
      fileName: `morning-tonic-post-${post.id}`,
      copySuccessMessage: "Morning Tonic post link copied to clipboard!",
    });
  };

  return (
    <section id="about" className="py-14 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {aboutVabt.visible && (
          <>
            {/* Section Header */}
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="section-title">{aboutVabt.sectionTitle}</h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {aboutVabt.sectionSubtitle}
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
                      <h3 className="text-2xl font-bold">{aboutVabt.foundationTitle}</h3>
                    </div>
                    {aboutVabt.foundationParagraph1 && (
                      <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                        {aboutVabt.foundationParagraph1}
                      </p>
                    )}
                    {aboutVabt.foundationParagraph2 && (
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {aboutVabt.foundationParagraph2}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-5 sm:p-8">
                    <div className="flex items-center mb-4">
                      <Star className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-xl sm:text-2xl font-bold">{aboutVabt.agesTitle}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {aboutVabt.agesDescription}
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
                      <h3 className="text-xl sm:text-2xl font-bold">{aboutVabt.missionTitle}</h3>
                    </div>
                    {aboutVabt.missionParagraph1 && (
                      <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                        {aboutVabt.missionParagraph1}
                      </p>
                    )}
                    {aboutVabt.missionParagraph2 && (
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {aboutVabt.missionParagraph2}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-5 sm:p-8">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-xl sm:text-2xl font-bold">{aboutVabt.revelationTitle}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {aboutVabt.revelationDescription}
                    </p>
                    {aboutVabt.revelationImage && (
                      <div className="mt-6">
                        <img
                          src={aboutVabt.revelationImage}
                          alt={aboutVabt.revelationTitle || "End Time Revelation illustration"}
                          className="w-full rounded-xl shadow-md object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Special Salute to Apostle Joseph Coleman */}
            {aboutVabt.showSalute && (
              <Card className="card-hover mb-12 sm:mb-16 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-5 sm:p-8">
                  <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-center">
                    {aboutVabt.saluteImage && (
                      <div className="md:col-span-1 flex justify-center">
                        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-primary/20">
                          <img
                            src={aboutVabt.saluteImage}
                            alt={aboutVabt.saluteTitle || "Apostle Joseph Coleman"}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={
                        aboutVabt.saluteImage
                          ? "md:col-span-2 text-center md:text-left"
                          : "md:col-span-3 text-center"
                      }
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-3">
                        {aboutVabt.saluteTitle || "Special Salute to Apostle Joseph Coleman"}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                        {aboutVabt.saluteDescription}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Morning Tonic Section - Two Parts: Post Section & Play from Telegram */}
        {morningTonic.visible && (
          <div id="morning-tonic" className="scroll-mt-20 bg-card rounded-2xl p-4 sm:p-8 shadow-lg space-y-10 sm:space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">{morningTonic.sectionTitle}</h3>
              <p className="text-muted-foreground">{morningTonic.sectionSubtitle}</p>
            </div>

            {/* Part 1: Portrait Post Section */}
            {morningTonic.posts && morningTonic.posts.length > 0 && (
              <div id="daily-devotion-post" className="scroll-mt-24">
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
                        {post.date && (
                          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-primary mb-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                        )}
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
            <div id="play-from-telegram" className="scroll-mt-24 pt-4 border-t border-border/60">
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
                        alt={`Morning Tonic - ${podcast.preacher}`}
                        className="w-full aspect-video object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <CardContent className="p-5 sm:p-6 text-center">
                      {podcast.date && (
                        <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{podcast.date}</span>
                        </div>
                      )}
                      <div className="text-primary font-semibold text-base sm:text-lg mb-4">
                        {podcast.preacher}
                      </div>
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
          </div>
        )}
      </div>
    </section>
  );
};

export default About;