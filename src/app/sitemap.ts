import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://moonrisetlv.com",
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
