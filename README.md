# lospec-scraper
[![npm version](https://img.shields.io/npm/v/lospec-scraper.svg)](https://www.npmjs.com/package/lospec-scraper)
[![npm downloads](https://img.shields.io/npm/dm/lospec-scraper.svg)](https://www.npmjs.com/package/lospec-scraper)
[![npm bundle size](https://img.shields.io/bundlephobia/min/lospec-scraper)](https://bundlephobia.com/package/lospec-scraper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Node.js module to scrape data from lospec (low-spec & pixel art gallery) website.

## Installation
```bash
npm install lospec-scraper
```
## Usage
###  Scrape palette page
```javascript
import LospecScraper from 'lospec-scraper';

const url = ''
const palettePageRes = await LospecScraper.palettePageScrape(url)
console.log(palettePageRes);
```
## API Reference
### palettePageScrape(url)
Retrieves data from palette page.
- ``url`` : The palette page link.
## Todo
- [x] Palette page scraper
- [x] Gallery page scraper
- [x] Dailier page scraper
- [ ] User page scraper
- [ ] Palette search scraper
- [ ] Gallery search scraper
