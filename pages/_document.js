import { Html, Head, Main, NextScript } from 'next/document';
import FacebookSDK from './components/FacebookSDK';

const Document = () => {
  return (
    <Html>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css"></link>
      </Head>
      <body>
        <Main />
        <FacebookSDK />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
