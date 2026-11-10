import { useEffect, useState } from "react";

export const TELEGRAM_PAGE_URL = "https://t.me/+VFpTgRktDrI2MzA0";

export interface MorningTonicPostItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface MorningTonicItem {
  id: string;
  date: string;
  preacher: string;
  thumbnail: string;
  link?: string;
}

export const getFormattedToday = (): string =>
  new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export interface UpcomingEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  recurring: boolean;
  image: string;
}

export interface LiveServiceItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const getYouTubeThumbnailUrl = (url: string): string | null => {
  const id = extractYouTubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
};

export const getYouTubeEmbedUrl = (url: string): string => {
  const id = extractYouTubeVideoId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  }
  return url;
};

export interface ExtraAnnouncementItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

export interface ContactInfoCard {
  id: string;
  iconType: "location" | "phone" | "mail" | "clock";
  title: string;
  details: string[];
  actionLabel: string;
  actionLink?: string;
}

export interface SiteData {
  welcome: {
    visible: boolean;
    showFeaturedVideo: boolean;
    featuredVideoUrl: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    pastorName: string;
    pastorRole: string;
    pastorImage: string;
    buttonText: string;
  };
  aboutVabt: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    foundationTitle: string;
    foundationParagraph1: string;
    foundationParagraph2: string;
    agesTitle: string;
    agesDescription: string;
    missionTitle: string;
    missionParagraph1: string;
    missionParagraph2: string;
    revelationTitle: string;
    revelationDescription: string;
    revelationImage: string;
  };
  liveServices: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    recentHeading: string;
    items: LiveServiceItem[];
  };
  morningTonic: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    postsHeading: string;
    posts: MorningTonicPostItem[];
    telegramHeading: string;
    items: MorningTonicItem[];
  };
  tithesAndOfferings: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    recipient: string;
    accountNumber: string;
    bankName: string;
  };
  upcomingEvents: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    items: UpcomingEventItem[];
  };
  specialAnnouncement: {
    visible: boolean;
    title: string;
    description: string;
    thumbnail: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    extraAnnouncements: ExtraAnnouncementItem[];
  };
  contactUs: {
    visible: boolean;
    sectionTitle: string;
    sectionSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    cards: ContactInfoCard[];
    showMap: boolean;
    mapTitle: string;
    mapSubtitle: string;
    mapEmbedUrl: string;
    directionsUrl: string;
    firstVisitTitle: string;
    firstVisitPoints: string[];
    needPrayerTitle: string;
    needPrayerDescription: string;
    prayerLine: string;
    prayerEmail: string;
    prayerInPerson: string;
  };
}

export const extractMapEmbedUrl = (input: string): string => {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  return srcMatch?.[1] || trimmed;
};

