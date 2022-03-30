import Head from 'next/head';

import fs from 'fs/promises';

import Layout from '../components/Layout';
import LatestComics from '../components/LatestComics';

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='xkcd made with NextJS + Deno + Tailwindcss'
        />
        <title>xkcd 2.0</title>
      </Head>
      <Layout>
        <LatestComics latestComics={latestComics} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const comcisFiles = await fs.readdir('./comics');
  const latesComicsFiles = comcisFiles.slice(-8);

  const promisesReadFiles = latesComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
