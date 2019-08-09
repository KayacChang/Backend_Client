import axios from 'axios';

const MEDIA_TYPE = {
  TEXT: 'text/plain',
  JSON: 'application/json'
};

const UTF8 = 'charset=utf-8';

const proxy = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': MEDIA_TYPE.JSON + '; ' + UTF8
  },
  timeout: 10000
});

export async function get(url) {
  const { data } = await proxy.get(url);

  return data;
}

export async function post(url, payload) {
  const { data } = await proxy.post(url, payload);

  return data;
}
