import { Box, Flex, Grid, Heading, Spinner } from '@chakra-ui/react';
import Container from 'components/Container';
import PokeCard from 'components/PokeCard';
import PokeListing from 'components/PokeListing';
import TradingFormCard from 'components/TradingFormCard';
import type { NextPage } from 'next';
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

const HomePage: NextPage = () => {
  const { data, error, status } = trpc.pokemonRouter.getAllListings.useQuery({
    limit: 6,
  });

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
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  }}
                  gap={8}
                >
                  {data?.map((listing) => {
                    return <PokeListing key={listing.id} pokemon={listing} />;
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

export default HomePage;
