import { useEffect, useState } from "react";

export interface MorningTonicItem {
  id: string;
  title: string;
  description: string;
  episodes: number;
  thumbnail: string;
  link?: string;
}

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

export interface SiteData {
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
  };
}

export const defaultSiteData: SiteData = {
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
    items: [
      {
        id: "tonic-1",
        title: "Daily Devotions with Pastor Michael",
        description: "Start your day with inspiring words from God's messenger",
        episodes: 127,
        thumbnail: "/Pastor.jpg",
      },
      {
        id: "tonic-2",
        title: "End Time Revelations",
        description: "Deep dive into prophetic teachings and Bible mysteries",
        episodes: 89,
        thumbnail: "/Supernatural cloud huffman.jpg",
      },
      {
        id: "tonic-3",
        title: "Apostolic Faith Series",
        description: "Foundational teachings on original apostolic beliefs",
        episodes: 156,
        thumbnail: "/Huffman christ.jpg",
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
  },
};

const STORAGE_KEY = "vabt_site_data_v1";
const UPDATE_EVENT = "vabt_site_data_updated";

export const getSiteData = (): SiteData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteData;
    const parsed = JSON.parse(raw);
    return {
      liveServices: { ...defaultSiteData.liveServices, ...parsed.liveServices },
      morningTonic: { ...defaultSiteData.morningTonic, ...parsed.morningTonic },
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
      },
    };
  } catch {
    return defaultSiteData;
  }
};

export const saveSiteData = (data: SiteData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const resetSiteData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
  return defaultSiteData;
};

export const useSiteData = () => {
  const [data, setData] = useState<SiteData>(getSiteData);

  useEffect(() => {
    const handleUpdate = () => setData(getSiteData());
    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateData = (next: SiteData) => {
    setData(next);
    saveSiteData(next);
  };

  return { data, updateData, resetData: () => setData(resetSiteData()) };
};
