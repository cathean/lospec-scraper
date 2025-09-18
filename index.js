import axios from 'axios';
import * as cheerio from 'cheerio';

const basePageUrl = 'https://lospec.com';

async function fetchPage(url) {
    const res = await axios.get(url).catch((err) => {
        throw new Error(`Error while fetching the page: ${err.message}`);
    });

    return cheerio.load(res.data);
}

const url = 'https://lospec.com/palette-list/lost-in-the-desert';
const $ = await fetchPage(url);
const paletteUrl = url;
const paletteName = $('a.palette-name').text();
const authorName = $('p.attribution a').text();
const authorUrl = basePageUrl + $('p.attribution a').attr('href');
const paletteDesc = $('.management-bar')[0].next?.data?.trim();
let hashtags = [];
$('p > span.weak a').each((i, el) => {
    const socialName = $(el).text().trim();
    const socialUrl = $(el).attr('href');
    hashtags.push({
        socialName,
        socialUrl
    });
})
const totalLikes = $('a.show-likes-list > .number > .current').text().trim();
let numberOfColors = '';
let totalDownloads = '';
let tags = []
$('.palette-info').each((i, el) => {
    const textDesc = $(el).find('strong').text().trim();
    if (textDesc === 'Number of colors:')
        numberOfColors = $(el).text().trim();
    else if (textDesc === 'Downloads:')
        totalDownloads = $(el).find('.download-count').text().trim();
    else if (textDesc === 'Tags:')
    {
        $(el).find('a').each((i, el) => {
            const tagName = $(el).text().trim();
            const tagUrl = basePageUrl + $(el).attr('href');
            tags.push({
                tagName,
                tagUrl
            })
        })
    }
})
let paletteColors = []
$('.palette .color').each((i, el) => {
    const hexcode = $(el).text().trim()
    if (hexcode)
        paletteColors.push(hexcode);
})
let examples = []
$('ul.examples li').each((i, el) => {
    const imgUrl = $(el).find('img').attr('src');
    const imgAlt = $(el).find('img').attr('alt');
    const description = $(el).find('.example-description p').clone().find('a').remove().end().text().trim();
    const authorName = $(el).find('.user-link').text().trim();
    const authorUrl = basePageUrl + $(el).find('.user-link').attr('href');

    examples.push({
        imgUrl,
        imgAlt,
        description,
        authorName,
        authorUrl
    });
})
let totalComments = 0;
let commentsList = [];
$('.comment-container').each((i, el) => {
    const userName = $(el).find('.user-link').text().trim();
    const userLink = basePageUrl + $(el).find('.user-link').attr('href');
    const userAvatarUrl = $(el).find('.avatar').attr('src');
    const date = $(el).find('.permalink').text().trim();
    const comment = $(el).find('.comment-html').text().trim();
    const isReply = $(el).hasClass('child-comment');

    commentsList.push({
        userName,
        userLink,
        userAvatarUrl,
        date,
        comment,
        isReply
    });
    totalComments++;
})

let downloads = []
$('ul#download-menu li').each((i, el) => {
    let url = $(el).find('.download-link').attr('href');
    if (url.includes('lospec-palette://'))
        return true;    // Skip

    const name = $(el).find('.download-link').clone().find('svg').remove().end().text().trim();
    url = basePageUrl + url;
    
    downloads.push({
        name,
        url
    })
})

const result = {
    paletteUrl,
    paletteName,
    authorName,
    authorUrl,
    paletteDesc,
    hashtags,
    totalLikes,
    numberOfColors,
    totalDownloads,
    tags,
    paletteColors,
    examples,
    totalComments,
    commentsList,
    downloads
}

console.log(result);