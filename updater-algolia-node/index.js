require('dotenv').config();
const algoliasearch = require('algoliasearch');
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_APP_KEY
);

const comicsIndex = algoliaClient.initIndex('comics');

const COMICS_FRONTEND_FOLDER_PATH = '../frontend/comics';

const stream = fs
  .createReadStream(`${COMICS_FRONTEND_FOLDER_PATH}/index.json`)
  .pipe(StreamArray.withParser());

const chunks = [];

stream
  .on('data', ({ value }) => {
    chunks.push(value);
    if (chunks.length === 10000) {
      stream.pause();
      comicsIndex
        .saveObjects(chunks, { autoGenerateObjectIDIfNotExist: true })
        .then(() => {
          chunks = [];
          stream.resume();
        })
        .catch(console.error);
    }
  })
  .on('end', () => {
    if (chunks.length) {
      comicsIndex
        .saveObjects(chunks, {
          autoGenerateObjectIDIfNotExist: true,
        })
        .catch(console.error);
    }
  })
  .on('error', (err) => console.error(err));
