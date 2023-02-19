import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import Container from 'components/Container';
import PokeListing from 'components/PokeListing';
import PokeTrade from 'components/PokeTrade';
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

const ListingTab = ({ data }: any) => {
  return (
    <VStack gap={2}>
      {data?.pokemonListing.map((listing: any) => (
        <PokeListing key={listing.id} pokemon={listing} />
      ))}
    </VStack>
  );
};

const OfferTab = () => {
  const { data, error, status } = trpc.pokemonRouter.getOffers.useQuery();

  if (status === 'loading') {
    return <PokeCardEmpty />;
  }
  if (status === 'error') {
    return <Box>Error: {error?.message}</Box>;
  }

  return (
    <Tabs variant="solid-rounded" w="100%" isLazy>
      <TabList>
        <Tab>Open</Tab>
        <Tab>Accepted</Tab>
        <Tab>Declined</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack w="100%">
            {data.map((offer) => {
              return (
                <PokeTrade key={offer.id} type="pending" pokemon={offer} />
              );
            })}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack w="100%">
            {data.map((offer) => {
              return (
                <PokeTrade key={offer.id} type="accepted" pokemon={offer} />
              );
            })}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack w="100%">
            {data.map((offer) => {
              return (
                <PokeTrade key={offer.id} type="declined" pokemon={offer} />
              );
            })}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack w="100%">
            {data.map((offer) => {
              return (
                <PokeTrade key={offer.id} type="completed" pokemon={offer} />
              );
            })}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const WishlistTab = () => {
  return (
    <h1>
      <div>Wishlists will be implemented soon!</div>
    </h1>
  );
};

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, status } = trpc.profileRouter.getById.useQuery(
    typeof id === 'string' ? id : '',
  );

  return (
    <Suspense fallback={null}>
      <Container>
        <Flex justify="center" align="center" maxW="4xl" pb={48} w="100%">
          <Box textAlign={'center'} w="100%">
            {status === 'loading' ? (
              <PokeCardEmpty />
            ) : status === 'error' ? (
              <>
                <Box>Error: {error?.message}</Box>
              </>
            ) : (
              <>
                <Flex direction="column" gap={8} w="100%">
                  <HStack gap={2} w="100%">
                    <Avatar
                      size="2xl"
                      src={data?.image ?? ''}
                      name={data?.name ?? ''}
                    />
                    <Heading>
                      {data?.name}#{data?.discriminator}
                    </Heading>
                  </HStack>
                  <Tabs isFitted isLazy>
                    <TabList>
                      <Tab>Listings</Tab>
                      <Tab>Offers</Tab>
                      <Tab>Wishlist</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <ListingTab data={data} />
                      </TabPanel>
                      <TabPanel>
                        <OfferTab />
                      </TabPanel>
                      <TabPanel>
                        <WishlistTab />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Suspense>
  );
};

export default ProfilePage;
