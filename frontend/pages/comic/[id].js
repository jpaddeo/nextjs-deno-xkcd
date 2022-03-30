import Head from 'next/head';
import Link from 'next/link';

import fs from 'fs/promises';

import Layout from '../../components/Layout';
import Comic from '../../components/Comic';

const ComicPage = ({
  id,
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  previousId,
  hasNext,
  nextId,
}) => {
  return (
    <div className='flex flex-col bg-gray-500 h-max items-center'>
      <Head>
        <title>Comic {title}</title>
        <meta name='description' content={alt} />
      </Head>
      <Layout>
        <Comic title={title} alt={alt} img={img} hover={false} />
        <div className='btn-group flex items-center justify-around mt-4'>
          {hasPrevious && (
            <Link href={`/comic/${previousId}`}>
              <a href={`/comic/${previousId}`}>
                <button className='btn btn-outline'>Previous</button>
              </a>
            </Link>
          )}
          {hasNext && (
            <Link href={`/comic/${nextId}`}>
              <a href={`/comic/${previousId}`}>
                <button className='btn btn-outline'>Next</button>
              </a>
            </Link>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ComicPage;

export async function getStaticPaths() {
  const files = await fs.readdir('./comics');
  const paths = files.map((file) => {
    return { params: { id: file.split('.')[0] } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await fs.readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  const idNumber = +id;
  const previousId = idNumber - 1;
  const nextId = idNumber + 1;

  const [previousResult, nextResult] = await Promise.allSettled([
    fs.stat(`./comics/${previousId}.json`),
    fs.stat(`./comics/${nextId}.json`),
  ]);
  const hasPrevious = previousResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      previousId,
      nextId,
    },
  };
}
