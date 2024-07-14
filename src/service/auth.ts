/*
|-----------------------------------------
| setting up auth provider for the app
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2023
|-----------------------------------------
*/
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const sessionOptions = {
  password: process.env.SESSION_KEY as string,
  cookieName: process.env.SESSION_NAME as string,
  // other options like cookieOptions, etc.
};
export const getIronSessionData = async () => {
  return await getIronSession(cookies(), sessionOptions);
};

export const generateLoginToken = () => {
  return sign({}, process.env.SESSION_KEY);
};

export const logUserOut = async () => {
  cookies().delete(process.env.SESSION_NAME);
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
};

// import { cookies } from "next/headers";
// import { getIronSession } from "iron-session";
// import jwt from "jsonwebtoken";
// const { sign, verify } = jwt;

// export const getIronSessionData = async () => {
  
//   const cookieValue = cookies().get(process.env.SESSION_NAME as string);
//   return await getIronSession(cookieValue, { password: process.env.SESSION_KEY, cookieName: process.env.SESSION_NAME });
// };

// export const generateLoginToken = () => {
//   return sign({}, process.env.SESSION_KEY as string);
// };

// export const logUserOut = async () => {
//   cookies().delete(process.env.SESSION_NAME as string);
//   const session = await getIronSession(cookies().get(process.env.SESSION_NAME as string), {
//     password: process.env.SESSION_KEY,
//     cookieName: process.env.SESSION_NAME,
//   });
//   session.destroy();
// };
