import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';

import en from '../i18n/en.json';
import es from '../i18n/es.json';

const LANGUAGES = { en, es };

const I18NContext = createContext();

export const I18NProvider = ({ children }) => {
  const { locale } = useRouter();

  const _T = useCallback(
    (key, ...args) => {
      const translation = LANGUAGES[locale][key];
      if (args.length === 0) return translation;
      args.forEach((arg, index) => {
        translation = translation.replace(`\${${index}}`, arg);
      });
      return translation;
    },
    [locale]
  );

  return <I18NContext.Provider value={{ _T }}>{children}</I18NContext.Provider>;
};

export const useI18N = () => {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NProvider');
  }
  return context;
};
