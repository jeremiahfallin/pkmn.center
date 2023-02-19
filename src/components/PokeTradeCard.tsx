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
  useToast,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { trpc } from 'utils/trpc';

import PokeDetails from './PokeDetails';
import PokeStatChart from './PokeStatChart';

export default function PokeTradeCard({
  offerDetail,
  topPokemon,
  bottomPokemon,
  type,
}: any): JSX.Element {
  const toast = useToast();
  const mutation = trpc.pokemonRouter.updateOffer.useMutation({
    onSuccess: () => {
      console.log('success');
      toast({
        title: 'Offer accepted.',
        description: 'Check Discord for your trade room!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <>
      <Card direction="column">
        <CardBody p={2}>
          <Grid gridTemplateColumns={'repeat(3, 1fr)'}>
            <VStack justify="center">
              <PokeDetails pokemon={topPokemon} />
            </VStack>
            <Box>
              <Image
                src={topPokemon.pokemon.image}
                alt={topPokemon.pokemon.name}
                width={120}
                height={120}
                priority
              />
            </Box>
            <Box h="160px" w="160px" fontSize="xs">
              <PokeStatChart pokemon={topPokemon} />
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
              {bottomPokemon.user.name}#{bottomPokemon.user.discriminator}
            </Tag>
          </GridItem>
        </Grid>
        <CardBody p={2}>
          <Grid gridTemplateColumns={'repeat(3, 1fr)'}>
            <Box h="160px" w="160px" fontSize="xs">
              <PokeStatChart pokemon={bottomPokemon} />
            </Box>
            <Box>
              <Image
                src={bottomPokemon.pokemon.image}
                alt={bottomPokemon.pokemon.name}
                width={120}
                height={120}
                priority
              />
            </Box>
            <VStack justify="center">
              <PokeDetails pokemon={bottomPokemon} />
            </VStack>
          </Grid>
        </CardBody>
        <Divider />
        <CardFooter p={2} gap={2}>
          {type === 'pending' ? (
            <>
              <Button
                colorScheme={'blue'}
                onClick={() => {
                  mutation.mutateAsync({
                    offerDetailId: offerDetail.id,
                    status: 'accepted',
                  });
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme={'red'}
                onClick={() => {
                  mutation.mutateAsync({
                    offerDetailId: offerDetail.id,
                    status: 'declined',
                  });
                }}
              >
                Decline
              </Button>
            </>
          ) : type === 'accepted' ? (
            <Button
              colorScheme={'green'}
              onClick={() => {
                mutation.mutateAsync({
                  offerDetailId: offerDetail.id,
                  status: 'completed',
                });
              }}
            >
              Mark Completed
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </>
  );
}
