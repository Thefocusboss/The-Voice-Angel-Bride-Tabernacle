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

export interface SiteData {
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
  morningTonic: {
    visible: true,
    sectionTitle: "Morning Tonic",
    sectionSubtitle: "Listen anytime, anywhere to life-transforming teachings",
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
