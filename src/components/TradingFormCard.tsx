import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import PokeStatChart from './PokeStatChart';

import TradingFormDrawer from './TradingFormDrawer';

export default function TradingFormCard({
  methods,
  pokemon,
  index,
}: any): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pokemonStats = {
    ...pokemon,
    health: pokemon.health?.value ?? pokemon.health,
    attack: pokemon.attack?.value ?? pokemon.attack,
    defense: pokemon.defense?.value ?? pokemon.defense,
    specialAttack: pokemon.specialAttack?.value ?? pokemon.specialAttack,
    specialDefense: pokemon.specialDefense?.value ?? pokemon.specialDefense,
    speed: pokemon.speed?.value ?? pokemon.speed,
  };

  return (
    <>
      {methods && (
        <TradingFormDrawer
          isOpen={isOpen}
          onClose={onClose}
          pokemon={pokemon}
          index={index}
          {...{ methods }}
        />
      )}
      <Card w="240px" flexGrow="1" flexBasis="160px">
        <CardHeader py={2}>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">
                  {pokemon.pokemon.label ??
                    pokemon.pokemon.name ??
                    pokemon.name}
                </Heading>
              </Box>
            </Flex>
            {typeof index !== 'undefined' && (
              <CloseButton
                onClick={() => {
                  methods.setValue('offers', [
                    ...methods
                      .getValues('offers')
                      .filter((offer: any, i: number) => i !== index),
                  ]);
                }}
              />
            )}
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <Flex align={'center'} justify={'center'}>
            <Image
              src={pokemon.pokemon.image}
              alt={pokemon.pokemon.name}
              width={150}
              height={150}
            />
          </Flex>
          <PokeStatChart pokemon={pokemonStats} />
          <Text>Level: {pokemon.level}</Text>
          <Text>Nature: {pokemon.nature?.label ?? pokemon.nature}</Text>
          <Text>Tera Type: {pokemon.teraType?.label ?? pokemon.teraType}</Text>
          <Text>Shiny: {pokemon.shiny ? 'Yes' : 'No'}</Text>
          <Text>Region: {pokemon.region?.label ?? pokemon.region}</Text>
          <Text>Touch: {pokemon.touch ? 'Yes' : 'No'}</Text>
        </CardBody>
        {methods && (
          <>
            <Divider />
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '120px',
                },
              }}
            >
              <Button variant="solid" colorScheme="blue" onClick={onOpen}>
                Edit
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}
