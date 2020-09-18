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

## Outputs

Outputs are of the form:

```
dist/
  app-[NAME].js
  ThirdPartyNotices.txt
```

where `ThirdPartyNotices.txt` contains license information for all included dependencies.
