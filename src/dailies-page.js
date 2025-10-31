import * as util from './util.js';
import * as cheerio from 'cheerio';

const dailiesUrl = 'https://lospec.com/dailies/';
let $;

export default async function dailiesPageScrape() {
    const reqRes = await util.getRequest(dailiesUrl, {});
    $ = cheerio.load(reqRes.data);

    const res = {
        tagOfTheDay: getTagOfTheDay(),
        paletteOfTheDay: getPaletteOfTheDay(),
        userOfTheDay: getUserOfTheDay()
    }

    return res;
}

function getTagOfTheDay() {
    const name = $('.daily.tag').text().trim();
    let links = []
    $('section.wrapper p').eq(2).find('a').each((i, el) => {
        const name = $(el).text().trim();
        const url = $(el).attr('href');

        links.push({
            name: name,
            url: url
        })
    })

    return {
        name: name,
        links: links
    }
}

function getPaletteOfTheDay() {
    const name = $('.daily.palette a').eq(0).text().trim();
    const url = util.BASE_URL + $('.daily.palette a').attr('href');
    const likes = $('.daily.palette').contents().filter((i, el) => el.type === 'text')[2].data.trim();
    const totalComments = $('.daily.palette').contents().filter((i, el) => el.type === 'text')[3].data.trim();
    const totalDownloads = $('.daily.palette').contents().filter((i, el) => el.type === 'text')[4].data.trim();
    
    let downloads = [];
    $('.daily.palette p a').each((i, el) => {
        const name = $(el).text().trim();
        let url = util.BASE_URL + $(el).attr('href');
        if (url.includes('lospec-palette://'))
            return true;    // Skip
        url = util.BASE_URL + url;

        downloads.push({
            name: name,
            url: url
        })
    })

    return {
        name: name,
        url: url,
        likes: likes,
        totalComments: totalComments,
        totalDownloads: totalDownloads,
        downloads: downloads
    }
}

function getUserOfTheDay() {
    const name = $('.daily.user a').text().trim();
    const avatarUrl = $('.daily.user img').attr('src');
    const profileUrl = util.BASE_URL + $('.daily.user a').attr('href');

    return {
        name: name,
        avatarUrl: avatarUrl,
        profileUrl: profileUrl
    }
}