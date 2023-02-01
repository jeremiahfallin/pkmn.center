import { ArrowLeftIcon, ArrowRightIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  Tag,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { trpc } from 'utils/trpc';

import PokeDetails from './PokeDetails';
import PokeStatChart from './PokeStatChart';

export default function PokeTrade({ pokemon }: any): JSX.Element {
  const mutation = trpc.pokemonRouter.acceptOffer.useMutation({
    onSuccess: () => {
      console.log('success');
    },
  });
  return (
    <>
      {pokemon.offerDetails.map((offerDetail: any) => {
        return (
          <Card direction="column" key={offerDetail.id}>
            <CardBody p={2}>
              <Grid gridTemplateColumns={'repeat(3, 1fr)'}>
                <VStack justify="center">
                  <PokeDetails pokemon={pokemon} />
                </VStack>
                <Box>
                  <Image
                    src={pokemon.pokemon.image}
                    alt={pokemon.pokemon.name}
                    width={120}
                    height={120}
                    priority
                  />
                </Box>
                <Box h="160px" w="160px" fontSize="xs">
                  <PokeStatChart pokemon={pokemon} />
                </Box>
              </Grid>
            </CardBody>
            <Grid gridTemplateColumns={'repeat(3, 1fr)'}>
              <GridItem borderBottom={'1px solid'} py={2}>
                <Tag>
                  {offerDetail.user.name}#{offerDetail.user.discriminator}
                </Tag>
              </GridItem>
              <GridItem
                border={'1px solid'}
                py={2}
                borderTopLeftRadius={'lg'}
                borderBottomRightRadius={'lg'}
              >
                <ArrowLeftIcon />
                <MinusIcon />
                <ArrowRightIcon />
              </GridItem>
              <GridItem borderTop={'1px solid'} py={2}>
                <Tag>
                  {pokemon.listing.user.name}#
                  {pokemon.listing.user.discriminator}
                </Tag>
              </GridItem>
            </Grid>
            <CardBody p={2}>
              <Grid gridTemplateColumns={'repeat(3, 1fr)'}>
                <Box h="160px" w="160px" fontSize="xs">
                  <PokeStatChart pokemon={pokemon} />
                </Box>
                <Box>
                  <Image
                    src={pokemon.listing.pokemon.image}
                    alt={pokemon.listing.pokemon.name}
                    width={120}
                    height={120}
                    priority
                  />
                </Box>
                <VStack justify="center">
                  <PokeDetails pokemon={pokemon.listing} />
                </VStack>
              </Grid>
            </CardBody>
            <Divider />
            <CardFooter p={2} gap={2}>
              <Button
                colorScheme={'blue'}
                onClick={() => {
                  mutation.mutateAsync({
                    offerDetailId: offerDetail.id,
                  });
                }}
              >
                Accept
              </Button>
              <Button colorScheme={'red'}>Decline</Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
