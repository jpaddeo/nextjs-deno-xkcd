import fs from 'fs-extra';
import axios from 'axios';

import { log, logerror, time } from './log.js';
import { getImageSize } from './images.js';
import { getMostRecentFile } from './files.js';

const COMICS_FOLDER_PATH = './comics';
const COMICS_FRONTEND_FOLDER_PATH = '../frontend/comics';
const XKCD_LATEST_COMIC_ID = Number(
  getMostRecentFile(COMICS_FRONTEND_FOLDER_PATH).replace('.json', '')
);
const XKCD_COMIC_INITIAL_ID = XKCD_LATEST_COMIC_ID + 1;
const XKCD_COMIC_MAX_ID = XKCD_COMIC_INITIAL_ID + 1;

const endTime = time();
const { writeJSON, copySync } = fs;

log(`Empty files from folder ${COMICS_FOLDER_PATH}...`);
fs.emptyDirSync(COMICS_FOLDER_PATH);

for (let id = XKCD_COMIC_INITIAL_ID; id < XKCD_COMIC_MAX_ID; id++) {
  const URL = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching comic#${id} url ${URL}...`);
  try {
    const { data } = await axios.get(URL);
    const { num, transcript, img, ...restOfComic } = data;
    const { height, width } = await getImageSize(img);
    log(`Got image dimensions #${num} (${height}x${width})...`);
    const comicToStore = { id, img, height, width, ...restOfComic };
    log(`Fetched comic#${num}...`);
    await writeJSON(`${COMICS_FOLDER_PATH}/${id}.json`, comicToStore);
    log(`Wrote #${num}.json...`);
  } catch (error) {
    logerror(`Error: ${error.message}`);
    break;
  }
}

log(`Copying comics to frontend...`);
await copySync(COMICS_FOLDER_PATH, COMICS_FRONTEND_FOLDER_PATH, {
  overwrite: true,
});
log(`Comics copied ok...`);

endTime();
