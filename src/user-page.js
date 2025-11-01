import * as cheerio from 'cheerio';
import FormData from 'form-data';
import * as util from './util.js';
import gallerySearchScrape from './gallery-search.js';

let userUrl = '';

export default async function userPageScrape(url) {
    userUrl = url;
    const reqRes = await util.getRequest(userUrl)
    const $ = cheerio.load(reqRes.data);

    const name = $('.name-line h1').text().trim();
    const handle = $('.name-line h2').text().trim();
    const avatarUrl = $('.profile-header img').attr('src');
    const online = $('.last-seen.weak>div').attr('class');
    const lastSeen = $('.last-seen.weak').text().trim();
    const bio = $('.profile-header p').first().text().trim();
    let links = []
    $('.profile-header div .links a').each((i, el) => {
        const linkName = $(el).text().trim();
        const linkUrl = $(el).attr('href');

        links.push({
            name: linkName,
            url: linkUrl
        })
    })

    const filter = {
        page: '0',
        medium: 'all',
        category: 'all',
        sorting: 'latest',
        time: 'all',
        artist: handle.slice(1),
        likedBy: '',
        tags: '',
        masterpiece: false
    }

    const { gallery } = await gallerySearchScrape(filter);

    const res = {
        name: name,
        handle: handle,
        avatarUrl: avatarUrl,
        online: online,
        lastSeen: lastSeen,
        bio: bio,
        links: links,
        gallery
    }

    return res;
}