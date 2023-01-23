import { Box, Flex, Image, Tag } from '@chakra-ui/react';

import { Listing, Offer } from './PokeStatChart';

export default function PokeDetails({ pokemon }: { pokemon: Offer | Listing }) {
  let level = '';
  if ('level' in pokemon) {
    level = `Lv. ${pokemon.level}`;
  } else {
    level = `Lv. ${pokemon.minLevel} - ${pokemon.maxLevel}`;
  }
  return (
    <Flex
      direction="column"
      backgroundColor="gray.600"
      p={2}
      gap={1}
      borderRadius="md"
    >
      <Flex direction="row" gap={2}>
        <Tag variant="outline">SPA-EU</Tag>
        <Tag>Hardy</Tag>
      </Flex>
      <Flex direction="row" gap={2}>
        <Box filter={pokemon.shiny ? '' : 'grayscale(100%)'}>✨</Box>

        <Box filter={pokemon.touch ? '' : 'grayscale(100%)'}>🤝</Box>
      </Flex>
      <Box fontWeight={800} marginTop="0">
        {pokemon.pokemon.name}
      </Box>
      <Tag w="fit-content">{level}</Tag>
      <Box>
        {pokemon.teraType !== 'unspecified' &&
          pokemon.teraType !== 'unspecified' && (
            <Image
              src={`/${pokemon.teraType}.png`}
              alt={pokemon.teraType}
              width={30}
              height={30}
            />
          )}
      </Box>
    </Flex>
  );
}
