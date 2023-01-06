import { Box, Flex, Grid, Heading, Spinner } from '@chakra-ui/react';
import Container from 'components/Container';
import PokeCard from 'components/PokeCard';
import PokeListing from 'components/PokeListing';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { trpc } from 'utils/trpc';

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

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, status } = trpc.pokemonRouter.getListing.useQuery(
    typeof id === 'string' ? id : '',
  );

  console.log(data);

  return (
    <Suspense fallback={null}>
      <Container>
        <Flex justify="center" align="center" maxW="4xl" pb={48}>
          <Box textAlign={'center'}>
            <Heading py={4}>Pokemon</Heading>

            {status === 'loading' ? (
              <PokeCardEmpty />
            ) : status === 'error' ? (
              <>
                <Box>Error: {error?.message}</Box>
              </>
            ) : (
              <>
                <PokeCard
                  id={data?.pokemon.id ?? 1}
                  name={data?.pokemon.name ?? ''}
                  image={data?.pokemon.image ?? ''}
                />
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  }}
                  gap={8}
                >
                  {data?.offers.map((offer) => {
                    return <PokeListing key={offer.id} pokemon={offer} />;
                  })}
                </Grid>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Suspense>
  );
};

export default ProfilePage;
