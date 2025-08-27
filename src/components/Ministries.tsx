import { Button } from "@/components/ui/button";

const Ministries = () => {
  return (
    <section id="ministries" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Called to Serve - the only section retained on this page */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-4">Called to Serve?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe every believer is called to stand in the gap through prayer and service. If the Lord is stirring your heart to intercede and support the work of the ministry, we invite you to connect with us in prayer.
            </p>
            <div className="flex justify-center">
              <Button className="btn-primary" onClick={() => { window.location.href = 'https://t.me/+VFpTgRktDrI2MzA0'; }}>
                Join our prayer channel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ministries;