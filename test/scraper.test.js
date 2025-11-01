import { describe, it } from "node:test";
import assert from "node:assert";
import FormData from 'form-data';
import dailiesPageScrape from "../src/dailies-page.js";
import palettePageScrape from "../src/palette-page.js";
import galleryPageScrape from "../src/gallery-page.js";
import gallerySearchScrape from "../src/gallery-search.js";
import paletteSearchScrape from "../src/palette-search.js";
import userPageScrape from "../src/user-page.js";

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

it('Scrape gallery search page'), async () => {
    const filter = new FormData();
    filter.append('page', '0');
    filter.append('medium', 'all');
    filter.append('category', 'all');
    filter.append('sorting', 'latest');
    filter.append('time', 'all');
    filter.append('artist', '');
    filter.append('liked-by', '');
    filter.append('tags', '');
    filter.append('masterpiece', 'false');

    const res = await gallerySearchScrape();
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
}

it('Scrape pallete search page'), async () => {
    const filter = {
        colorNumberFilterType: 'any',
        colorNumber: '8',
        page: 1,
        tag: '',
        sortingType: 'downloads'
    }

    const res = await paletteSearchScrape(filter);
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
}

it('Scrape user page'), async () => {
    const url = 'https://lospec.com/2bitdream'
    const res = await userPageScrape(filter);
    assert.equal(typeof res, 'object');
    assert.notEqual(res, null);
}