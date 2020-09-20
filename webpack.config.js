"use strict";

const path = require("path");
const chalk = require("chalk");
const LicenseCheckerWebpackPlugin = require("license-checker-webpack-plugin");

// ----------------------------------------------------------------------------
// License Configuration
// ----------------------------------------------------------------------------
// Create straight list of allowed licenses for ease of review.
const ALLOWED_LICENSES = [
  "0BSD",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "MIT"
];
// Convert to plugin options.
// See: https://github.com/microsoft/license-checker-webpack-plugin#options
const LICENSE_CHECKER_OPTS = {
  // Base license permissions.
  allow: `(${ALLOWED_LICENSES.join(" OR ")})`,
  // Manually reviewed libraries to ignore (include comment of reason).
  ignore: [],
  // Manually reviewed libraries to override an SPDX license declaration (include comment of reason).
  override: {}
};

// Create report of configuration.
console.log(chalk`
{cyan ## Configured Licenses}
${ALLOWED_LICENSES.map((lic) =>
  chalk`- \`${lic}\`: {gray https://spdx.org/licenses/${lic}.html}`).join("\n")}
`);

// ----------------------------------------------------------------------------
// Example Configuration
// ----------------------------------------------------------------------------
// App-specific example setup..
let APPS = [
  "apollo",
  "urql"
];
let FAIL_ON_UNAPPROVED = false;

if (process.env.APP_ALL === "true") {
  APPS.push("unapproved");
  FAIL_ON_UNAPPROVED = true;
} else if (process.env.APP_UNAPPROVED === "true") {
  APPS = ["unapproved"];
}

// ----------------------------------------------------------------------------
// Webpack Configuration
// ----------------------------------------------------------------------------
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
      ...LICENSE_CHECKER_OPTS,
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
    }),
    new LicenseCheckerWebpackPlugin({
      ...LICENSE_CHECKER_OPTS,
      outputFilename: `app-${app}-notices.txt`,
      emitError: FAIL_ON_UNAPPROVED
    })
  ]
}));