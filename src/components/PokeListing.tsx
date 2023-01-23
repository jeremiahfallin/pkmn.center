import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Grid,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Link,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import PokeDetails from './PokeDetails';
import PokeStatChart from './PokeStatChart';

export default function PokeListing({ pokemon }: any): JSX.Element {
  return (
    <LinkBox as="article">
      <Card flexGrow="1" flexBasis="160px">
        <CardBody p={2}>
          <Grid templateColumns={'repeat(3, 1fr)'}>
            <VStack justify="flex-end">
              <LinkOverlay href={`/listing/${pokemon.id}`}>
                <PokeDetails pokemon={pokemon} />
              </LinkOverlay>
            </VStack>
            <Box>
              <Link href={`/profile/${pokemon.user.id}`}>
                <Heading as="h3" size="sm" pb={0}>
                  {pokemon.user.name}#{pokemon.user.discriminator}
                </Heading>
              </Link>
              <Image
                src={pokemon.pokemon.image}
                alt={pokemon.pokemon.name}
                width={120}
                height={120}
                priority
              />
            </Box>
            <VStack justify="flex-end">
              <Box fontSize="xs" h="100%" w="100%">
                <PokeStatChart pokemon={pokemon} />
              </Box>
            </VStack>
          </Grid>
        </CardBody>
        {pokemon.offers.length > 0 && (
          <>
            <Divider />
            <CardFooter p={2} pt={0} overflowX="auto">
              <VStack>
                <Heading as="h3" size="sm" pb={0}>
                  Desired Pokemon
                </Heading>
                <HStack>
                  {pokemon.offers?.length && (
                    <>
                      {pokemon.offers?.map((offer: any) => (
                        <Image
                          key={offer.pokemon.id}
                          src={offer.pokemon.image}
                          alt={offer.pokemon.name}
                          width={75}
                          height={75}
                        />
                      ))}
                    </>
                  )}
                </HStack>
              </VStack>
            </CardFooter>
          </>
        )}
      </Card>
    </LinkBox>
  );
}
