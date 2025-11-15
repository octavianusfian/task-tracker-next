import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://task-tracker-next-chi.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
