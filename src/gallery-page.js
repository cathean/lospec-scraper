import * as util from './util.js';
import * as cheerio from 'cheerio';

let galleryUrl;
let $;

export default async function galleryPageScrape(url) {
    galleryUrl = url;
    const reqRes = await util.getRequest(galleryUrl, {})
    $ = cheerio.load(reqRes.data);

    const res = {
        url: galleryUrl,
        name: getName(),
        date: getDate(),
        isMasterpiece: isMasterpiece(),
        medium: getMedium(),
        category: getCategory(),
        imageUrl: getImageUrl(),
        tags: getTags(),
        specs: getSpecs(),
        likes: getLikes(),
        artist: getArtist(),
        comments: getComments()
    }

    return res;
}


function getName() {
    return $('header h1').clone().find('span').remove().end().text().trim();
}

function getDate() {
    return $('header date').text().trim();
}

function isMasterpiece() {
    if ($('header h1').find('span').length)
        return true;
    else
        return false;
}

function getMedium() {
    return $('category a').eq(0).text().trim();
}

function getCategory() {
    return $('category a').eq(1).text().trim();
}

function getImageUrl() {
    return $('display img').attr('src');
}

function getTags() {
    let tags = [];
    $('tags a.text-link').each((i, el) => {
        const name = $(el).text().trim();
        const url = util.BASE_URL + $(el).attr('href');

        tags.push({
            name: name,
            url: url
        })
    })

    return tags;
}

function getSpecs() {
    let resolution = $('info wrapper specs spec').clone().find('svg').remove().end().text().trim();
    resolution = util.stringToResolution(resolution);

    const totalColors = $('detail specs spec.flex').contents().filter((i, el) => el.type === 'text').text().trim();

    let hexcode = []
    $('detail specs spec.flex palette color').each((i, el) => {
        const code = $(el).attr('data-tooltip');
        hexcode.push(code);
    })

    return {
        resolution: resolution,
        colors: {
            total: totalColors,
            hexcode: hexcode
        }
    }
}

function getLikes() {
    return $('.counter.show-likes-list .current').text().trim();
}

function getArtist() {
    const username = $('artist profile info name').text().trim();
    const handle = $('artist profile info slug').text().trim();
    const avatarUrl = $('artist profile img').attr('src');
    const profileUrl = util.BASE_URL + $('artist profile a').attr('href');
    const bio = $('artist bio').text().trim().replace(/[ \n]+/g, ' ');
    
    let links = []
    $('artist p.links a').each((i, el) => {
        const name = $(el).attr('class').split(' ')[1];
        const url = $(el).attr('href');
        
        links.push({
            name: name,
            url: url
        })
    })

    return {
        username: username,
        handle: handle,
        avatarUrl: avatarUrl,
        profileUrl: profileUrl,
        bio: bio,
        links: links
    }
}

function getComments() {
    let total = 0;
    let list = [];
    $('.comment-list article.comment-container').each((i, el) => {
        const name = $(el).find('.comment-data .user-link').text().trim();
        const avatarUrl = $(el).find('img.avatar').attr('src');
        const profileUrl = util.BASE_URL + $(el).find('.comment-data .user-link').attr('href');
        const date = $(el).find('.comment-data .permalink').text().trim();
        const comment = $(el).find('.comment-data .comment-html').text().trim();
        const isReply = $(el).hasClass('child-comment');
        total += 1;

        list.push({
            name: name,
            avatarUrl: avatarUrl,
            profileUrl: profileUrl,
            date: date,
            comment: comment,
            isReply: isReply
        });
    });

    return {
        total: total,
        list: list
    };
}