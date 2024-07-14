/*
|-----------------------------------------
| setting up authentication route for the app
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: daauk, 2024
|-----------------------------------------
*/

import Boom from '@hapi/boom';
import Crypto from 'crypto';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import prisma from '@/libs/DB';
import { sessionOptions } from '@/libs/session';

const validatePassword = (
  hashedPassword: string,
  password: string,
  salt: string,
) => {
  const hash = Crypto.pbkdf2Sync(password, salt, 1000, 128, 'sha512').toString(
    'hex',
  );
  return hashedPassword === hash;
};

export async function POST(request: Request) {
  const payload = await request.json();
  const { email, password } = payload;

  try {
    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (validatePassword(user.password, password, user.salt)) {
        const session = await getIronSession(cookies(), sessionOptions);
        // @ts-ignore
        session.user = user;
        await session.save();

        return NextResponse.json({
          status: true,
        });
      }

      return NextResponse.json({
        data: Boom.badRequest('We do not like your credential. Please check'),
        status: false,
      });
    }
    return NextResponse.json({
      status: false,
      data: Boom.badRequest('We do not like your credential. Please check'),
    });
  } catch (err) {
    return NextResponse.json({
      data: Boom.badRequest(
        'Our authentication service is not working at the moment.',
      ),
      status: false,
    });
  }
}
