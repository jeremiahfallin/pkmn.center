import { Box, Flex } from '@chakra-ui/react';
import Nav from 'components/Nav';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'PokeRate',
    description: 'A simple rating system for Pokemon.',
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        noindex={false}
        canonical={`https://next-trpc-rendiriz.vercel.app${router.asPath}`}
        openGraph={{
          type: 'website',
          url: `https://next-trpc-rendiriz.vercel.app${router.asPath}`,
          title: meta.title,
          description: meta.description,
        }}
      />
      <Box w="100%">
        <Nav />
        <Flex
          as="main"
          id="skip"
          dir="column"
          justify="center"
          px={8}
          minW="100%"
          w="100%"
        >
          {children}
        </Flex>
        <Flex as="footer" dir="column" justify="center" align="center" py={8}>
          <NextLink href="https://github.com/jeremiahfallin/" passHref>
            <a target="_blank">Github</a>
          </NextLink>
        </Flex>
      </Box>
    </>
  );
}
