/*
|-----------------------------------------
| setting up api
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: company, 2022
|-----------------------------------------
*/

import { NextApiRequest, NextApiResponse } from "next";
import { verifyRequestSource, sendJSONResponse, validatePassword, generateJwt } from "@/utils/global";

import * as process from "process";

const Boom = require("boom");
import { getIronSession } from "iron-session";
import type { IronSession } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    data: {
      mobile: string;
      alias: string;
      token: string;
      roles: number;
    } | null;
  }
}

const sessionOptions = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  // other options like cookieOptions, etc.
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: IronSession = await getIronSession(req, res, sessionOptions);

  const payload = req.body;

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
        return sendJSONResponse(res, 200, jwtPayload);
      }
      return sendJSONResponse(res, 400, Boom.badRequest("credentials did not work"));
    } else {
      return sendJSONResponse(res, 401, Boom.unauthorized("unauthorised"));
    }
  } catch (err) {
    return sendJSONResponse(
      res,
      400,
      Boom.badRequest(
        "Our authentication service is not working at the moment. Few highly paid monkies and rainos are now working to fix this. Apologies for any inconvenience."
      )
    );
  }
};
