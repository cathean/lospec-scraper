import axios from 'axios';
import * as cheerio from 'cheerio';

export const BASE_URL = 'https://lospec.com';

export async function getRequest(url, config={}) {
    const res = await axios.get(url, config).catch((err) => {
        throw new Error(`Request failed: ${err.message}`);
    });
    
    return res;
} 

export async function fetchPage(url) {
    const res = await getRequest(url);
    return cheerio.load(res.data);
}