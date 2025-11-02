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
```javascript
import LospecScraper from 'lospec-scraper';

const palettePageRes = await LospecScraper.palettePageScrape(url);
const galleryPageRes = await LospecScraper.galleryPageScrape(url);
const userPageRes = await LospecScraper.userPageScrape(url);
const dailiesRes = await LospecScraper.dailiesPageScrape();

const scrapeFilter = {
  colorNumberFilterType: 'any'
  colorNumber: '8'
  page: '0'
  tag: ''
  sortingType: 'downloads'
}
const paletteSearchRes = await LospecScraper.paletteSearchScrape(scrapeFilter);

const galleryFilter = {
    page: '0',
    medium: 'all',
    category: 'all',
    sorting: 'latest',
    time: 'all',
    artist: '',
    likedBy: '',
    tags: '',
    masterpiece: false
}
const gallerySearchRes = await LospecScraper.gallerySearchScrape(galleryFilter);
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
