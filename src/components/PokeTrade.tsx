import { Text } from '@chakra-ui/react';
import PokeTradeCard from './PokeTradeCard';

export default function PokeTrade({ pokemon, type }: any): JSX.Element {
  const offers = pokemon.offerDetails.filter(
    (offerDetail: any) => offerDetail.status === type,
  );

  if (offers.length === 0) {
    return <Text>No offers of this type.</Text>;
  }

  return (
    <>
      {offers.map((offerDetail: any) => {
        return (
          <PokeTradeCard
            key={offerDetail.id}
            type={type}
            offerDetail={offerDetail}
            topPokemon={pokemon}
            bottomPokemon={pokemon.listing}
          />
        );
      })}
    </>
  );
}
