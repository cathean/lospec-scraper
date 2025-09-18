import * as lpScrape from "./src/index.js";

const res = await lpScrape.palettePageScrape('https://lospec.com/palette-list/vinik24')
console.log(res)