/*
|-----------------------------------------
| setting up sign in page
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: daauk, 2024
|-----------------------------------------
*/

import { Link } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import LoginForm from './login-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function SignIn() {
  return (
    <div className="flex w-full items-center justify-center px-5 py-20 md:px-0">
      <Card className="w-full md:w-4/12 ">
        <CardHeader>
          <CardTitle>Already have an account?</CardTitle>
          <CardDescription>Log in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-3 flex items-center justify-end">
            <span className={'text-sm font-light text-slate-600'}>Don't have any account?{' '}</span>
            <Link
              className="ml-2 text-sm font-medium text-blue-700 underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
