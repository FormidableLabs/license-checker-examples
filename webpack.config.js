"use strict";

const path = require("path");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

const APPS = [
  "apollo",
  "urql",
  "unapproved"
];

// Use array to simulate completely separate builds
module.exports = APPS.map((app) => ({
  mode: "development",
  context: __dirname,
  entry: {
    [`app-${app}`]: `./src/app-${app}.js`,
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: false,
  plugins: [
    new LicenseCheckerWebpackPlugin({
      outputFilename: `app-${app}-notices.txt`
    })
  ]
}));