export const defaultSiteData: SiteData = {
  welcome: {
    visible: true,
    showFeaturedVideo: true,
    featuredVideoUrl: "https://www.youtube.com/embed/5CJS7QGtbok?rel=0&modestbranding=1",
    heading: "Welcome Message",
    paragraph1:
      '"I want to specially welcome you to this Gospel centre. No doubt you didn\'t stumble into this site by chance but by God\'s divine arrangement. Possibly you have a need or a question that needs urgent attention."',
    paragraph2:
      '"The good news of the gospel of Jesus Christ is a heart warming news that soothes even the most turbulent soul. You can confidently feel free to share with us as we promise to be of help in whatever little way that we can."',
    pastorName: "Rev. Michael Chuzie Chukwuezi",
    pastorRole: "Pastor-in-charge",
    pastorImage: "/Pastor.jpg",
    buttonText: "Contact Pastor Michael",
  },
  aboutVabt: {
    visible: true,
    sectionTitle: "About VABT",
    sectionSubtitle:
      "Learn about our history, mission, and the end-time message we proclaim to the world.",
    foundationTitle: "Our Foundation",
    foundationParagraph1:
      "The Voice Angel Bride Tabernacle, formerly known as Omega Bride Fellowship church, is an End time message church. We proclaim the original Apostolic Faith and Belief of the Bible promise to send a Voice at the end of the Gentile dispensation.",
    foundationParagraph2:
      "We believe in calling the Bride out of the church denominations into the living reality of the living God, confirming the Bible Truth that Jesus Christ is the same yesterday, today, and forever.",
    agesTitle: "Seven Church Ages",
    agesDescription:
      "We believe the Gentiles were allotted seven church age dispensations before the Gospel returns back to the Jews as the original vine according to the mystery of God revealed by Apostle Paul in Romans chapter 11.",
    missionTitle: "Our Mission",
    missionParagraph1:
      "As a Church, we stand unwavering and committed to the teachings of God's prophet messenger William Marion Branham and the Apostolic Echo Voice messenger Joseph Coleman of New York City.",
    missionParagraph2:
      "We believe that every true ministry of Ephesians 4:11-13 will stand identified with God's prophet to say just what those tapes say.",
    revelationTitle: "End Time Revelation",
    revelationDescription:
      "At the close of the seven church ages, we see Jesus standing at the door outside the church knocking to enter. The son of man is revealed to this Age through a prophetic office of the seventh angel messenger.",
    revelationImage: "/william marrion branham.jpg",
  },
  liveServices: {
    visible: true,
    sectionTitle: "Live Services on YouTube",
    sectionSubtitle:
      "Experience life-changing messages that reveal the mysteries of God and prepare the bride for the rapture.",
    recentHeading: "Recent Messages",
    items: [
      {
        id: "service-1",
        title: "The 3rd Pull: A Mountain in the Top of Mountains, A Tent Within a Tent",
        date: "Voice Angel Bride Tabernacle",
        duration: "Full Message",
        description:
          "Understanding the divine revelation of the Third Pull and its significance for the bride church today.",
        thumbnail: "https://i.ytimg.com/vi/6q3FA5c5k8U/hqdefault.jpg",
        videoUrl: "https://youtu.be/6q3FA5c5k8U?si=gyAxSfsZ94JHi7yL",
      },
      {
        id: "service-2",
        title: "Recognizing His Voice in the Midst of Voices",
        date: "October 18, 2026",
        duration: "Sunday Service",
        description:
          "Hearing and discerning the true Voice of God amidst the many voices in this end-time age.",
        thumbnail: "https://i.ytimg.com/vi/whZcLU9QSFg/hqdefault.jpg",
        videoUrl: "https://youtu.be/whZcLU9QSFg?si=QcgDEGVsYiH2g04O",
      },
      {
        id: "service-3",
        title: "Unto Thee Shall It Come, Even the First Dominion",
        date: "Voice Angel Bride Tabernacle",
        duration: "Live Service",
        description:
          "The restoration of the original apostolic dominion and promise to the end-time bride of Christ.",
        thumbnail: "https://i.ytimg.com/vi/_7d8PzZRxxY/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/live/_7d8PzZRxxY?si=CEUnMrTs5m1w8Wqk",
      },
    ],
  },
  morningTonic: {
    visible: true,
    sectionTitle: "Morning Tonic",
    sectionSubtitle: "Listen anytime, anywhere to our morning tonics",
    postsHeading: "Daily Devotion Post",
    posts: [
      {
        id: "post-1",
        title: "Daily Devotion — Read • Reflect • Pray",
        description: "Grow closer to God every day with Voice Angel Bride Tabernacle, Suleja.",
        date: "November 10, 2026",
        image: "/morning-tonic-post.jpg",
      },
    ],
    telegramHeading: "Play from Telegram",
    items: [
      {
        id: "tonic-1",
        date: "November 10, 2026",
        preacher: "Rev. Michael Chuzie Chukwuezi",
        thumbnail: "/morning-tonic-telegram.jpg",
        link: "https://t.me/c/2147639704/24862",
      },
      {
        id: "tonic-2",
        date: "November 10, 2026",
        preacher: "Rev. Michael Chuzie Chukwuezi",
        thumbnail: "/morning-tonic-telegram.jpg",
        link: "",
      },
      {
        id: "tonic-3",
        date: "November 10, 2026",
        preacher: "Rev. Michael Chuzie Chukwuezi",
        thumbnail: "/morning-tonic-telegram.jpg",
        link: "",
      },
    ],
  },
  tithesAndOfferings: {
    visible: true,
    sectionTitle: "Tithes & Offerings",
    sectionSubtitle:
      "Your generous giving helps advance God's kingdom work and supports the spreading of the end-time message to prepare the bride church.",
    recipient: "Voice Angel Bride Tabernacle",
    accountNumber: "8162628373",
    bankName: "Moniepoint",
  },
  upcomingEvents: {
    visible: true,
    sectionTitle: "Upcoming Events",
    sectionSubtitle:
      "Join us for life-changing gatherings, powerful worship, and fellowship opportunities that strengthen your faith.",
    items: [
      {
        id: "event-1",
        title: "Sunday Worship Service",
        date: "Every Sunday",
        time: "10:00 AM - 12:00 PM",
        location: "Main Sanctuary",
        description:
          "Join us for powerful worship, anointed preaching, and fellowship in the presence of the Almighty.",
        category: "Worship",
        recurring: true,
        image:
          "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=200&fit=crop&crop=center",
      },
      {
        id: "event-2",
        title: "Mid-Week Prayer Meeting",
        date: "Every Wednesday",
        time: "6:00 PM - 8:00 PM",
        location: "Prayer Hall",
        description:
          "Come together for powerful intercession and seeking God's face for revival and breakthrough.",
        category: "Prayer",
        recurring: true,
        image:
          "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=200&fit=crop&crop=center",
      },
      {
        id: "event-3",
        title: "Easter Convention 2026",
        date: "April 3-5, 2026",
        time: "9:00 AM - 6:00 PM",
        location: "Conference Center",
        description:
          "Three days of resurrection power, apostolic teaching, and end-time revival meetings.",
        category: "Conference",
        recurring: false,
        image: "/Supernatural cloud.jpg",
      },
      {
        id: "event-4",
        title: "Youth Fellowship & Bible Study",
        date: "Every Friday",
        time: "7:00 PM - 9:00 PM",
        location: "Youth Center",
        description:
          "Dynamic youth gatherings with worship, Bible study, and fellowship for ages 13-30.",
        category: "Youth",
        recurring: true,
        image:
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=200&fit=crop&crop=center",
      },
      {
        id: "event-5",
        title: "Bukuru convention coming december",
        date: "December 15-17, 2025",
        time: "All Day Event",
        location: "Convention Center",
        description:
          "A powerful three-day convention with anointed preaching, worship, and fellowship for spiritual renewal.",
        category: "Convention",
        recurring: false,
        image: "/Supernatural cloud huffman.jpg",
      },
      {
        id: "event-6",
        title: "Evengalical Outreach Program",
        date: "January 25, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Community Center",
        description:
          "Reaching out to our community with the gospel message, love, food distribution, and prayer ministry.",
        category: "Outreach",
        recurring: false,
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop&crop=center",
      },
    ],
  },
  specialAnnouncement: {
    visible: true,
    title: "Special Announcement",
    description:
      "Bukuru Youth meetings hold on September 5th, 2025. Pray with us and plan to attend. God bless you.",
    thumbnail: "/Supernatural cloud.jpg",
    primaryButtonText: "Add to Calendar",
    secondaryButtonText: "Share Announcement",
    extraAnnouncements: [],
  },
  contactUs: {
    visible: true,
    sectionTitle: "Contact Us",
    sectionSubtitle:
      "We'd love to hear from you! Get in touch with us for prayer requests, questions, or to plan your visit.",
    formTitle: "Send Us a Message",
    formSubtitle:
      "Fill out the form below and we'll get back to you as soon as possible.",
    cards: [
      {
        id: "contact-location",
        iconType: "location",
        title: "Our Location",
        details: [
          "Our Location",
          "Home school Avenue",
          "Red cross Kwamba",
          "Niger state",
        ],
        actionLabel: "Get Directions",
        actionLink: "https://maps.app.goo.gl/nfi6e5qY6EVWTwDT6",
      },
      {
        id: "contact-phone",
        iconType: "phone",
        title: "Phone Numbers",
        details: [
          "Church Office: (555) 123-4567",
          "Pastor's Line: (555) 987-6543",
          "Prayer Line: (555) 456-7890",
        ],
        actionLabel: "Call Now",
        actionLink: "",
      },
      {
        id: "contact-email",
        iconType: "mail",
        title: "Email Addresses",
        details: [
          "info@vabtministries.org",
          "pastor@vabtministries.org",
          "prayer@vabtministries.org",
        ],
        actionLabel: "Send Email",
        actionLink: "mailto:info@vabtministries.org",
      },
      {
        id: "contact-times",
        iconType: "clock",
        title: "Service Times",
        details: [
          "Sunday Worship: Doors open 8:00 AM, Sunday School, Service starts 9:00 AM",
          "Wednesday Service: Doors open 5:30 PM, Service starts 6:00 PM",
          "Friday Service: Doors open 5:30 PM, Service starts 6:00 PM",
        ],
        actionLabel: "View Schedule",
        actionLink: "#events",
      },
    ],
    showMap: true,
    mapTitle: "Find Us",
    mapSubtitle:
      "Located in Kwamba, Suleja, Niger State — we're easy to find and excited to welcome you.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.14605883135533!2d7.166570854981875!3d9.214128120133061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104dd30015fb9461%3A0xe80e378496a5d86b!2sVoice%20Angel%20Bride%20Tabernacle%20Church!5e0!3m2!1sen!2sng!4v1794336411268!5m2!1sen!2sng",
    directionsUrl: "https://maps.app.goo.gl/nfi6e5qY6EVWTwDT6",
    firstVisitTitle: "Planning Your First Visit?",
    firstVisitPoints: [
      "Doors open 8:00 AM; Sunday School; Service starts 9:00 AM on Sundays",
      "Casual or formal dress - come as you are!",
      "Free parking available on-site and nearby streets",
    ],
    needPrayerTitle: "Need Prayer?",
    needPrayerDescription:
      "Our prayer team is available to pray with you and support you through any challenges you're facing. Don't hesitate to reach out - we believe in the power of prayer and would be honored to stand with you.",
    prayerLine: "(555) 456-7890",
    prayerEmail: "prayer@vabtministries.org",
    prayerInPerson: "Before or after any service",
  },
};

