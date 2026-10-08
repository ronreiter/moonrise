import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://moonrisetlv.com",
      lastModified: "2026-10-07",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://moonrisetlv.com/schedule",
      lastModified: "2026-10-07",
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
