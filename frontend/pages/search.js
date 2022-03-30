import Head from 'next/head';

import Layout from '../components/Layout';

import { search } from '../services/search.js';

const SearchPage = ({ query, results }) => {
  return (
    <>
      <Head>
        <meta
          name='description'
          content={`Searching comic with query ${query}`}
        />
        <title>xkcd 2.0 - search</title>
      </Head>
      <Layout>
        <h1>
          {results.length} founded by searching comic with query {query}
        </h1>
      </Layout>
    </>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;

  // NOTE: mala práctica en getServerSideProps invocar servicio del propio proyecto (/api).
  // en tal caso usar o re-utilizar la lógica del servicio definido en el archivo /api y usarlo acá.

  const { results } = await search(q);
  return {
    props: {
      query: q,
      results,
    },
  };
}
