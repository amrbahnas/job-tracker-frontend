import type { MetadataRoute } from "next"

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://dorly.io")

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dorly — Find New Jobs Before Everyone Else",
    short_name: "Dorly",
    description:
      "Job tracker that monitors LinkedIn, Indeed, Bayt and more. One feed, apply first.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/images/logo/image_49817605-6600-435a-bd0a-1171422e842b.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["business", "productivity"],
  }
}
