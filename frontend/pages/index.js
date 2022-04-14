import Head from 'next/head';

import fs from 'fs/promises';

import Layout from '../components/Layout';
import LatestComics from '../components/LatestComics';
import Comic from '../components/Comic';

import { useI18N } from '../contexts/i18n';

export default function Home({ latestComics }) {
  const { _T } = useI18N();

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
        <Comic {...latestComics[0]} hover={false} />
        <div className='divider' />
        <LatestComics latestComics={latestComics.slice(1)} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const comcisFiles = await fs.readdir('./comics');
  const latesComicsFiles = comcisFiles.slice(-8);

  const promisesReadFiles = latesComicsFiles
    .filter((file) => file !== 'index.json')
    .map(async (file) => {
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
