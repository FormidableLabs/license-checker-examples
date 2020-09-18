"use strict";

const path = require("path");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    "app-apollo": "./src/app-apollo.js",
    "app-urql": "./src/app-urql.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: false,
  plugins: [
    new LicenseCheckerWebpackPlugin({
      outputFilename: "ThirdPartyNotices.txt"
    })
  ]
};