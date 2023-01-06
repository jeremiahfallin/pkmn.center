import React, { Suspense, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from 'components/Container';
import { trpc } from 'utils/trpc';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Image from 'next/image';
import PokeListing from 'components/PokeListing';

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

function AccordionFilter({
  stat,
  name,
  state,
  setState,
}: {
  stat: string;
  name: string;
  state: any;
  setState: any;
}): JSX.Element {
  function SelectIndividualValue({ value, valueName }: any) {
    return (
      <Box
        cursor="pointer"
        userSelect={'none'}
        color={state[name] === value ? 'blue.500' : 'gray.500'}
        onClick={() => {
          setState((prev: any) => ({
            ...prev,
            [name]: prev[name] === value ? '' : value,
          }));
        }}
      >
        {valueName}
      </Box>
    );
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {stat}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex direction="column" justify="center" align="start">
          <SelectIndividualValue value="best" valueName="Best" />
          <SelectIndividualValue value="fantastic" valueName="Fantastic" />
          <SelectIndividualValue value="veryGood" valueName="Very Good" />
          <SelectIndividualValue value="prettyGood" valueName="Pretty Good" />
          <SelectIndividualValue value="decent" valueName="Decent" />
          <SelectIndividualValue value="noGood" valueName="No Good" />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

const PokemonPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, status } = trpc.pokemonRouter.getListings.useQuery({
    pokemonId: Number(id),
  });
  const [statRequirements, setStatRequirements] = useState({
    health: '',
    attack: '',
    defense: '',
    specialAttack: '',
    specialDefense: '',
    speed: '',
  });

  const filters = [
    {
      stat: 'Health',
      name: 'health',
    },
    {
      stat: 'Attack',
      name: 'attack',
    },
    {
      stat: 'Defense',
      name: 'defense',
    },
    {
      stat: 'Special Attack',
      name: 'specialAttack',
    },
    {
      stat: 'Special Defense',
      name: 'specialDefense',
    },
    {
      stat: 'Speed',
      name: 'speed',
    },
  ];

  return (
    <Suspense fallback={null}>
      <Container>
        <Flex justify="center" align="center" pb={48} w="100%">
          <Box textAlign={'center'} w="100%">
            <Heading py={4}>{data?.name}</Heading>
            {status === 'loading' ? (
              <PokeCardEmpty />
            ) : status === 'error' ? (
              <>
                <Box>Error: {error?.message}</Box>
              </>
            ) : (
              <>
                <Flex
                  direction="row"
                  gap={4}
                  justify="space-between"
                  w="100%"
                  minW="100%"
                >
                  <Flex w="fit-content" direction="column">
                    {data && (
                      <Image
                        src={data.image}
                        alt={data.name}
                        width={200}
                        height={200}
                      />
                    )}
                    <Accordion allowMultiple w="fit-content">
                      {filters.map((filter) => (
                        <AccordionFilter
                          key={filter.name}
                          stat={filter.stat}
                          name={filter.name}
                          state={statRequirements}
                          setState={setStatRequirements}
                        />
                      ))}
                    </Accordion>
                  </Flex>
                  <Flex w="100%" direction="column" gap={2}>
                    {data?.pokemonListing.map((listing) => (
                      <PokeListing key={listing.id} pokemon={listing} />
                    ))}
                  </Flex>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Suspense>
  );
};

export default PokemonPage;
