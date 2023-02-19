import { Box } from '@chakra-ui/react';
import type { PokemonListing } from '@prisma/client';
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
  unspecified: 1,
  noGood: 2,
  decent: 3,
  prettyGood: 4,
  veryGood: 5,
  fantastic: 6,
  best: 7,
};

function process(data: PokemonListing) {
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
          numberToValue[payload[0].value - 1]
        }`}</p>
      </Box>
    );
  }
  return null;
};

export function PokeStatChart({ pokemon }: { pokemon: PokemonListing }) {
  const data = process(pokemon);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minWidth="100%"
      minHeight="100%"
      debounce={1}
      aspect={1}
    >
      <RadarChart cx="50%" cy="50%" outerRadius="50%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <Tooltip content={<ValueTooltip />} />
        <PolarRadiusAxis domain={[0, 7]} tick={false} axisLine={false} />
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
