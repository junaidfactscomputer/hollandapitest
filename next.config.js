//const { i18n } = require("./next-i18next.config");

module.exports = {
  // i18n,
  devIndicators: {},
  serverRuntimeConfig: {
    // Will only be available on the server side
    gatewaySecret: "4Haa9yQtDxu63t92", //OmlyOkOJrbH1UvJk
    paymentSuccessUrl: "http://staging.rupalionline.com/successredirect/1",
    paymentRedirectUrl:
      "https://test.sagepay.com/gateway/service/vspform-register.vsp",
    paymentFailUrl: "http://www.staging.rupalionline.com/api/paymentfailed",
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET, // Pass through env variables
  },

  publicRuntimeConfig: {
    // Available on both server and client
    factsApiUrl: "https://domus.facts.ae/FEAPI/api/",
    theme: "DEFAULT",
    currency: "GBP",
    staticFolder: "/static",
    merchantIdOpayo: "2101791869", //factstest
    sharedSecretOpayo: "OmlyOkOJrbH1UvJk",
    redirectUrlOpayo: "http://localhost:3000/api/payment",
    opayoVendorName: "live",
    opayoIntegrationKey: "hJYxsw7HLbj40cB8udES8CDRFLhuJ8G54O6rDpUXvE6hYDrria",
    opayoIntegrationPassword:
      "o2iHSrFybYMZpmWOQMuhsXP52V4fBtpuSDshrKDSWsBY1OiN6hwd9Kb12z4j5Us5u",
  },
  images: {
    domains: ["p7.1ps.nl"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://185.34.156.243:81/AxerrioServer/:path*",
      },
    ];
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     net: false,
  //     dns: false,
  //     child_process: false,
  //     tls: false,
  //   };

  //   return config;
  // },
};
