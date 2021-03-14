const { i18n } = require("./next-i18next.config");

module.exports = {
  trailingSlash: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": __dirname,
    };
    return config;
  },
  target: "experimental-serverless-trace",
  i18n,
};
