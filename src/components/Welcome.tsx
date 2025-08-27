import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <section id="welcome" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Video Card (above Welcome Message) */}
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg bg-card border">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/5CJS7QGtbok?rel=0&modestbranding=1"
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Pastor Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">Welcome Message</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                "I want to specially welcome you to this Gospel centre. No doubt you didn't 
                stumble into this site by chance but by God's divine arrangement. Possibly 
                you have a need or a question that needs urgent attention."
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "The good news of the gospel of Jesus Christ is a heart warming news that 
                soothes even the most turbulent soul. You can confidently feel free to 
                share with us as we promise to be of help in whatever little way that we can."
              </p>
              <div className="border-l-4 border-primary pl-4 mb-6">
                <p className="font-semibold text-primary text-lg">Rev. Michael Chuzie Chukwuezi</p>
                <p className="text-muted-foreground">Pastor-in-charge</p>
              </div>
              <Button className="btn-primary">
                Contact Pastor Michael
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/Pastor.jpg"
                    alt="Rev. Michael Chuzie Chukwuezi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-glow">
                  <span className="text-primary-foreground font-bold text-sm">✝</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;