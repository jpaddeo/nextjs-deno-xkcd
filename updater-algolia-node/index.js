require('dotenv').config();
const algoliasearch = require('algoliasearch');
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');

const logHelper = require('./log.js');

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_APP_KEY
);

const comicsIndex = algoliaClient.initIndex('comics');

const endTime = logHelper.time();

const COMICS_FRONTEND_FOLDER_PATH = '../frontend/comics';

logHelper.log(`Reading ${COMICS_FRONTEND_FOLDER_PATH}/index.json...`);
const objectsJSON = fs.readFileSync(
  `${COMICS_FRONTEND_FOLDER_PATH}/index.json`
);
const objects = JSON.parse(objectsJSON);
logHelper.log(`Sending ${objects.length} to algolia...`);
comicsIndex
  .saveObjects(objects, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .catch(logHelper.logerror);

endTime();
/*
const stream = fs
  .createReadStream(`${COMICS_FRONTEND_FOLDER_PATH}/index.json`)
  .pipe(StreamArray.withParser());

const chunks = [];

stream
  .on('data', ({ value }) => {
    logHelper.log(`Chunking...`);
    chunks.push(value);
    if (chunks.length === 10000) {
      logHelper.log(`Pausing stream...`);
      stream.pause();
      logHelper.log(`Sending chunk to algolia...`);
      comicsIndex
        .saveObjects(chunks, { autoGenerateObjectIDIfNotExist: true })
        .then(() => {
          logHelper.log(`Cleaning chunks...`);
          chunks = [];
          logHelper.log(`Resuming stream...`);
          stream.resume();
        })
        .catch(logHelper.logerror);
    }
  })
  .on('end', () => {
    if (chunks.length) {
      logHelper.log(`Saving index on Algolia...`);
      comicsIndex
        .saveObjects(chunks, {
          autoGenerateObjectIDIfNotExist: true,
        })
        .catch(logHelper.logerror);
    }
    endTime();
  })
  .on('error', (err) => logHelper.logerror(err));
*/
