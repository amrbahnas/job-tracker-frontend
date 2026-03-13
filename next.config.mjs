/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  poweredByHeader: false,
}

export default withNextIntl(nextConfig)
