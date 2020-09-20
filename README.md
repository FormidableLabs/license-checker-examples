License Checker Examples
========================

Frontend build examples with license checking.

## Getting started

Install deps and build the passing applications.

```sh
$ yarn
$ yarn build
```

Try an app with unapproved licenses to see failures:

```sh
$ yarn build-unapproved
```

## Examples

- `src/app-apollo.js`: Apollo-based app.
- `src/app-urql.js`: URQL-based app.
- `src/app-unapproved.js`: App with unapproved licenses. See application source for the various non-complying licensese as well as some complex-but-allowed libraries.

## Configuration

Here is our current license list from: https://spdx.org/licenses/

- `0BSD`: https://spdx.org/licenses/0BSD.html
- `Apache-2.0`: https://spdx.org/licenses/Apache-2.0.html
- `BSD-2-Clause`: https://spdx.org/licenses/BSD-2-Clause.html
- `BSD-3-Clause`: https://spdx.org/licenses/BSD-3-Clause.html
- `MIT`: https://spdx.org/licenses/MIT.html

## Outputs

Outputs are of the form:

```
dist/
  app-[NAME].js
  app-[NAME]-notices.txt
  app-[NAME]-notices.json
```

where `app-[NAME]-notices.txt` contains license information for all included dependencies for that particular app in text form suitable for a notice document. `app-[NAME]-notices.json` is a JSON dump of all the license data for possible programmatic use elsewhere.
