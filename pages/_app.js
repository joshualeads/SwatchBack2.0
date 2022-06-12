import { useState } from 'react';
import Router from 'next/router';

import { ChakraProvider } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar';
import customTheme from '../styles/customTheme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url)=> {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url)=> {
    setLoading(false);
  });

  return (
    <ChakraProvider theme={customTheme}>
      <NextNProgress options={{showSpinner:false}} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;
