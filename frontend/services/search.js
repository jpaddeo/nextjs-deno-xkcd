import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('XIY1R5G3P7', '9b079b5cc02119015575aa22b8e9ae67');
const index = client.initIndex('comics');

export const search = async (query) => {
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'url', 'img', 'alt'],
    hitsPerPage: 10,
  });
  return { results: hits };
};
