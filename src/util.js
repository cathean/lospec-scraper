import axios from 'axios';

export const BASE_URL = 'https://lospec.com';

export async function postRequest(url, form) {
    const res = await axios.post(url, form).catch((err) => {
        throw new Error(`Request failed: ${err.message}`);
    });

    return res;
}

export async function getRequest(url, form) {
    const res = await axios.get(url, form).catch((err) => {
        throw new Error(`Request failed: ${err.message}`);
    });
    
    return res;
}

export function isNotEmpty(str) {
  return typeof str === "string" && str.trim().length > 0;
}

export function stringToResolution(str) {
    str = str.replace(/[^0-9]+$/, "");
    str = str.replace(/(\s+)/g, "x");
    return str;
}