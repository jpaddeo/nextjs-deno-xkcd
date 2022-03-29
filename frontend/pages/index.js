import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import fs from 'fs/promises';

import Layout from '../components/Layout';

export default function Home({ latestComics }) {
  return (
    <div className='flex flex-col bg-gray-500 h-full items-center'>
      <Head>
        <meta
          name='description'
          content='xkcd made with NextJS + Deno + Tailwindcss'
        />
        <title>xkcd 2.0</title>
      </Head>
      <Layout>
        <h2 className='text-3xl font-bold text-center mb-10'>Latest Comics</h2>
        <section className='flex flex-col items-center justify-center space-y-4'>
          {latestComics.map((comic) => {
            return (
              <article>
                <Link key={comic.id} href={`/comic/${comic.id}`}>
                  <a className='mb-4 pb-4' href={comic.link}>
                    <div class='card w-96 bg-base-100 shadow-xl'>
                      <div class='card-body'>
                        <h2 class='card-title'>{comic.title}</h2>
                        <p>{comic.alt}</p>
                      </div>
                      <figure className='p-2'>
                        <Image
                          width='300'
                          height='300'
                          layout='intrinsic'
                          objectFit='contain'
                          src={comic.img}
                          alt={comic.alt}
                        />
                      </figure>
                    </div>
                  </a>
                </Link>
              </article>
            );
          })}
        </section>
      </Layout>
    </div>
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
