/*
|-----------------------------------------
| setting up Route for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-------

*/
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

import { sessionOptions } from '@/libs/session';
import { verifyRequestSource } from '@/utils/global';


export async function POST(req: NextRequest,res: NextResponse){
  const session = await getIronSession(cookies(), sessionOptions);

  const payload = await req.json();

  try {
    const validSource = await verifyRequestSource(req);

    if (validSource) {
      const request = await fetch(`${process.env.API}/auth/kitchenpad-login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      if (request.status === 200) {
        const jwtPayload = {
          mobile: payload.id,
          alias: payload.alias,
          token: response.content,
          roles: 5,
        };
        session.data = jwtPayload;
        await session.save();

        return NextResponse.json(jwtPayload, { status: 200 });
      }

      return NextResponse.json({ error: 'Credentials did not work' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
  }
}
