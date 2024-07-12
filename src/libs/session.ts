/*
|-----------------------------------------
| setting up session handler
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: daauk, 2024
|-----------------------------------------
*/

import type { SessionOptions } from 'iron-session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const cookieSecret = process.env.SESSION_KEY as string;

export const sessionOptions: SessionOptions = {
  password: cookieSecret,
  cookieName: 'daauk',
};

export const getSession = async () => {
  return getIronSession(cookies(), sessionOptions);
};
