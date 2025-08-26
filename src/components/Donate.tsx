import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, DollarSign, Church, Users, Globe, Shield, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";

const Donate = () => {
  const [donationType, setDonationType] = useState("tithe");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const donationPurposes = [
    {
      id: "tithe",
      title: "Tithes & Offerings",
      description: "Support the general ministry and operations of the church",
      icon: Church,
      verse: "Bring all the tithes into the storehouse... - Malachi 3:10"
    },
    {
      id: "missions",
      title: "Missions & Outreach",
      description: "Spread the end-time message to communities around the world",
      icon: Globe,
      verse: "Go ye into all the world... - Mark 16:15"
    },
    {
      id: "building",
      title: "Building Fund",
      description: "Support the expansion and maintenance of our church facilities",
      icon: Church,
      verse: "Unless the Lord builds the house... - Psalm 127:1"
    },
    {
      id: "youth",
      title: "Youth Ministry",
      description: "Invest in the next generation and their spiritual development",
      icon: Users,
      verse: "Train up a child in the way he should go... - Proverbs 22:6"
    }
  ];

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <section id="donate" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Give & Support</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your generous giving helps advance God's kingdom work and supports the spreading of the end-time message to prepare the bride church.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="w-6 h-6 text-primary mr-3" />
                  Make a Donation
                </CardTitle>
                <p className="text-muted-foreground">
                  Choose how you'd like to support our ministry and the work of God's kingdom.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donation Purpose */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Choose Donation Purpose</Label>
                  <RadioGroup value={donationType} onValueChange={setDonationType} className="grid md:grid-cols-2 gap-4">
                    {donationPurposes.map((purpose) => {
                      const IconComponent = purpose.icon;
                      return (
                        <div key={purpose.id} className="relative">
                          <RadioGroupItem value={purpose.id} id={purpose.id} className="peer sr-only" />
                          <Label 
                            htmlFor={purpose.id}
                            className="flex flex-col p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <IconComponent className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{purpose.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{purpose.description}</p>
                                <p className="text-xs text-primary mt-2 italic">{purpose.verse}</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                {/* Amount Selection */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Select Amount</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {suggestedAmounts.map((suggestedAmount) => (
                      <Button
                        key={suggestedAmount}
                        variant={amount === suggestedAmount.toString() ? "default" : "outline"}
                        onClick={() => {
                          setAmount(suggestedAmount.toString());
                          setCustomAmount("");
                        }}
                        className="text-sm"
                      >
                        ${suggestedAmount}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount("");
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" placeholder="Enter your email address" />
                </div>

                <div>
                  <Label htmlFor="message">Prayer Request or Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Share any prayer requests or special intentions with your donation"
                    className="min-h-[100px]"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Payment Method</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="btn-primary h-auto p-4 flex items-center justify-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Credit/Debit Card</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex items-center justify-center space-x-2">
                      <Smartphone className="w-5 h-5" />
                      <span>Mobile Payment</span>
                    </Button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-start p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <Shield className="w-5 h-5 text-secondary-deep mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-secondary-deep">Secure Donation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your donation is processed securely through encrypted payment systems. 
                      You will receive a receipt for tax-deductible contributions.
                    </p>
                  </div>
                </div>

                <Button className="btn-primary w-full text-lg py-3">
                  Complete Donation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border border-primary/20 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">$25</div>
                  <p className="text-sm text-muted-foreground">Provides Bibles for new converts</p>
                </div>
                <div className="text-center p-4 border border-secondary-deep/20 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary-deep">$50</div>
                  <p className="text-sm text-muted-foreground">Supports youth ministry activities</p>
                </div>
                <div className="text-center p-4 border border-accent/20 rounded-lg bg-accent/10">
                  <div className="text-2xl font-bold text-accent-foreground">$100</div>
                  <p className="text-sm text-muted-foreground">Funds community outreach programs</p>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Giving */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Give</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Bank Transfer</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    For direct bank transfers or recurring donations
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Bank Details
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Mail a Check</h4>
                  <p className="text-sm text-muted-foreground">
                    Send checks payable to:<br />
                    <strong>Voice Angel Bride Tabernacle</strong>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recurring Giving</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Set up automatic monthly donations
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Setup Recurring
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scripture */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <blockquote className="text-sm italic text-muted-foreground mb-3">
                  "Give, and it shall be given unto you; good measure, pressed down, and shaken together, 
                  and running over, shall men give into your bosom."
                </blockquote>
                <cite className="text-xs font-semibold text-primary">Luke 6:38</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;