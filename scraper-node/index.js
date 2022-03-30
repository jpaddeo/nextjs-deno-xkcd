import fs from 'fs-extra';
import axios from 'axios';

import { log, time } from './log.js';
import { getImageSize } from './images.js';

const XKCD_COMIC_INITIAL_ID = 2500;
const XKCD_COMIC_MAX_ID = 2550;
const COMICS_FOLDER_PATH = './comics';

const indexFileContent = [];
const endTime = time();
const { writeJSON } = fs;

for (let id = XKCD_COMIC_INITIAL_ID; id < XKCD_COMIC_MAX_ID; id++) {
  const URL = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching comic#${id} url ${URL}...`);
  const { data } = await axios.get(URL);
  const { num, transcript, img, ...restOfComic } = data;
  const { height, width } = await getImageSize(img);
  log(`Got image dimensions #${num} (${height}x${width})...`);
  const comicToStore = { id, img, height, width, ...restOfComic };
  indexFileContent.push(comicToStore);
  log(`Fetched comic#${num}...`);
  await writeJSON(`${COMICS_FOLDER_PATH}/${id}.json`, comicToStore);
  log(`Wrote #${num}.json...`);
}
await writeJSON(`${COMICS_FOLDER_PATH}/index.json`, indexFileContent);
log(`Wrote index.json...`);

endTime();
