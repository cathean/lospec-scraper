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

export function isNotEmpty(str) {
  return typeof str === "string" && str.trim().length > 0;
}

export function stringToResolution(str) {
    str = str.replace(/[^0-9]+$/, "");
    str = str.replace(/(\s+)/g, "x");
    return str;
}