/**
 * App with unapproved licenses.
 */

// https://libraries.io/search?licenses=&platforms=NPM
// GPL-3.0
import fullpage from "fullpage.js";
// This _should_ be OK: `(MIT OR GPL-3.0+)`
// https://www.npmjs.com/package/scrollmagic
import scrollmagic from "scrollmagic";
// WTFPL
import leftPad from "left-pad";

console.log({
  fullpage,
  scrollmagic,
  leftPad
});
