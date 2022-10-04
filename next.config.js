// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  })
  const { withBlitz } = require("@blitzjs/next")
  
  /**
   * @type {import('@blitzjs/next').BlitzConfig}
   **/
  const config = {
    reactStrictMode: false,
  }
  
  module.exports = withBlitz(withBundleAnalyzer(config))
  