const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://dawarly.io")

export function LandingJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dawarly",
    url: baseUrl,
    description:
      "Dawarly automatically monitors LinkedIn, Indeed, Bayt, and other job platforms to surface the newest roles in one centralized job feed so you can apply first and stay organized.",
    sameAs: [],
  }

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dawarly",
    url: baseUrl,
    applicationCategory: "BusinessApplication",
    description:
      "Job tracker and aggregation platform. Monitor LinkedIn, Indeed, Bayt and other job boards in one feed. Apply to new roles first.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dawarly",
    url: baseUrl,
    description:
      "Find new jobs before everyone else. Dawarly aggregates jobs from LinkedIn, Indeed, Bayt and more into one dashboard.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/auth?tab=signup`,
      },
      "query-input": "required name=signup",
    },
  }

  const jsonLd = [organization, webApplication, website]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
