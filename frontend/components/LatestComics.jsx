import Link from 'next/link';

import Comic from './Comic';

import { useI18N } from '../contexts/i18n';

const LatestComics = ({ latestComics }) => {
  const { _T } = useI18N();

  return (
    <>
      <h2 className='text-3xl font-bold text-center mb-10'>
        {_T('LATEST_COMICS')}
      </h2>
      <section className='grid grid-cols-1 md:grid-cols-2 divide-x-4 divide-y-4 divide-gray-300'>
        {latestComics.map((comic) => (
          <article key={comic.id}>
            <Link href={`/comic/${comic.id}`}>
              <a href={comic.link}>
                <Comic {...comic} showLinks={false} />
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default LatestComics;
