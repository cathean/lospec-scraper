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
| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `palettePageScrape(url)` | `url: string` | `object` | Scrapes a Lospec palette page and returns its data in object. |
## Todo
- [x] Palette page scraper
- [ ] Gallery page scraper
- [ ] User page scraper
- [ ] Palette search scraper
- [ ] Gallery search scraper
