import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  FormHelperText,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import ControlledSelect from './ControlledSelect';

export default function TradingFormDrawer({
  methods,
  pokemon,
  isOpen,
  onClose,
  index,
}: any): JSX.Element {
  const name = typeof index !== 'undefined' ? `offers[${index}]` : '';
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading>{pokemon.pokemon.value}</Heading>
          <Image
            src={pokemon.pokemon.image}
            alt={pokemon.pokemon.value}
            width={100}
            height={100}
          />
        </DrawerHeader>

        <DrawerBody>
          <Box pb={4}>
            <Flex gap={2} wrap="wrap" align="flex-end">
              {[
                { value: 'health', label: 'HP' },
                { value: 'attack', label: 'Attack' },
                { value: 'defense', label: 'Defense' },
                { value: 'specialAttack', label: 'Sp. Attack' },
                { value: 'specialDefense', label: 'Sp. Defense' },
                { value: 'speed', label: 'Speed' },
              ].map((stat) => {
                return (
                  <Box key={stat.value} flexGrow={1} flexBasis={'160px'}>
                    <ControlledSelect
                      name={`${name}.${stat.value}`}
                      label={stat.label}
                      options={[
                        { value: 'noGood', label: 'No Good' },
                        { value: 'decent', label: 'Decent' },
                        {
                          value: 'prettyGood',
                          label: 'Pretty Good',
                        },
                        {
                          value: 'veryGood',
                          label: 'Very Good',
                        },
                        {
                          value: 'fantastic',
                          label: 'Fantastic',
                        },
                        { value: 'best', label: 'Best' },
                      ]}
                      control={methods.control}
                    />
                  </Box>
                );
              })}
            </Flex>
            <FormHelperText>
              What IVs are you looking for? (leave &quot;No Good&quot; if no
              preference)
            </FormHelperText>
          </Box>
          <Flex gap={2} wrap="wrap" align="flex-end">
            <Box flexGrow={1} flexBasis={'160px'}>
              <FormLabel>Minimum level</FormLabel>
              <Controller
                name={`${name}level`}
                control={methods.control}
                rules={{
                  required: {
                    value: true,
                    message: 'Level is required',
                  },
                }}
                render={({ field: { ref, onChange, ...restField } }) => (
                  <NumberInput
                    {...restField}
                    min={1}
                    max={100}
                    onChange={(e) => onChange(parseInt(e))}
                  >
                    <NumberInputField ref={ref} name={'level'} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
            </Box>
            <Box flexGrow={1} flexBasis={'160px'}>
              <ControlledSelect
                name={`${name}.nature`}
                label={'Nature'}
                options={[
                  { value: 'any', label: 'Any' },
                  { value: 'adamant', label: 'Adamant' },
                  { value: 'bashful', label: 'Bashful' },
                  { value: 'bold', label: 'Bold' },
                  { value: 'brave', label: 'Brave' },
                  { value: 'calm', label: 'Calm' },
                  { value: 'careful', label: 'Careful' },
                  { value: 'docile', label: 'Docile' },
                  { value: 'gentle', label: 'Gentle' },
                  { value: 'hardy', label: 'Hardy' },
                  { value: 'hasty', label: 'Hasty' },
                  { value: 'impish', label: 'Impish' },
                  { value: 'jolly', label: 'Jolly' },
                  { value: 'lax', label: 'Lax' },
                  { value: 'lonely', label: 'Lonely' },
                  { value: 'mild', label: 'Mild' },
                  { value: 'modest', label: 'Modest' },
                  { value: 'naive', label: 'Naive' },
                  { value: 'naughty', label: 'Naughty' },
                  { value: 'quiet', label: 'Quiet' },
                  { value: 'quirky', label: 'Quirky' },
                  { value: 'rash', label: 'Rash' },
                  { value: 'relaxed', label: 'Relaxed' },
                  { value: 'sassy', label: 'Sassy' },
                  { value: 'serious', label: 'Serious' },
                  { value: 'timid', label: 'Timid' },
                ]}
                control={methods.control}
              />
            </Box>
            <Box flexGrow={1} flexBasis={'160px'}>
              <ControlledSelect
                name={`${name}.teraType`}
                label={'Tera Type'}
                options={[
                  { value: 'any', label: 'Any' },
                  { value: 'bug', label: 'Bug' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'dragon', label: 'Dragon' },
                  { value: 'electric', label: 'Electric' },
                  { value: 'fairy', label: 'Fairy' },
                  { value: 'fighting', label: 'Fighting' },
                  { value: 'fire', label: 'Fire' },
                  { value: 'flying', label: 'Flying' },
                  { value: 'ghost', label: 'Ghost' },
                  { value: 'grass', label: 'Grass' },
                  { value: 'ground', label: 'Ground' },
                  { value: 'ice', label: 'Ice' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'poison', label: 'Poison' },
                  { value: 'psychic', label: 'Psychic' },
                  { value: 'rock', label: 'Rock' },
                  { value: 'steel', label: 'Steel' },
                  { value: 'water', label: 'Water' },
                ]}
                control={methods.control}
              />
            </Box>
            <Box flexGrow={1} flexBasis={'160px'}>
              <ControlledSelect
                name={`${name}.region`}
                label={'Region'}
                options={[
                  { value: 'any', label: 'Any' },
                  { value: 'CHS', label: 'CHS' },
                  { value: 'CHT', label: 'CHT' },
                  { value: 'ENG', label: 'ENG' },
                  { value: 'FRE', label: 'FRE' },
                  { value: 'GER', label: 'GER' },
                  { value: 'ITA', label: 'ITA' },
                  { value: 'JPN', label: 'JPN' },
                  { value: 'KOR', label: 'KOR' },
                  { value: 'SPA', label: 'SPA' },
                  { value: 'SPEU', label: 'SP-EU' },
                ]}
                control={methods.control}
              />
            </Box>
          </Flex>
          <Flex gap={2} wrap="wrap" align="flex-end" pt={4}>
            {['shiny', 'touch', 'free'].map((name) => (
              <Box flexGrow={1} flexBasis={'160px'} key={name}>
                <Controller
                  name={name}
                  control={methods.control}
                  render={({ field: { ref, ...restField } }) => (
                    <Checkbox {...restField} textTransform="capitalize">
                      {name}
                    </Checkbox>
                  )}
                />
              </Box>
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
