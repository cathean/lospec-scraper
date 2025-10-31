import * as util from './util.js';
import * as cheerio from 'cheerio';

let paletteURL;
let $;
let paletteJSON;

export default async function palettePageScrape(url) {
    paletteURL = url;
    const reqRes = await util.getRequest(paletteURL, {})
    $ = cheerio.load(reqRes.data);
    paletteJSON = await getPaletteJSON(url);
    const comments = getComments();

    const result = {
        url,
        paletteName: getPaletteName(),
        authorName: getAuthorName(),
        authorUrl: getAuthorUrl(),
        paletteDesc: getPaletteDesc(),
        hashtags: getHashtags(),
        totalLikes: getTotalLikes(),
        numberOfColors: getNumberOfColors(),
        totalDownloads: getTotalDownloads(),
        tags: getTags(),
        paletteColors: getPaletteColors(),
        examples: getExamples(),
        totalComments: comments.totalComments,
        commentsList: comments.commentsList,
        downloads: getDownloads()
    };

    return result;
}

export async function getRandomPalettePageURL() {
    const paletteRandomURL = 'https://lospec.com/palette-list/random';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await util.getRequest(paletteRandomURL, config);

    return util.BASE_URL + res.request.path;
}

export async function getPaletteJSON(url) {
    url = url + '.json';
    const res = await util.getRequest(url);
    return res.data;
}

export async function getPaletteCSV(url) {
    url = url + '.csv';
    const res = await util.getRequest(url);
    return res.data; 
}

function getPaletteName() {
    return paletteJSON.name;
}

function getAuthorName() {
    return paletteJSON.author;
}

function getAuthorUrl() {
    if (util.isNotEmpty(paletteJSON.author))
        return util.BASE_URL + $('p.attribution a').attr('href');
    else
        return '';
}

function getPaletteDesc() {
    return $('.management-bar')[0].next?.data?.trim();
}

function getHashtags() {
    let hashtags = [];
    $('p > span.weak a').each((i, el) => {
        const socialName = $(el).text().trim();
        const socialUrl = $(el).attr('href');
        hashtags.push({
            socialName,
            socialUrl
        });
    });

    return hashtags;
}

function getTotalLikes() {
    return $('a.show-likes-list > .number > .current').text().trim();
}

function getNumberOfColors() {
    let numberOfColors = '';
    $('.palette-info').each((i, el) => {
        const textDesc = $(el).find('strong').text().trim();
        if (textDesc === 'Number of colors:')
            numberOfColors = $(el).clone().find('strong').remove().end().text().trim()

    });
    return numberOfColors;
}

function getTotalDownloads() {
    let totalDownloads = '';
    $('.palette-info').each((i, el) => {
        const textDesc = $(el).find('strong').text().trim();
        if (textDesc === 'Downloads:')
            totalDownloads = $(el).find('.download-count').text().trim();
    });
    return totalDownloads;
}

function getTags() {
    let tags = []
    $('.palette-info').each((i, el) => {
        const textDesc = $(el).find('strong').text().trim();
        if (textDesc === 'Tags:')
        {
            $(el).find('a').each((i, el) => {
                const tagName = $(el).text().trim();
                const tagUrl = util.BASE_URL + $(el).attr('href');
                tags.push({
                    tagName,
                    tagUrl
                })
            })
        }
    });
    return tags;
}

function getPaletteColors() {
    let paletteColors = []
    $('.palette .color').each((i, el) => {
        const hexcode = $(el).text().trim()
        if (hexcode)
            paletteColors.push(hexcode);
    });
    return paletteColors;
}

function getExamples() {
    let examples = []
    $('ul.examples li').each((i, el) => {
        const imgUrl = $(el).find('img').attr('src');
        const imgAlt = $(el).find('img').attr('alt');
        const description = $(el).find('.example-description p').text().trim();
        let authorName = $(el).find('.user-link').text().trim();
        let authorUrl = util.BASE_URL + $(el).find('.user-link').attr('href');

        if (util.isNotEmpty(authorName))
            authorUrl = util.BASE_URL + authorUrl;
        else
            authorUrl = '';

        examples.push({
            imgUrl,
            imgAlt,
            description,
            authorName,
            authorUrl
        });
    });
    return examples;
}

function getComments() {
    let totalComments = 0;
    let commentsList = [];
    $('.comment-container').each((i, el) => {
        const userName = $(el).find('.user-link').text().trim();
        const userLink = util.BASE_URL + $(el).find('.user-link').attr('href');
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
    });
    return {
        totalComments,
        commentsList
    }
    
}

function getDownloads() {
    let downloads = []
    $('ul#download-menu li').each((i, el) => {
        let url = $(el).find('.download-link').attr('href');
        if (url.includes('lospec-palette://'))
            return true;    // Skip

        const name = $(el).find('.download-link').clone().find('svg').remove().end().text().trim();
        url = util.BASE_URL + url;

        downloads.push({
            name,
            url
        })
    })
    return downloads;
}