import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import data from './data.json';
import type { Type } from '@prisma/client';

async function main() {
  for (let pokemon of data) {
    const pokemonTypeOne = pokemon?.types[0]?.toLowerCase() as unknown as Type;
    const pokemonTypeTwo =
      (pokemon?.types[1]?.toLowerCase() as unknown as Type) || null;
    await prisma.pokemon.upsert({
      where: {
        id: parseInt(pokemon.number.replace('#', ''), 10),
      },
      update: {},
      create: {
        id: parseInt(pokemon.number.replace('#', ''), 10),
        name: pokemon.name,
        typeOne: pokemonTypeOne,
        typeTwo: pokemonTypeTwo,
        image: pokemon.img,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
