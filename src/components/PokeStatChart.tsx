import { Box } from '@chakra-ui/react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const numberToValue = [
  'Unspecified',
  'No Good',
  'Decent',
  'Pretty Good',
  'Very Good',
  'Fantastic',
  'Best',
];

const valueToNumber = {
  unspecified: 0,
  noGood: 1,
  decent: 2,
  prettyGood: 3,
  veryGood: 4,
  fantastic: 5,
  best: 6,
};

function process(data: Offer | Listing) {
  return [
    { stat: 'HP', value: valueToNumber[data.health] },
    {
      stat: 'Atk',
      value: valueToNumber[data.attack],
    },
    { stat: 'Def', value: valueToNumber[data.defense] },

    { stat: 'Spd', value: valueToNumber[data.speed] },

    {
      stat: 'SpDef',
      value: valueToNumber[data.specialDefense],
    },
    {
      stat: 'SpAtk',
      value: valueToNumber[data.specialAttack],
    },
  ];
}

export interface Offer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pokemonId: number;
  health: StatValue;
  attack: StatValue;
  specialAttack: StatValue;
  defense: StatValue;
  specialDefense: StatValue;
  speed: StatValue;
  minLevel: number;
  maxLevel: number;
  nature: string;
  ability: string;
  teraType: string;
  shiny: boolean;
  region: string;
  touch: boolean;
  listingId: string;
  listing: Listing;
  pokemon: Pokemon;
  userOffer: UserOffer[];
}
export interface Listing {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pokemonId: number;
  health: StatValue;
  attack: StatValue;
  specialAttack: StatValue;
  defense: StatValue;
  specialDefense: StatValue;
  speed: StatValue;
  level: number;
  nature: string;
  ability: string;
  teraType: string;
  shiny: boolean;
  region: string;
  free: boolean;
  touch: boolean;
  acceptOffers?: null;
  pokemon: Pokemon;
  user: User;
}
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  typeOne: string;
  typeTwo: string;
}
export interface UserOffer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  offerId: string;
  user: User;
  offer: Offer;
  accepted: boolean;
}
export interface User {
  id: string;
  name: string;
  discriminator: string;
  userOffer: UserOffer[];
  accounts: Account[];
}
export interface Account {
  id: string;
  providerAccountId: string;
}
enum StatValue {
  unspecified = 'unspecified',
  noGood = 'noGood',
  decent = 'decent',
  prettyGood = 'prettyGood',
  veryGood = 'veryGood',
  fantastic = 'fantastic',
  best = 'best',
}

const ValueTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p={2}
        borderRadius="md"
        boxShadow="md"
        fontSize="sm"
        w="100%"
        bg="gray.700"
      >
        <p className="label">{`${label}: ${
          numberToValue[payload[0].value]
        }`}</p>
      </Box>
    );
  }
  return null;
};

export function PokeStatChart({ pokemon }: { pokemon: Offer | Listing }) {
  const data = process(pokemon);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <Tooltip content={<ValueTooltip />} />
        <PolarRadiusAxis domain={[0, 6]} tick={false} axisLine={false} />
        <Radar
          name="Pokemon"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default PokeStatChart;
