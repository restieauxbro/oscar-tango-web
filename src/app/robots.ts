import { BASE_URL } from "@/lib/constants";
import { isDev } from "@/lib/utils";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const dev = isDev();
  if (dev) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/blog/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
