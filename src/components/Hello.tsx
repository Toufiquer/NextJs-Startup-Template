import { getTranslations } from 'next-intl/server';

const Hello = async () => {
  const t = await getTranslations('Dashboard');
  // const user = await currentUser();
  const user = {
    email: 'jahid.haque@yahoo.com',
  };

  return <p>👋 {t('hello_message', { email: user?.email })}</p>;
};

export { Hello };