const STORAGE_KEY = "vabt_site_data_v1";
const UPDATE_EVENT = "vabt_site_data_updated";
const API_ENDPOINT = "/.netlify/functions/site-data";

export const mergeSiteData = (parsed: Partial<SiteData> | null | undefined): SiteData => {
  if (!parsed || typeof parsed !== "object") return defaultSiteData;
  return {
    welcome: { ...defaultSiteData.welcome, ...parsed.welcome },
    aboutVabt: { ...defaultSiteData.aboutVabt, ...parsed.aboutVabt },
    liveServices: { ...defaultSiteData.liveServices, ...parsed.liveServices },
    morningTonic: {
      ...defaultSiteData.morningTonic,
      ...parsed.morningTonic,
      postsHeading:
        parsed.morningTonic?.postsHeading || defaultSiteData.morningTonic.postsHeading,
      posts: (parsed.morningTonic?.posts || defaultSiteData.morningTonic.posts).map(
        (post: MorningTonicPostItem) => ({
          ...post,
          date: post.date ?? "November 10, 2026",
        })
      ),
      telegramHeading:
        parsed.morningTonic?.telegramHeading ||
        defaultSiteData.morningTonic.telegramHeading,
      items: (parsed.morningTonic?.items || defaultSiteData.morningTonic.items).map(
        (item: MorningTonicItem) => {
          const oldDefaults = [
            "/Pastor.jpg",
            "/Supernatural cloud huffman.jpg",
            "/Huffman christ.jpg",
            "/morning-tonic.jpg",
          ];
          return {
            id: item.id,
            date: item.date ?? "November 10, 2026",
            thumbnail: oldDefaults.includes(item.thumbnail)
              ? "/morning-tonic-telegram.jpg"
              : item.thumbnail,
            preacher: item.preacher || "Rev. Michael Chuzie Chukwuezi",
            link:
              item.link !== undefined
                ? item.link
                : item.id === "tonic-1"
                  ? "https://t.me/c/2147639704/24862"
                  : "",
          };
        }
      ),
    },
    tithesAndOfferings: {
      ...defaultSiteData.tithesAndOfferings,
      ...parsed.tithesAndOfferings,
    },
    upcomingEvents: {
      ...defaultSiteData.upcomingEvents,
      ...parsed.upcomingEvents,
    },
    specialAnnouncement: {
      ...defaultSiteData.specialAnnouncement,
      ...parsed.specialAnnouncement,
      extraAnnouncements: parsed.specialAnnouncement?.extraAnnouncements || [],
    },
    contactUs: {
      ...defaultSiteData.contactUs,
      ...parsed.contactUs,
      mapEmbedUrl:
        parsed.contactUs?.mapEmbedUrl ?? defaultSiteData.contactUs.mapEmbedUrl,
      directionsUrl:
        parsed.contactUs?.directionsUrl || defaultSiteData.contactUs.directionsUrl,
      cards: (parsed.contactUs?.cards || defaultSiteData.contactUs.cards).map(
        (card: ContactInfoCard) =>
          card.id === "contact-location" && !card.actionLink
            ? { ...card, actionLink: "https://maps.app.goo.gl/nfi6e5qY6EVWTwDT6" }
            : card
      ),
      firstVisitPoints:
        parsed.contactUs?.firstVisitPoints || defaultSiteData.contactUs.firstVisitPoints,
    },
  };
};

