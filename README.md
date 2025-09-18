# lospec-scraper
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
- [ ] Gallery page scraper
- [ ] User page scraper
- [ ] Palette search scraper
- [ ] Gallery search scraper
