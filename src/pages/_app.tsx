import { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from 'utils/trpc';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  global: {
    html: {
      height: '100%',
      minHeight: '100%',
    },
    body: {
      scrollBehavior: 'smooth',
      height: '100%',
      minHeight: '100%',
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '100%',
    },
  },
  colors: {
    brand: {
      50: '#f5f9ff',
    },
  },
});

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
