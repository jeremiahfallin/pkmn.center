import { Box, Flex, Image, Tag } from '@chakra-ui/react';

export default function PokeDetails({ pokemon }: { pokemon: any }) {
  let level = '';
  let region = '';
  let nature = '';
  if ('level' in pokemon) {
    level = `Lv. ${pokemon.level}`;
  } else {
    level = `Lv. ${pokemon.minLevel} - ${pokemon.maxLevel}`;
  }
  if (pokemon.region === 'unspecified') {
    region = 'Any';
  } else {
    region = pokemon.region;
  }
  if (pokemon.nature === 'unspecified') {
    nature = 'Any';
  } else {
    nature = pokemon.nature;
  }
  return (
    <Box p={1} w="100%" h="100%">
      <Flex
        direction="column"
        backgroundColor="gray.600"
        p={1}
        gap={1}
        borderRadius="md"
        w="100%"
        h="100%"
      >
        <Flex direction="row" gap={2}>
          <Tag variant="outline">{region}</Tag>
          <Tag>{nature}</Tag>
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
    </Box>
  );
}
