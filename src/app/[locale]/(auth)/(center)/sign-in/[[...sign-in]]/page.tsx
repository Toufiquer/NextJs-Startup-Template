/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/
import { redirect } from 'next/navigation'

//local dependency
import { generateLoginToken, getIronSessionData } from "@/service/auth";
import LoginForm from "./login-form";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/libs/session";import { useRouter } from 'next/navigation'

export default async function Welcome() {
  const session = await getIronSession(cookies(), sessionOptions);
  const requestToken = generateLoginToken();
 
 


  console.log("session : ",session)

  console.log("from login page, session : ", session);
  if (session && Object.keys(session).length > 0) {
    // redirect("/dashboard?tkn=124354");
  redirect('/menu')
    
  }

  return (
    <div className={"flex flex-col"}>
      <LoginForm token={requestToken} />
    </div>
  );
}
