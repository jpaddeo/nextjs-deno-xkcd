import '../styles/globals.css';

import { I18NProvider } from '../contexts/i18n';

function XKCDApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <Component {...pageProps} />
    </I18NProvider>
  );
}

export default XKCDApp;
