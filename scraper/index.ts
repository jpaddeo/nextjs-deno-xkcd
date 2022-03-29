import { copy } from "https://deno.land/std@0.128.0/fs/copy.ts";
import { writeJson } from 'https://deno.land/x/jsonfile/mod.ts';

import axiod from 'https://deno.land/x/axiod/mod.ts';

import { log, time } from './log.ts';

const XKCD_COMIC_INITIAL_ID: number = 2500;
const XKCD_COMIC_MAX_ID: number = 2588;
const COMICS_FOLDER_PATH = './comics';

const indexFileContent = [];
const endTime = time();

for (let id: number = XKCD_COMIC_INITIAL_ID; id < XKCD_COMIC_MAX_ID; id++) {
  const URL = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching comic#${id} url ${URL}...`);
  const { data } = await axiod.get(URL);
  const { num, transcript, ...restOfComic } = data;
  const comicToStore = { id, ...restOfComic };
  indexFileContent.push(comicToStore);
  log(`Fetched comic#${num}...`);
  await writeJson(`${COMICS_FOLDER_PATH}/${id}.json`, comicToStore);
  log(`Wrote #${num}.json...`);
}
await writeJson(`${COMICS_FOLDER_PATH}/index.json`, indexFileContent);
log(`Wrote index.json...`);

log(`Copying comics to frontend...`);
await copy("./comics", "../frontend/comics");
log(`Comics copied ok...`);

endTime();
