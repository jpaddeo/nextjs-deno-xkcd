import Link from 'next/link';

import Comic from './Comic';

const LatestComics = ({ latestComics }) => {
  return (
    <>
      <h2 className='text-3xl font-bold text-center mb-10'>Latest Comics</h2>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {latestComics.map((comic) => {
          return (
            <article key={comic.id}>
              <Link href={`/comic/${comic.id}`}>
                <a href={comic.link}>
                  <Comic {...comic} />
                </a>
              </Link>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default LatestComics;
