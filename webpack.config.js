"use strict";

const path = require("path");
const chalk = require("chalk");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

const LICENSES = [
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "MIT"
];
const LICENSE_OPTS = `(${LICENSES.join(" OR ")}`;
console.log(chalk`
{cyan ## Configured Licenses:}
${LICENSES.map((lic) =>
  chalk`- ${lic}: {gray https://spdx.org/licenses/${lic}.html}`).join("\n")}
`);

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

      // TODO: Common license config.
      // TODO: consider emitError: true
    }),
    new LicenseCheckerWebpackPlugin({
      outputFilename: `app-${app}-notices.json`,
      outputWriter: (data) => {
        // Display complete license list to console.
        const used = {};
        data.dependencies.forEach(({ licenseName }) => {
          used[licenseName] = used[licenseName] || {
            count: 0,
            url: `https://spdx.org/licenses/${licenseName}.html`
          };

          used[licenseName].count++;
        });
        console.log(chalk`{cyan ## Licenses}: {green ${app}}\n${JSON.stringify(used, null, 2)}\n`);

        // Format output.
        return JSON.stringify(data, null, 2)
      }
    })
  ]
}));