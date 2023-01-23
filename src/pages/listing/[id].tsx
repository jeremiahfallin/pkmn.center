import {
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Intl, Temporal, toTemporalInstant } from '@js-temporal/polyfill';
import Container from 'components/Container';
import PokeListingOffer from 'components/PokeListingOffer';
import PokeStatChart from 'components/PokeStatChart';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { Suspense } from 'react';
import { trpc } from 'utils/trpc';

Date.prototype.toTemporalInstant = toTemporalInstant;

function PokeCardEmpty() {
  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </>
  );
}

const ListingPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, status } = trpc.pokemonRouter.getListing.useQuery(
    typeof id === 'string' ? id : '',
  );
  const { data: session } = useSession();

  const today = Temporal.Now.plainDateTimeISO();
  let createdAt = data?.createdAt.toTemporalInstant();
  if (data?.createdAt.toTemporalInstant() === undefined) {
    return <></>;
  }
  const pokemon = data;
  createdAt = createdAt
    .toZonedDateTimeISO(Temporal.Now.timeZone())
    .toPlainDateTime();
  // console.log(today.since(createdAt, { largestUnit: 'days' }));
  console.log(pokemon);

  return (
    <Suspense fallback={null}>
      <Container>
        <Flex justify="center" align="center" maxW="4xl" pb={48}>
          <Box textAlign={'center'}>
            {status === 'loading' ? (
              <PokeCardEmpty />
            ) : status === 'error' ? (
              <>
                <Box>Error: {error?.message}</Box>
              </>
            ) : (
              <Flex
                gap={4}
                w="100%"
                direction={{
                  base: 'column',
                  md: 'row',
                }}
              >
                <Flex direction="column" justify="start" align="start">
                  <Card>
                    <Image
                      alt={pokemon.pokemon.name ?? ''}
                      src={pokemon.pokemon.image ?? ''}
                    />
                  </Card>
                  <Heading size="lg">
                    {data?.pokemon.name ?? ''} details
                  </Heading>
                  <Flex direction="column" align="start" justify="start">
                    <Link href={`/profile/${pokemon.user.id}`}>
                      Trainer:{' '}
                      {`${pokemon.user.name}#${pokemon.user.discriminator}`}
                    </Link>
                    <Text>Shiny: {pokemon.shiny ? 'yes' : 'no'}</Text>
                    <Text>Nature: {pokemon.nature}</Text>
                    <Text>Region: {pokemon.region}</Text>
                    <Text>Lv: {pokemon.level}</Text>
                    <PokeStatChart pokemon={pokemon} />
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Heading size="lg">Desired Trades</Heading>
                  <Flex direction="column">
                    {data?.offers.map((offer) => {
                      return (
                        <PokeListingOffer
                          key={offer.id}
                          pokemon={offer}
                          isOwner={session?.user?.id === data.user.id}
                        />
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Box>
        </Flex>
      </Container>
    </Suspense>
  );
};

export default ListingPage;
