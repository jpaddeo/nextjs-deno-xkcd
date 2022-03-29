import Head from 'next/head';
import Image from 'next/image';

import fs from 'fs/promises';

import Layout from '../../components/Layout';

const ComicPage = ({ id, img, alt, title, width, height }) => {
  return (
    <>
      <Head>
        <title>Comic {title}</title>
        <meta name='description' content={alt} />
      </Head>
      <Layout>
        <h1>{title}</h1>
        <Image width={width} height={height} src={img} alt={alt} />
      </Layout>
    </>
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
  
  return {
    props: {
      ...comic,
    },
  };
}
