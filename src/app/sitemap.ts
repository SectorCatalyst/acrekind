import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy/", "/terms/"].map((path) => ({ url: `https://acrekind.com${path}`, lastModified: new Date("2026-07-31") }));
}
