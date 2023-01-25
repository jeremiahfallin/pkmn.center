import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { trpc } from 'utils/trpc';

import PokeDetails from './PokeDetails';
import PokeStatChart from './PokeStatChart';

export default function PokeListingOffer({
  pokemon,
  isOwner,
}: any): JSX.Element {
  const mutation = trpc.pokemonRouter.makeOffer.useMutation({
    onSuccess: () => {
      console.log('success');
    },
  });
  return (
    <Card flexGrow="1" flexBasis="160px" direction="column">
      <CardBody p={2}>
        <Grid templateColumns={'repeat(3, 1fr)'} h="100%">
          <VStack justify="center" h="100%">
            <PokeDetails pokemon={pokemon} />
          </VStack>
          <VStack justify="center">
            <Image
              src={pokemon.pokemon.image}
              alt={pokemon.pokemon.name}
              width={120}
              height={120}
              priority
            />
          </VStack>
          <Box fontSize="xs" h="100%" w="100%">
            <PokeStatChart pokemon={pokemon} />
          </Box>
        </Grid>
      </CardBody>
      {!isOwner && (
        <>
          <Divider />
          <CardFooter py={2}>
            <Stack>
              <Button
                colorScheme={'blue'}
                onClick={async () => await mutation.mutateAsync(pokemon.id)}
              >
                Make Offer
              </Button>
            </Stack>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
