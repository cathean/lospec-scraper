import { describe, it } from "node:test";
import assert from "node:assert";
import dailiesPageScrape from "../src/dailies-page.js";
import palettePageScrape from "../src/palette-page.js";
import galleryPageScrape from "../src/gallery-page.js";

it('Scrape dailies page', async () => {
    const res = await dailiesPageScrape();
   
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
    assert.ok('tagOfTheDay' in res);
    assert.ok('paletteOfTheDay' in res);
    assert.ok('userOfTheDay' in res);
});

it('Scrape palette page'), async () => {
    const url = 'https://lospec.com/palette-list/gb-marzrock'
    const res = await palettePageScrape(url);
   
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
}

it('Scrape gallery page'), async () => {
    const url = 'https://lospec.com/gallery/pranav-inani/001apple';
    const res = await galleryPageScrape(url);
    
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
}

