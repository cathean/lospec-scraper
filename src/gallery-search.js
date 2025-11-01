import * as cheerio from 'cheerio';
import * as util from './util.js';
import FormData from 'form-data';

/*
Filters form
---
    page
    medium
    category
    sorting
    time
    artist
    liked-by
    tags
    masterpiece
*/ 

const gallerySearchUrl = 'https://lospec.com/gallery';
let $;

export default async function gallerySearchScrape(filter) {
    const f = new FormData();
    f.append('page', filter.page);
    f.append('medium', filter.medium);
    f.append('category', filter.category);
    f.append('sorting', filter.sorting);
    f.append('time', filter.time);
    f.append('artist', filter.artist);
    f.append('liked-by', filter.likedBy);
    f.append('tags', filter.tags);
    f.append('masterpiece', filter.masterpiece);

    const reqRes = await util.postRequest(gallerySearchUrl, filter);
    $ = cheerio.load(reqRes.data.html);

    let res = [];

    $('.gallery-thumbnail').each((i, el) => {
        const url = util.BASE_URL + $(el).attr('href');
        const title = $(el).find('.title').text().trim();
        const thumbnailUrl = $(el).find('.thumbnail').attr('src');
        const masterpiece = $(el).find('.monthly-masterpiece').length ? true : false;
        const likes = $(el).find('.engagement').contents().filter((i, el) => el.type === 'text')[0]?.data.trim() || '0';
        const comments = $(el).find('.engagement').contents().filter((i, el) => el.type === 'text')[1]?.data.trim() || '0';
        const medium = $(el).find('.medium').text().trim();

        res.push({
            url: url,
            title: title,
            thumbnailUrl: thumbnailUrl,
            masterpiece: masterpiece,
            likes: likes,
            comments: comments,
            medium: medium
        })
    })

    return {
        gallery: res
    };
}

