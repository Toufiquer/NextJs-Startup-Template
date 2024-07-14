/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/


import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import { getIronSession } from "iron-session";

import { sessionOptions } from "@/libs/session";

export default async function Welcome() {
  const session = await getIronSession(cookies(), sessionOptions);
  if (Object.keys(session).length === 0) {
  redirect('/sign-in')
  }

  return (
    <div className={"flex flex-col"}>
      <p>Menu page</p>
    </div>
  );
}
