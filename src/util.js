import axios from 'axios';
import * as cheerio from 'cheerio';

export const BASE_URL = 'https://lospec.com';

export async function fetchPage(url) {
    const res = await axios.get(url).catch((err) => {
        throw new Error(`Error while fetching the page: ${err.message}`);
    });

    return cheerio.load(res.data);
}