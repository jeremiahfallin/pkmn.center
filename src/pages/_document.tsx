import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

import { theme } from './_app';

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://raw.githubusercontent.com" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
