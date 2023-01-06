import { z } from 'zod';

const individualValueSelectProperties = z.object({
  label: z.enum([
    'No Good',
    'Decent',
    'Pretty Good',
    'Very Good',
    'Fantastic',
    'Best',
  ]),
  value: z.enum([
    'noGood',
    'decent',
    'prettyGood',
    'veryGood',
    'fantastic',
    'best',
  ]),
});

const natureSelectProperties = z.object({
  label: z.enum([
    'Hardy',
    'Lonely',
    'Brave',
    'Adamant',
    'Naughty',
    'Bold',
    'Docile',
    'Relaxed',
    'Impish',
    'Lax',
    'Timid',
    'Hasty',
    'Serious',
    'Jolly',
    'Naive',
    'Modest',
    'Mild',
    'Quiet',
    'Bashful',
    'Rash',
    'Calm',
    'Gentle',
    'Sassy',
    'Careful',
    'Quirky',
  ]),
  value: z.enum([
    'hardy',
    'lonely',
    'brave',
    'adamant',
    'naughty',
    'bold',
    'docile',
    'relaxed',
    'impish',
    'lax',
    'timid',
    'hasty',
    'serious',
    'jolly',
    'naive',
    'modest',
    'mild',
    'quiet',
    'bashful',
    'rash',
    'calm',
    'gentle',
    'sassy',
    'careful',
    'quirky',
  ]),
});

const teraTypeSelectProperties = z.object({
  label: z.enum([
    'Any',
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ]),
  value: z.enum([
    'any',
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ]),
});

const regionSelectProperties = z.object({
  label: z.enum([
    'Any',
    'ENG',
    'JPN',
    'SPA',
    'SP-EU',
    'FRE',
    'GER',
    'ITA',
    'CHT',
    'CHS',
    'KOR',
  ]),
  value: z.enum([
    'any',
    'ENG',
    'JPN',
    'SPA',
    'SPEU',
    'FRE',
    'GER',
    'ITA',
    'CHT',
    'CHS',
    'KOR',
  ]),
});

export const createListingSchema = z.object({
  userId: z.string(),
  pokemon: z.object({
    id: z.number(),
    label: z.string(),
    image: z.string(),
    value: z.string(),
  }),
  health: individualValueSelectProperties.optional(),
  attack: individualValueSelectProperties.optional(),
  defense: individualValueSelectProperties.optional(),
  speed: individualValueSelectProperties.optional(),
  specialAttack: individualValueSelectProperties.optional(),
  specialDefense: individualValueSelectProperties.optional(),
  level: z.number().optional(),
  nature: natureSelectProperties.optional(),
  ability: z.string().optional(),
  teraType: teraTypeSelectProperties.optional(),
  shiny: z.boolean().optional(),
  region: regionSelectProperties.optional(),
  free: z.boolean().optional(),
  touch: z.boolean().optional(),
  desiredPokemon: z
    .object({
      id: z.number(),
      label: z.string(),
      image: z.string(),
      value: z.string(),
    })
    .nullable()
    .optional(),
  offers: z.array(
    z.object({
      pokemon: z.object({
        id: z.number(),
        label: z.string(),
        image: z.string(),
        value: z.string(),
      }),
      health: individualValueSelectProperties.optional(),
      attack: individualValueSelectProperties.optional(),
      defense: individualValueSelectProperties.optional(),
      speed: individualValueSelectProperties.optional(),
      specialAttack: individualValueSelectProperties.optional(),
      specialDefense: individualValueSelectProperties.optional(),
      level: z.number().optional(),
      nature: natureSelectProperties.optional(),
      ability: z.string().optional(),
      teraType: teraTypeSelectProperties.optional(),
      shiny: z.boolean().optional(),
      region: regionSelectProperties.optional(),
      free: z.boolean().optional(),
      touch: z.boolean().optional(),
    }),
  ),
});
