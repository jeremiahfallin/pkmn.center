import { TRPCError } from '@trpc/server';
import { createListingSchema } from 'schemas';
import { prisma } from 'server/db/client';
import { t } from 'server/trpc/trpc';
import { z } from 'zod';

import sendMessage from '../discord';

const Pokemon = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  pokemonListing: z.array(
    z
      .object({
        id: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
        userId: z.string(),
        pokemonId: z.number(),
        health: z.number().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        speed: z.number().optional(),
        specialAttack: z.number().optional(),
        specialDefense: z.number().optional(),
        level: z.number().optional(),
        nature: z.string().optional(),
        ability: z.string().optional(),
        teraType: z.string().optional(),
      })
      .optional(),
  ),
});
const Pokemons = z.array(Pokemon);

export type Pokemon = z.infer<typeof Pokemon>;
export type Pokemons = z.infer<typeof Pokemons>;

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  // Any queries or mutations after this middleware will
  // raise an error unless there is a current session
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const pokemonRouter = t.router({
  getById: t.procedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.pokemon.findUnique({
      where: {
        id: input,
      },
      include: {
        pokemonListing: true,
      },
    });

    return {
      id: data?.id ?? 0,
      name: data?.name ?? '',
      image: data?.image ?? '',
    };
  }),

  getAll: t.procedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const data = await prisma.pokemon.findMany({
        take: input?.limit,
        skip: input?.offset,
      });

      return data.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
      }));
    }),
  getAllListings: t.procedure
    .input(
      z.object({
        limit: z.number().optional(),
        pokemonId: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const data = await prisma.pokemonListing.findMany({
        take: input?.limit,
        where: {
          pokemonId: {
            equals: input.pokemonId,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          pokemon: true,
          offers: {
            include: {
              pokemon: true,
            },
          },
          user: true,
        },
      });

      return data;
    }),
  getListing: t.procedure.input(z.string()).query(async ({ input }) => {
    const data = await prisma.pokemonListing.findUnique({
      where: {
        id: input,
      },
      include: {
        pokemon: true,
        offers: {
          include: {
            pokemon: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            discriminator: true,
          },
        },
      },
    });

    return data;
  }),
  getListings: t.procedure
    .input(
      z.object({
        limit: z.number().optional(),
        pokemonId: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const data = await prisma.pokemon.findFirst({
        take: input?.limit,
        where: {
          id: {
            equals: input.pokemonId,
          },
        },
        include: {
          pokemonListing: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              pokemon: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  discriminator: true,
                },
              },
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
  create: t.procedure
    .use(authMiddleware)
    .input(createListingSchema)
    .mutation(async ({ input }) => {
      await prisma.pokemonListing.create({
        data: {
          userId: input.userId,
          pokemonId: input.pokemon.id,
          health: input.health?.value ?? 'unspecified',
          attack: input.attack?.value,
          defense: input.defense?.value,
          speed: input.speed?.value,
          specialAttack: input.specialAttack?.value,
          specialDefense: input.specialDefense?.value,
          level: input.level,
          nature: input.nature?.value,
          ability: input.ability,
          teraType: input.teraType?.value,
          region: input.region?.value,
          shiny: input.shiny,
          touch: input.touch,
          free: input.free,
          offers: {
            create: input.offers.map((offer) => ({
              pokemonId: offer.pokemon.id,
              health: offer.health?.value,
              attack: offer.attack?.value,
              defense: offer.defense?.value,
              speed: offer.speed?.value,
              specialAttack: offer.specialAttack?.value,
              specialDefense: offer.specialDefense?.value,
              minLevel: offer.levels?.[0],
              maxLevel: offer.levels?.[1],
              nature: offer.nature?.value,
              ability: offer.ability,
              teraType: offer.teraType?.value,
              region: offer.region?.value,
              shiny: offer.shiny,
              touch: input.touch,
            })),
          },
        },
      });
    }),
  makeOffer: t.procedure
    .use(authMiddleware)
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      await prisma.userOffer.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          pokemonOffer: {
            connect: {
              id: input,
            },
          },
        },
      });
    }),
  getOffers: t.procedure.use(authMiddleware).query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    const data = await prisma.pokemonOffer.findMany({
      where: {
        listing: {
          userId: {
            equals: ctx.session.user.id,
          },
        },
      },
      include: {
        listing: {
          include: {
            pokemon: true,
            user: {
              select: {
                id: true,
                name: true,
                discriminator: true,
                accounts: {
                  select: {
                    providerAccountId: true,
                  },
                },
              },
            },
          },
        },
        pokemon: true,
        userOffer: {
          select: {
            id: true,
            accepted: true,
            createdAt: true,
            pokemonOffer: true,
            user: {
              select: {
                id: true,
                name: true,
                discriminator: true,
                accounts: {
                  select: {
                    providerAccountId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  }),
  acceptOffer: t.procedure
    .use(authMiddleware)
    .input(
      z.object({
        userOfferId: z.string(),
        poke1: z.string(),
        poke2: z.string(),
        user1: z.string(),
        user2: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const { userOfferId, poke1, poke2, user1, user2 } = input;

      const userOffer = await prisma.userOffer.update({
        where: {
          id: userOfferId,
        },
        data: {
          accepted: true,
        },
      });
      sendMessage(userOffer.id, poke1, poke2, user1, user2);
    }),
});
