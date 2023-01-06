// src/server/db/client.ts
import { PrismaClient } from '@prisma/client';

import { env } from '../env';

declare global {
  /* eslint no-var: off */
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
