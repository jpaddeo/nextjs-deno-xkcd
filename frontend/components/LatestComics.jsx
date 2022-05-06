import Image from 'next/image';
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
      {/*
      <section className='overflow-hidden text-gray-700'>
        <div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
          <div className='flex flex-wrap -m-1 md:-m-2 gap-1'>
            {latestComics.map((comic) => (
              <Link href={`/comic/${comic.id}`}>
                <a href={comic.link}>
                  <div key={comic.id} className='flex flex-wrap w-1/3 bg-white'>
                    <div className='w-full p-2 md:p-4'>
                      <Image
                        layout='intrinsic'
                        objectFit='contain'
                        width={comic.width}
                        height={comic.height}
                        src={comic.img}
                        alt={comic.alt}
                      />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
      */}
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
