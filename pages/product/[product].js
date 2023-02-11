import React from "react";
import Head from 'next/head';
import Image from 'next/image';
import { Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { getProduct, recursiveCatalog } from "../../lib/shopify"
import Carousel from "../../components/Carousel";
import ProductStrip from "../../components/ProductStrip";
import { useFetchUser } from '../../lib/authContext';
import Layout from '../../components/global/Layout';

const ProductDetailPage = ({product}) => {

    const { user, loading } = useFetchUser();
    const productImages = [];

    if(product.images) {
      product.images.edges.map((image) => {
        productImages.push(image.node.originalSrc);
      });
    }

    return (
        <Layout user={user}>
            <Box className="sb_container">
              <Head>
                <title>{product.title} - SwatchBack</title>
              </Head>
              <Stack direction={['column', 'column', 'row', 'row', 'row']} mt={'2%'}>
                {/* Hero Product Image */}
                <Box width={['100%','100%','50%','50%','50%']} mt={'2%'} position={'relative'} display={'flex'} flexDirection='row'>
                  {/*
                  <Carousel slides={productImages} type={"product"} />
                  */}
                  <Image 
                    width={"500px"}
                    height={"500px"}
                    src={productImages[0]}
                    objectFit={"fill"}
                  />
                  <Image
                    width={"500px"}
                    height={"500px"}
                    src={productImages[1]}
                    objectFit={"fill"}
                  />
                </Box>

                {/* Hero Product Description */}
                <Box width={['100%','100%','40%','40%','40%']} paddingLeft={['0%', '0%', '2%', '2%', '2%']}>
                  <Text textAlign={["center", "center", "left", "left", "left"]} mt={6}>Search Results for:</Text>
                  <Heading as="h2" size="lg" mb={2} textAlign={["center", "center", "left", "left", "left"]}>
                    {product.title}
                  </Heading>
                  <Text textAlign={["center", "center", "left", "left", "left"]}>by &quot;{product.vendor}&quot;</Text>
                  <Text mt={"2%"} textAlign={["center", "center", "left", "left", "left"]}>{product.description}</Text>
                </Box>

                {/* Hero Product Buy Button */}
                <Box width={['100%','100%','10%','10%','10%']} paddingLeft={['0%', '0%', '2%', '2%', '2%']} alignContent={"center"}>
                  <Button>Buy Now</Button>
                </Box>
              </Stack>

              {/* Recommended Products */}
              {
                product.collections.edges[0] ?
                  (
                    <ProductStrip 
                      title={"Recommended Products"}
                      products={product.collections.edges[0].node.products.edges}
                      className={'productStrip'}
                    />
                  ) :
                  <></>
              }
              
            </Box>
        </Layout>
    )
}

export async function getStaticPaths() {
    const products = await recursiveCatalog()
  
    const paths = products.map(item => {
      const product = String(item.node.handle)
  
      return {
        params: { product }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const product = await getProduct(params.product)
  
    return {
      props: {
        product
      }
    }
}

export default ProductDetailPage;