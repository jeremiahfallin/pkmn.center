import { t } from 'server/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from 'server/db/client';

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  // Any queries or mutations after this middleware will
  // raise an error unless there is a current session
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const profileRouter = t.router({
  getById: t.procedure.input(z.string()).query(async ({ input }) => {
    const data = await prisma.user.findUnique({
      where: {
        id: input,
      },
      include: {
        pokemonListing: {
          include: {
            pokemon: true,
            user: true,
            offers: {
              include: {
                pokemon: true,
              },
            },
          },
        },
      },
    });

    return data;
  }),
});
