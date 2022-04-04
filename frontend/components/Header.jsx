import { useState, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const getSearchValue = () => searchRef.current?.value;
  
  const handleChangeSearch = () => {
    const q = getSearchValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  };

  return (
    <header className='flex items-center justify-between max-w-4xl mx-auto p-4'>
      <Link href='/'>
        <a>
          <h1 className='text-sm transition hover:opacity-80'>
            nextjs<span className='font-bold'>xkcd</span>
          </h1>
        </a>
      </Link>
      <div>
        <input
          ref={searchRef}
          className='rounded-md border-gray-800 px-2 py-1 border'
          type='text'
          placeholder='Buscar'
          onChange={handleChangeSearch}
        />
        <div className='relative z-10'>
          {results.length > 0 && (
            <div className='absolute top-0 left-0'>
              <ul className='w-full border rounded-lg shadow-xl border-gray-50 bg-white overflow-hidden'>
                <li key='all-results' className='m-0'>
                  <Link href={`/search?q=${getSearchValue()}`}>
                    <a className='block px-2 py-2 text-sm text-black font-semibold hover:bg-slate-500 overflow-hidden text-ellipsis whitespace-nowrap italic'>
                      Ver {results.length} resultados
                    </a>
                  </Link>
                </li>
                {results.map((result) => (
                  <li key={result.id} className='m-0'>
                    <Link href={`/comic/${result.id}`}>
                      <a className='block px-2 py-2 text-sm text-gray-800 font-semibold hover:bg-slate-500 overflow-hidden text-ellipsis whitespace-nowrap'>
                        {result.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
