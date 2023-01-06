import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { chakraComponents } from 'chakra-react-select';
import Container from 'components/Container';
import ControlledSelect from 'components/ControlledSelect';
import TradingForm from 'components/TradingForm';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { Suspense, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createListingSchema } from 'schemas';
import { trpc } from 'utils/trpc';

const HomePage: NextPage = () => {
  const { data: session } = useSession();
  const { data, error, status } = trpc.pokemonRouter.getAll.useQuery();
  const createListing = trpc.pokemonRouter.create.useMutation({
    onSuccess: () => {
      console.log('success');
    },
  });
  const methods = useForm({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      userId: '',
      pokemon: null,
      health: { value: 'noGood', label: 'No Good' },
      attack: { value: 'noGood', label: 'No Good' },
      defense: { value: 'noGood', label: 'No Good' },
      specialAttack: { value: 'noGood', label: 'No Good' },
      specialDefense: { value: 'noGood', label: 'No Good' },
      speed: { value: 'noGood', label: 'No Good' },
      level: 1,
      nature: { value: 'any', label: 'Any' },
      teraType: { value: 'any', label: 'Any' },
      ability: '',
      shiny: false,
      region: { value: 'any', label: 'Any' },
      free: false,
      touch: false,
      listingType: 'sell',
      offers: [],
    },
  });
  if (!session?.user?.id) {
    return (
      <Container>
        <Box>You must be signed in to view this page.</Box>
      </Container>
    );
  }

  const pokemonData = data?.map((pokemon) => {
    return {
      value: pokemon.name,
      label: pokemon.name,
      id: pokemon.id,
      image: pokemon.image,
    };
  });

  const customComponents = {
    Option: ({ children, ...props }: any): JSX.Element => (
      <chakraComponents.Option {...props}>
        <Tooltip
          borderRadius={8}
          label={
            <Image
              src={props.data.image}
              alt={props.value}
              height={100}
              width={100}
            />
          }
        >
          {`#${props.data.id} ${props.value}`}
        </Tooltip>
      </chakraComponents.Option>
    ),
    MenuList: ({ children, ...props }: any): JSX.Element => {
      if (children.length > 20) {
        return (
          <chakraComponents.MenuList {...props}>
            {children.slice(0, 20)}
          </chakraComponents.MenuList>
        );
      }
      return (
        <chakraComponents.MenuList {...props}>
          {children}
        </chakraComponents.MenuList>
      );
    },
  };
  if (methods.getValues('userId') === '') {
    methods.setValue('userId', session.user.id);
  }

  return (
    <Suspense fallback={null}>
      <Container>
        <Flex justify="center" align="center" pb={48} w="100%">
          <Box textAlign={'center'}>
            <Heading py={4}>Create a listing</Heading>
            {status === 'error' ? (
              <>
                <Box>Error: {error?.message}</Box>
              </>
            ) : (
              <form
                onSubmit={methods.handleSubmit(async (data) => {
                  console.log(data);
                  const res = await createListing.mutateAsync(data as any);
                  console.log(res);
                  methods.reset();
                })}
              >
                <FormControl isDisabled={status === 'loading'}>
                  <Tabs>
                    <TabList>
                      <Tab
                        onClick={(e) => methods.setValue('listingType', 'buy')}
                      >
                        Trading
                      </Tab>
                      <Tab
                        onClick={(e) =>
                          methods.setValue('listingType', 'wishlist')
                        }
                      >
                        Wishlist
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Flex direction="column" gap={2}>
                          <ControlledSelect
                            name={'pokemon'}
                            label={'Pokemon'}
                            options={pokemonData}
                            control={methods.control}
                            rules={{ required: 'This is required' }}
                            components={customComponents}
                          />
                          <TradingForm
                            type="sell"
                            data={pokemonData}
                            controlledSelectComponents={customComponents}
                            {...{ methods }}
                          />
                          <Button type="submit">Submit</Button>
                        </Flex>
                      </TabPanel>
                      <TabPanel>
                        <Flex direction="column" gap={2}>
                          <ControlledSelect
                            name={'pokemon'}
                            label={'Pokemon'}
                            options={pokemonData}
                            control={methods.control}
                            rules={{ required: 'This is required' }}
                            components={customComponents}
                          />
                          <TradingForm
                            type="wishlist"
                            data={pokemonData}
                            controlledSelectComponents={customComponents}
                            {...{ methods }}
                          />
                          <Button
                            type="submit"
                            disabled={createListing.isLoading}
                          >
                            Submit
                          </Button>
                        </Flex>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </FormControl>
              </form>
            )}
          </Box>
        </Flex>
      </Container>
    </Suspense>
  );
};

export default HomePage;
