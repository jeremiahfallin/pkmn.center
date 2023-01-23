import { Button, Flex } from '@chakra-ui/react';

import ControlledSelect from './ControlledSelect';
import TradingFormCard from './TradingFormCard';

export default function TradingForm({
  type,
  methods,
  data,
  controlledSelectComponents,
}: any): JSX.Element {
  const watchPokemon = methods.watch('pokemon');

  if (!watchPokemon) return <></>;

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="center" align="center" pt={2}>
        <TradingFormCard methods={methods} pokemon={methods.watch()} />
      </Flex>
      {type !== 'wishlist' && (
        <>
          <Flex
            direction="row"
            gap={2}
            align="center"
            justify="center"
            w="260px"
          >
            <ControlledSelect
              name={'desiredPokemon'}
              options={data}
              control={methods.control}
              components={controlledSelectComponents}
            />
            <Button
              p={4}
              onClick={() => {
                const pokemon = methods.getValues('desiredPokemon');
                methods.setValue('offers', [
                  ...methods.getValues('offers'),
                  {
                    pokemon,
                    health: { value: 'unspecified', label: 'Unspecified' },
                    attack: { value: 'unspecified', label: 'Unspecified' },
                    defense: { value: 'unspecified', label: 'Unspecified' },
                    specialAttack: {
                      value: 'unspecified',
                      label: 'Unspecified',
                    },
                    specialDefense: {
                      value: 'unspecified',
                      label: 'Unspecified',
                    },
                    speed: { value: 'unspecified', label: 'Unspecified' },
                    levels: [1, 100],
                    nature: { value: 'unspecified', label: 'Unspecified' },
                    teraType: { value: 'unspecified', label: 'Unspecified' },
                    ability: '',
                    shiny: false,
                    region: { value: 'unspecified', label: 'Unspecified' },
                    touch: false,
                  },
                ]);
                methods.setValue('desiredPokemon', null);
              }}
            >
              Add
            </Button>
          </Flex>
          <Flex gap={4} direction="row" flexWrap={'wrap'}>
            {methods.watch('offers').map((offer: any, index: number) => {
              return (
                <TradingFormCard
                  key={index}
                  methods={methods}
                  pokemon={offer}
                  index={index}
                />
              );
            })}
          </Flex>
        </>
      )}
    </Flex>
  );
}
