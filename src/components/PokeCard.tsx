import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  LinkOverlay,
} from '@chakra-ui/react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

type PokeCardProps = {
  id: number;
  image: string;
  name: string;
  rate?: number;
};

export default function PokeCard({ id, image, name, rate }: PokeCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Card borderWidth={'1px'} borderColor="gray.500">
      <CardBody>
        <Flex
          direction="column"
          justify="center"
          align="center"
          position="relative"
          h="100%"
        >
          <Heading as="h5" fontSize="2xl" textTransform={'capitalize'}>
            <LinkOverlay href={`/pokemon/${id}`}>{name}</LinkOverlay>
          </Heading>
          <Image src={image} alt={name} width={160} height={160} />
          {(!session || router.pathname === '/') && (
            <Box>
              <Rate count={5} value={rate} allowHalf={true} disabled={true} />
            </Box>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}
