import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Church, Copy, Check, Building2, UserCheck, CreditCard } from "lucide-react";
import { useState } from "react";
import { useSiteData } from "@/lib/siteData";

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const { data } = useSiteData();
  const { tithesAndOfferings } = data;

  if (!tithesAndOfferings.visible) {
    return null;
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(tithesAndOfferings.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donate" className="py-14 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title">{tithesAndOfferings.sectionTitle}</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {tithesAndOfferings.sectionSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Account Details Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg overflow-hidden border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/10 p-5 sm:p-6">
                <CardTitle className="flex items-center text-xl sm:text-2xl">
                  <Church className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                  Bank Transfer Details
                </CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Send your tithes, offerings, and kingdom seeds directly using the church account details below.
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6">
                  {/* Recipient */}
                  <div className="flex items-start p-4 sm:p-5 rounded-xl bg-background border border-border shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Recipient / Account Name</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground mt-1 break-words">{tithesAndOfferings.recipient}</p>
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-background border-2 border-primary/30 shadow-sm">
                    <div className="flex items-start">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Account Number</p>
                        <p className="text-2xl md:text-3xl font-extrabold tracking-wider text-primary mt-1 break-all">
                          {tithesAndOfferings.accountNumber}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyAccountNumber}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Bank Name */}
                  <div className="flex items-start p-4 sm:p-5 rounded-xl bg-background border border-border shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Bank Name</p>
                      <p className="text-lg sm:text-xl font-bold text-foreground mt-1">{tithesAndOfferings.bankName}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Scripture */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <blockquote className="text-sm italic text-muted-foreground mb-3 leading-relaxed">
                  "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it."
                </blockquote>
                <cite className="text-xs font-semibold text-primary">Malachi 3:10</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;