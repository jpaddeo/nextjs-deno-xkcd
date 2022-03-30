import Link from 'next/link';

const Header = () => {
  return (
    <header className='max-w-4xl mx-auto p-4'>
      <Link href='/'>
        <a>
          <h1 className='text-sm transition hover:opacity-80'>
            nextjs<span className='font-bold'>xkcd</span>
          </h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
