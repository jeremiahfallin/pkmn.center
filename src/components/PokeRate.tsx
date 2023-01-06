import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PokeCard from 'components/PokeCard';
import { trpc } from 'utils/trpc';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { Box } from '@chakra-ui/react';

export default function PokeRate(pokemon: any) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(pokemon.rate);
  const mutation = trpc.pokemon.upsert.useMutation();

  const leaveRate = async (id: number, rate: number) => {
    setRating(rate);
    mutation.mutate({
      pokemonId: id,
      rate,
    });
  };

  return (
    <>
      <PokeCard {...pokemon} />
      {session && (
        <Box fontSize="3xl">
          <Rate
            count={5}
            value={rating}
            onChange={(rate) => leaveRate(pokemon.id, rate)}
          />
        </Box>
      )}
    </>
  );
}
