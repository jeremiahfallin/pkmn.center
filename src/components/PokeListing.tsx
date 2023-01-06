import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function PokeListing({ pokemon }: any): JSX.Element {
  return (
    <>
      <Card
        flexGrow="1"
        flexBasis="160px"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex align={'center'} justify={'center'} direction="column">
          <Image
            src={pokemon.pokemon.image}
            alt={pokemon.pokemon.name}
            width={150}
            height={150}
          />
        </Flex>
        <Stack>
          <CardHeader py={2}>
            <Heading size="sm" fontWeight={800}>
              {pokemon.pokemon.name}
            </Heading>

            {pokemon.user && (
              <Heading size="sm">
                <Link href={`/profile/${pokemon.user.id}`}>
                  {`${pokemon.user.name}#${pokemon.user.discriminator}`}
                </Link>
              </Heading>
            )}
          </CardHeader>
          <Divider />
          <CardBody>
            <Text>Health: {pokemon.health?.label ?? pokemon.health}</Text>
            <Text>Attack: {pokemon.attack?.label ?? pokemon.attack}</Text>
            <Text>Defense: {pokemon.defense?.label ?? pokemon.defense}</Text>
            <Text>
              Special Attack:{' '}
              {pokemon.specialAttack?.label ?? pokemon.specialAttack}
            </Text>
            <Text>
              Special Defense:{' '}
              {pokemon.specialDefense?.label ?? pokemon.specialDefense}
            </Text>
            <Text>Speed: {pokemon.speed?.label ?? pokemon.speed}</Text>
            <Text>Level: {pokemon.level}</Text>
            <Text>Nature: {pokemon.nature?.label ?? pokemon.nature}</Text>
            <Text>
              Tera Type: {pokemon.teraType?.label ?? pokemon.teraType}
            </Text>
            <Text>Shiny: {pokemon.shiny ? 'Yes' : 'No'}</Text>
            <Text>Region: {pokemon.region?.label ?? pokemon.region}</Text>
            <Text>Touch: {pokemon.touch ? 'Yes' : 'No'}</Text>
          </CardBody>

          <Divider />
          <CardFooter py={2}>
            {pokemon.offers?.map((offer: any) => (
              <Image
                src={offer.pokemon.image}
                alt={offer.pokemon.name}
                width={75}
                height={75}
              />
            ))}
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
