/*
|-----------------------------------------
| setting up prisma client for the app
| @author: Jahid Haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2024
|-----------------------------------------
*/

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
