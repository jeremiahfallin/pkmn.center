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
