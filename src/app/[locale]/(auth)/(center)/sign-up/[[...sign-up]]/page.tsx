/*
|-----------------------------------------
| setting up sign up page
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: daauk, 2024
|-----------------------------------------
*/
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function SignUp() {
  return (
    <span>sign up</span>
  )
}
