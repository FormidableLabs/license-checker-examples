"use strict";

const path = require("path");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

let APPS = [
  "apollo",
  "urql"
];

if (process.env.APP_ALL === "true") {
  APPS.push("unapproved");
} else if (process.env.APP_UNAPPROVED === "true") {
  APPS = ["unapproved"];
}

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