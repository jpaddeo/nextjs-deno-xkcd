import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const { locale, locales } = useRouter();

  // TODO: make selector
  return <div>LanguageSelector</div>;
};

export default LanguageSelector;
