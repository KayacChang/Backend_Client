import axios from 'axios';

import { mergeDeepRight } from 'ramda';

const MEDIA_TYPE = {
  TEXT: 'text/plain',
  JSON: 'application/json'
};

const UTF8 = 'charset=utf-8';

const config = {
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': MEDIA_TYPE.JSON + '; ' + UTF8
  },
  timeout: 10000
};

export async function get(url, options = {}) {
  return axios
    .create(mergeDeepRight(config, options))
    .get(url);
}

export async function post(url, payload, options = {}) {
  return axios
    .create(mergeDeepRight(config, options))
    .post(url, payload);
}
