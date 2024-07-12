/*
|-----------------------------------------
| setting up sign-in & sign-up layout
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2024
|-----------------------------------------
*/

import { redirect } from 'next/navigation';

import { getSession } from '@/libs/session';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  // @ts-ignore
  const { user } = session;

  if (user && user.id) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  );
}
