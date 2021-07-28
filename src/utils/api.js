import { $post } from './https.js';

let nowEnviroment = process.env.NODE_ENV;
let api;
api = nowEnviroment == "development" ? "/WXApi" : "http://tm.lilanz.com/oa/api/BrandNewsCore.ashx"

export function getWxInfo(data) {
    return $post(api, data);
}