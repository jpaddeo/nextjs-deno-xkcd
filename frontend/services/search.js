import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_APP_KEY
);
const index = client.initIndex('comics');

const CACHE = {};

export const search = async (query) => {
  if (CACHE[query]) return CACHE[query];

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'url', 'img', 'alt'],
    hitsPerPage: 10,
  });

  CACHE[query] = { results: hits };

  return { results: hits };
};
