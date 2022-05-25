import { useState } from 'react'; 
import Head from 'next/head';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar';
import Layout from '../components/global/Layout';
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
    <>
    <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      <link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css"></link>
    </Head>
    <ChakraProvider theme={customTheme}>
      <Layout>
        <NextNProgress options={{showSpinner:false}} />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
    </>
  )
}

export default MyApp;
