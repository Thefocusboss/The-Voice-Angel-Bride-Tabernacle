import { useState } from "react";
import { useSiteData, MorningTonicItem, UpcomingEventItem } from "@/lib/siteData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Sparkles,
  Church,
  Calendar,
  Megaphone,
  Lock,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";

const ADMIN_CRED_KEY = "vabt_admin_credentials_v1";
const ADMIN_SESSION_KEY = "vabt_admin_authenticated";

interface AdminCredentials {
  username: string;
  password: string;
}

const getAdminCredentials = (): AdminCredentials => {
  try {
    const raw = localStorage.getItem(ADMIN_CRED_KEY);
    if (!raw) {
      return { username: "Admin", password: "Michaelishere777" };
    }
    const parsed = JSON.parse(raw);
    return {
      username: parsed.username || "Admin",
      password: parsed.password || "Michaelishere777",
    };
  } catch {
    return { username: "Admin", password: "Michaelishere777" };
  }
};

const saveAdminCredentials = (creds: AdminCredentials) => {
  localStorage.setItem(ADMIN_CRED_KEY, JSON.stringify(creds));
};

const Admin = () => {
  const { data, updateData, resetData } = useSiteData();
  const [draft, setDraft] = useState(data);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getAdminCredentials();
    if (
      loginUsername.trim() === creds.username &&
      loginPassword === creds.password
    ) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginPassword("");
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
    toast.info("Logged out of Admin Dashboard.");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getAdminCredentials();

    if (!currentPassword) {
      toast.error("Please enter your former password.");
      return;
    }

    if (currentPassword !== creds.password) {
      toast.error("Former password is incorrect.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    saveAdminCredentials({
      username: creds.username,
      password: newPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    toast.success("Password updated successfully!");
  };

  const handleSave = () => {
    updateData(draft);
    toast.success("Changes saved and published to the website!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all sections back to their default content?")) {
      resetData();
      setDraft(JSON.parse(JSON.stringify(data)));
      window.location.reload();
    }
  };

  const handleImageUpload = (file: File, onLoaded: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onLoaded(reader.result);
        toast.success("Thumbnail image loaded! Click 'Save Changes' to publish.");
      }
    };
    reader.readAsDataURL(file);
  };

  // Morning Tonic helpers
  const updateTonicItem = (index: number, patch: Partial<MorningTonicItem>) => {
    const items = [...draft.morningTonic.items];
    items[index] = { ...items[index], ...patch };
    setDraft({
      ...draft,
      morningTonic: { ...draft.morningTonic, items },
    });
  };

  const addTonicItem = () => {
    const newItem: MorningTonicItem = {
      id: `tonic-${Date.now()}`,
      title: "New Morning Tonic Series",
      description: "Enter description for this teaching series",
      episodes: 1,
      thumbnail: "/Pastor.jpg",
    };
    setDraft({
      ...draft,
      morningTonic: {
        ...draft.morningTonic,
        items: [...draft.morningTonic.items, newItem],
      },
    });
  };

  const removeTonicItem = (index: number) => {
    const items = draft.morningTonic.items.filter((_, i) => i !== index);
    setDraft({
      ...draft,
      morningTonic: { ...draft.morningTonic, items },
    });
  };

  // Upcoming Events helpers
  const updateEventItem = (index: number, patch: Partial<UpcomingEventItem>) => {
    const items = [...draft.upcomingEvents.items];
    items[index] = { ...items[index], ...patch };
    setDraft({
      ...draft,
      upcomingEvents: { ...draft.upcomingEvents, items },
    });
  };

  const addEventItem = () => {
    const newEvent: UpcomingEventItem = {
      id: `event-${Date.now()}`,
      title: "New Church Event",
      date: "Upcoming Date",
      time: "10:00 AM",
      location: "Main Sanctuary",
      description: "Describe the upcoming gathering or service.",
      category: "Worship",
      recurring: false,
      image: "/Supernatural cloud.jpg",
    };
    setDraft({
      ...draft,
      upcomingEvents: {
        ...draft.upcomingEvents,
        items: [...draft.upcomingEvents.items, newEvent],
      },
    });
  };

  const removeEventItem = (index: number) => {
    const items = draft.upcomingEvents.items.filter((_, i) => i !== index);
    setDraft({
      ...draft,
      upcomingEvents: { ...draft.upcomingEvents, items },
    });
  };

  // Render Login Page when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/50 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Button>
            </Link>
          </div>

          <Card className="shadow-xl border-primary/20">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-serif">
                Admin Portal Login
              </CardTitle>
              <CardDescription>
                Sign in with your administrator credentials to manage Voice Angel Bride Tabernacle.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="Enter username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="btn-primary w-full py-3 text-base mt-2">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 pb-20">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="VABT Logo" className="h-8 w-auto" />
              <h1 className="text-lg font-bold">VABT Admin Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset Defaults
            </Button>
            <Button size="sm" onClick={handleSave} className="btn-primary py-2 px-4 text-sm gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Visibility Overview Bar */}
        <Card className="mb-8 border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Section Visibility Toggles</CardTitle>
            <CardDescription>
              Quickly show or hide sections on the public website. Remember to click "Save Changes" when done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Morning Tonic Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                <div className="flex items-center space-x-3">
                  {draft.morningTonic.visible ? (
                    <Eye className="w-5 h-5 text-primary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">Morning Tonic</p>
                    <p className="text-xs text-muted-foreground">
                      {draft.morningTonic.visible ? "Visible on site" : "Hidden"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={draft.morningTonic.visible}
                  onCheckedChange={(checked) =>
                    setDraft({
                      ...draft,
                      morningTonic: { ...draft.morningTonic, visible: checked },
                    })
                  }
                />
              </div>

              {/* Tithes & Offerings Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                <div className="flex items-center space-x-3">
                  {draft.tithesAndOfferings.visible ? (
                    <Eye className="w-5 h-5 text-primary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">Tithes & Offerings</p>
                    <p className="text-xs text-muted-foreground">
                      {draft.tithesAndOfferings.visible ? "Visible on site" : "Hidden"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={draft.tithesAndOfferings.visible}
                  onCheckedChange={(checked) =>
                    setDraft({
                      ...draft,
                      tithesAndOfferings: { ...draft.tithesAndOfferings, visible: checked },
                    })
                  }
                />
              </div>

              {/* Upcoming Events Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                <div className="flex items-center space-x-3">
                  {draft.upcomingEvents.visible ? (
                    <Eye className="w-5 h-5 text-primary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">Upcoming Events</p>
                    <p className="text-xs text-muted-foreground">
                      {draft.upcomingEvents.visible ? "Visible on site" : "Hidden"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={draft.upcomingEvents.visible}
                  onCheckedChange={(checked) =>
                    setDraft({
                      ...draft,
                      upcomingEvents: { ...draft.upcomingEvents, visible: checked },
                    })
                  }
                />
              </div>

              {/* Special Announcement Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                <div className="flex items-center space-x-3">
                  {draft.specialAnnouncement.visible ? (
                    <Eye className="w-5 h-5 text-primary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">Special Announcement</p>
                    <p className="text-xs text-muted-foreground">
                      {draft.specialAnnouncement.visible ? "Popup active" : "Popup hidden"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={draft.specialAnnouncement.visible}
                  onCheckedChange={(checked) =>
                    setDraft({
                      ...draft,
                      specialAnnouncement: { ...draft.specialAnnouncement, visible: checked },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Section Editors */}
        <Tabs defaultValue="morning-tonic" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto p-1 bg-background border">
            <TabsTrigger value="morning-tonic" className="py-3 gap-2">
              <Sparkles className="w-4 h-4" />
              Morning Tonic
            </TabsTrigger>
            <TabsTrigger value="tithes" className="py-3 gap-2">
              <Church className="w-4 h-4" />
              Tithes & Offerings
            </TabsTrigger>
            <TabsTrigger value="events" className="py-3 gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="announcement" className="py-3 gap-2">
              <Megaphone className="w-4 h-4" />
              Special Announcement
            </TabsTrigger>
            <TabsTrigger value="settings" className="py-3 gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* 1. MORNING TONIC EDITOR */}
          <TabsContent value="morning-tonic" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Morning Tonic Section</CardTitle>
                  <CardDescription>Edit section headings, podcast cards, and thumbnails.</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="mt-visible">Section Visible</Label>
                  <Switch
                    id="mt-visible"
                    checked={draft.morningTonic.visible}
                    onCheckedChange={(checked) =>
                      setDraft({
                        ...draft,
                        morningTonic: { ...draft.morningTonic, visible: checked },
                      })
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={draft.morningTonic.sectionTitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          morningTonic: { ...draft.morningTonic, sectionTitle: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Subtitle</Label>
                    <Input
                      value={draft.morningTonic.sectionSubtitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          morningTonic: { ...draft.morningTonic, sectionSubtitle: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <h3 className="font-semibold text-lg">Morning Tonic Items</h3>
                  <Button onClick={addTonicItem} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Tonic Card
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {draft.morningTonic.items.map((item, index) => (
                    <Card key={item.id || index} className="overflow-hidden border">
                      <div className="relative h-44 bg-muted">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => removeTonicItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-1.5">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateTonicItem(index, { title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateTonicItem(index, { description: e.target.value })}
                            rows={2}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Episodes Count</Label>
                          <Input
                            type="number"
                            value={item.episodes}
                            onChange={(e) =>
                              updateTonicItem(index, { episodes: Number(e.target.value) || 0 })
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Thumbnail URL or Upload</Label>
                          <Input
                            value={item.thumbnail}
                            placeholder="/Pastor.jpg or https://..."
                            onChange={(e) => updateTonicItem(index, { thumbnail: e.target.value })}
                          />
                          <label className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-primary cursor-pointer hover:underline">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(file, (dataUrl) =>
                                    updateTonicItem(index, { thumbnail: dataUrl })
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. TITHES & OFFERINGS EDITOR */}
          <TabsContent value="tithes" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tithes & Offerings Section</CardTitle>
                  <CardDescription>Edit bank account details and section text.</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="to-visible">Section Visible</Label>
                  <Switch
                    id="to-visible"
                    checked={draft.tithesAndOfferings.visible}
                    onCheckedChange={(checked) =>
                      setDraft({
                        ...draft,
                        tithesAndOfferings: { ...draft.tithesAndOfferings, visible: checked },
                      })
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={draft.tithesAndOfferings.sectionTitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          tithesAndOfferings: {
                            ...draft.tithesAndOfferings,
                            sectionTitle: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient / Account Name</Label>
                    <Input
                      value={draft.tithesAndOfferings.recipient}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          tithesAndOfferings: {
                            ...draft.tithesAndOfferings,
                            recipient: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      value={draft.tithesAndOfferings.accountNumber}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          tithesAndOfferings: {
                            ...draft.tithesAndOfferings,
                            accountNumber: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input
                      value={draft.tithesAndOfferings.bankName}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          tithesAndOfferings: {
                            ...draft.tithesAndOfferings,
                            bankName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Section Subtitle / Description</Label>
                  <Textarea
                    rows={3}
                    value={draft.tithesAndOfferings.sectionSubtitle}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        tithesAndOfferings: {
                          ...draft.tithesAndOfferings,
                          sectionSubtitle: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. UPCOMING EVENTS EDITOR */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events Section</CardTitle>
                  <CardDescription>Manage church events, dates, locations, and event thumbnails.</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="ue-visible">Section Visible</Label>
                  <Switch
                    id="ue-visible"
                    checked={draft.upcomingEvents.visible}
                    onCheckedChange={(checked) =>
                      setDraft({
                        ...draft,
                        upcomingEvents: { ...draft.upcomingEvents, visible: checked },
                      })
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={draft.upcomingEvents.sectionTitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          upcomingEvents: { ...draft.upcomingEvents, sectionTitle: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Subtitle</Label>
                    <Input
                      value={draft.upcomingEvents.sectionSubtitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          upcomingEvents: {
                            ...draft.upcomingEvents,
                            sectionSubtitle: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <h3 className="font-semibold text-lg">Event Cards</h3>
                  <Button onClick={addEventItem} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Event
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draft.upcomingEvents.items.map((event, index) => (
                    <Card key={event.id || index} className="overflow-hidden border">
                      <div className="relative h-44 bg-muted">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => removeEventItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <div className="space-y-1">
                          <Label>Event Title</Label>
                          <Input
                            value={event.title}
                            onChange={(e) => updateEventItem(index, { title: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label>Date</Label>
                            <Input
                              value={event.date}
                              onChange={(e) => updateEventItem(index, { date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Time</Label>
                            <Input
                              value={event.time}
                              onChange={(e) => updateEventItem(index, { time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label>Location</Label>
                            <Input
                              value={event.location}
                              onChange={(e) => updateEventItem(index, { location: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Category</Label>
                            <Input
                              value={event.category}
                              onChange={(e) => updateEventItem(index, { category: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <Label htmlFor={`rec-${index}`} className="text-xs">
                            Recurring Event Badge
                          </Label>
                          <Switch
                            id={`rec-${index}`}
                            checked={event.recurring}
                            onCheckedChange={(checked) =>
                              updateEventItem(index, { recurring: checked })
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Description</Label>
                          <Textarea
                            rows={2}
                            value={event.description}
                            onChange={(e) =>
                              updateEventItem(index, { description: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Thumbnail URL or Upload</Label>
                          <Input
                            value={event.image}
                            onChange={(e) => updateEventItem(index, { image: e.target.value })}
                          />
                          <label className="mt-1 inline-flex items-center gap-2 text-xs font-medium text-primary cursor-pointer hover:underline">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(file, (dataUrl) =>
                                    updateEventItem(index, { image: dataUrl })
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. SPECIAL ANNOUNCEMENT EDITOR */}
          <TabsContent value="announcement" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Special Announcement Popup</CardTitle>
                  <CardDescription>
                    Edit the special announcement popup shown on landing page load.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sa-visible">Popup Visible</Label>
                  <Switch
                    id="sa-visible"
                    checked={draft.specialAnnouncement.visible}
                    onCheckedChange={(checked) =>
                      setDraft({
                        ...draft,
                        specialAnnouncement: {
                          ...draft.specialAnnouncement,
                          visible: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="space-y-3">
                    <Label>Announcement Thumbnail</Label>
                    <div className="h-48 rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                      {draft.specialAnnouncement.thumbnail ? (
                        <img
                          src={draft.specialAnnouncement.thumbnail}
                          alt="Announcement Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No thumbnail set</span>
                      )}
                    </div>
                    <Input
                      placeholder="Image URL (or leave empty to hide thumbnail)"
                      value={draft.specialAnnouncement.thumbnail}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          specialAnnouncement: {
                            ...draft.specialAnnouncement,
                            thumbnail: e.target.value,
                          },
                        })
                      }
                    />
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-primary cursor-pointer hover:underline">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, (dataUrl) =>
                              setDraft({
                                ...draft,
                                specialAnnouncement: {
                                  ...draft.specialAnnouncement,
                                  thumbnail: dataUrl,
                                },
                              })
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <Label>Announcement Heading</Label>
                      <Input
                        value={draft.specialAnnouncement.title}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            specialAnnouncement: {
                              ...draft.specialAnnouncement,
                              title: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Announcement Message</Label>
                      <Textarea
                        rows={4}
                        value={draft.specialAnnouncement.description}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            specialAnnouncement: {
                              ...draft.specialAnnouncement,
                              description: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Primary Button Label</Label>
                        <Input
                          value={draft.specialAnnouncement.primaryButtonText}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              specialAnnouncement: {
                                ...draft.specialAnnouncement,
                                primaryButtonText: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary Button Label</Label>
                        <Input
                          value={draft.specialAnnouncement.secondaryButtonText}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              specialAnnouncement: {
                                ...draft.specialAnnouncement,
                                secondaryButtonText: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 5. SETTINGS / PASSWORD CHANGE */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="max-w-xl">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <CardTitle>Security & Password Settings</CardTitle>
                </div>
                <CardDescription>
                  Update your administrator password. You must verify your former password before setting a new one.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="former-password">Former Password</Label>
                    <Input
                      id="former-password"
                      type="password"
                      placeholder="Enter your former password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                    <Input
                      id="confirm-new-password"
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-primary py-2.5 px-6 text-base">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
