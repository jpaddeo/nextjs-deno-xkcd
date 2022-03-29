import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='max-w-4xl m-auto'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
