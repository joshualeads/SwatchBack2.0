import { ChakraProvider, extendTheme  } from '@chakra-ui/react'
import Layout from '../components/global/Layout';
import customTheme from '../styles/customTheme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
