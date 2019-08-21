import axios from 'axios';

import { mergeDeepRight } from 'ramda';

const MEDIA_TYPE = {
  TEXT: 'text/plain',
  JSON: 'application/json'
};

const UTF8 = 'charset=utf-8';

const config = {
  baseURL: process.env.REACT_APP_CMS_URL,
  headers: {
    'Content-Type': MEDIA_TYPE.JSON + '; ' + UTF8
  }
};

export async function get(uri, options = {}) {

  return axios
    .create(mergeDeepRight(config, options))
    .get(uri);
}

export async function post(uri, payload, options = {}) {

  return axios
    .create(mergeDeepRight(config, options))
    .post(uri, payload);
}
