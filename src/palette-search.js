import * as util from './util.js';

/*
Filters form
---
    colorNumberFilterType
    colorNumber
    page
    tag
    sortingType
*/ 

const paletteSearchUrl = 'https://lospec.com/palette-list/load';

export default async function paletteSearchScrape(filter) {
    const reqRes = await util.getRequest(paletteSearchUrl, {params: filter});
    return reqRes.data;
}