export const getSiteData = (): SiteData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteData;
    return mergeSiteData(JSON.parse(raw));
  } catch {
    return defaultSiteData;
  }
};

export const saveSiteData = (data: SiteData) => {
  const merged = mergeSiteData(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event(UPDATE_EVENT));
  return merged;
};

export const resetSiteData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
  return defaultSiteData;
};

let remoteSyncPromise: Promise<SiteData | null> | null = null;
let mutationVersion = 0;

export const fetchRemoteSiteData = async (force = false): Promise<SiteData | null> => {
  if (!force && remoteSyncPromise) {
    return remoteSyncPromise;
  }

  const startVersion = mutationVersion;
  remoteSyncPromise = (async () => {
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "GET",
        cache: "no-store",
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.includes("application/json")) {
        return null;
      }
      const payload = await res.json();
      if (startVersion !== mutationVersion) {
        return null;
      }
      if (payload?.exists && payload?.data) {
        const merged = saveSiteData(payload.data);
        return merged;
      }
      return null;
    } catch {
      return null;
    }
  })();

  return remoteSyncPromise;
};

export const saveRemoteSiteData = async (data: SiteData): Promise<boolean> => {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const contentType = res.headers.get("content-type") || "";
    if (res.status === 404 || !contentType.includes("application/json")) {
      // Running locally without Netlify Functions; localStorage save still succeeded
      return false;
    }
    if (!res.ok) {
      throw new Error("Server failed to save site updates");
    }
    return true;
  } catch (err) {
    if (err instanceof Error && err.message === "Server failed to save site updates") {
      throw err;
    }
    return false;
  }
};

export const resetRemoteSiteData = async (): Promise<void> => {
  try {
    await fetch(API_ENDPOINT, { method: "DELETE" });
  } catch {
    // Ignore when running locally without Netlify Functions
  }
};

export const useSiteData = () => {
  const [data, setData] = useState<SiteData>(getSiteData);

  useEffect(() => {
    const handleUpdate = () => setData(getSiteData());
    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    fetchRemoteSiteData().then((remote) => {
      if (remote) {
        setData(remote);
      }
    });

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateData = async (next: SiteData): Promise<{ remoteSaved: boolean }> => {
    mutationVersion++;
    const merged = saveSiteData(next);
    remoteSyncPromise = Promise.resolve(merged);
    setData(merged);
    const remoteSaved = await saveRemoteSiteData(merged);
    return { remoteSaved };
  };

  const resetData = async (): Promise<SiteData> => {
    mutationVersion++;
    const defaults = resetSiteData();
    remoteSyncPromise = Promise.resolve(null);
    setData(defaults);
    await resetRemoteSiteData();
    return defaults;
  };

  return { data, updateData, resetData };
};
