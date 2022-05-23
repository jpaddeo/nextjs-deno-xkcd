import fs from 'fs-extra';
import axios from 'axios';
import fg from 'fast-glob';

import { log, logerror, time } from './log.js';

const { removeSync, readJSONSync, writeJSONSync } = fs;

const COMICS_FRONTEND_FOLDER_PATH = '../frontend/comics';
const endTime = time();

const comicsFiles = fg.sync([
  `${COMICS_FRONTEND_FOLDER_PATH}/*.json`,
  '!index.json',
]);
const indexFileContent = [];
comicsFiles.forEach((file) => {
  if (file.includes('index.json')) return;
  log(`Processing ${file}...`);
  const comic = readJSONSync(`${file}`);
  indexFileContent.push(comic);
});
if (indexFileContent.length > 0) {
  log(`Removing index.json...`);
  removeSync(`${COMICS_FRONTEND_FOLDER_PATH}/index.json`);
  log(`Writing index.json...`);
  writeJSONSync(`${COMICS_FRONTEND_FOLDER_PATH}/index.json`, indexFileContent);
  log(`Wrote index.json...`);
}

endTime();
