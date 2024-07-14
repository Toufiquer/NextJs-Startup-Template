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
import { generateLoginToken } from "@/service/auth";

import LoginForm from "./login-form";

export default async function Welcome() {
  const session = await getIronSession(cookies(), sessionOptions);
  const requestToken = generateLoginToken();
 
  if (session && Object.keys(session).length > 0) {
  redirect('/dashboard/menu')
  }

  return (
    <div className={"flex flex-col"}>
      <LoginForm token={requestToken} />
    </div>
  );
}
