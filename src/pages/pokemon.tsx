import {
  Box,
  Flex,
  Grid,
  Heading,
  LinkBox,
  LinkOverlay,
  Spinner,
} from '@chakra-ui/react';
import Container from 'components/Container';
import PokeCard from 'components/PokeCard';
import Fuse from 'fuse.js';
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

const PokemonSearchPage: NextPage = () => {
  const { data, error, status } = trpc.pokemonRouter.getAll.useQuery();
  const router = useRouter();

  const fuse = new Fuse(data ?? [], {
    keys: ['name'],
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
                  {fuse
                    .search(router.query.search as string)
                    .slice(0, 20)
                    .map((result) => {
                      return (
                        <LinkBox key={result.item.id}>
                          <PokeCard
                            id={result.item.id}
                            image={result.item.image}
                            name={result.item.name}
                          />
                        </LinkBox>
                      );
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

export default PokemonSearchPage;
