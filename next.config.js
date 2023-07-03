const { withContentlayer } = require("next-contentlayer")

const nextConfig = {
  reactStrictMode: false,
}

module.exports = withContentlayer(nextConfig)
