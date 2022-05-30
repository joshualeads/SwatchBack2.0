import React from "react";
import Head from 'next/head'
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import { getProduct, recursiveCatalog } from "../../lib/shopify"
import Carousel from "../../components/Carousel";
import ProductStrip from "../../components/ProductStrip";

const ProductDetailPage = ({product}) => {
    console.log(product);

    const productImages = [];

    if(product.images) {
      product.images.edges.map((image) => {
        productImages.push(image.node.originalSrc);
      });
    }

    return (
        <main>
            <Box className="sb_container">
              <Head>
                <title>{product.title} - SwatchBack</title>
              </Head>
              <Stack direction={['column', 'column', 'row', 'row', 'row']} mt={'2%'}>
                <Box width={['100%','100%','40%','40%','40%']} mt={'2%'}>
                  <Carousel slides={productImages} type={"product"} />
                </Box>

                <Box width={['100%','100%','60%','60%','60%']} paddingLeft={['0%', '0%', '2%', '2%', '2%']}>
                  <Heading as="h2" size="lg" mt={6} mb={2} textAlign={["center", "center", "left", "left", "left"]}>
                    {product.title}
                  </Heading>
                  <Text textAlign={["center", "center", "left", "left", "left"]}>by "{product.vendor}"</Text>
                  <Text mt={"2%"} textAlign={["center", "center", "left", "left", "left"]}>{product.description}</Text>
                </Box>
              </Stack>

              {/* Recommended Products */}
              <ProductStrip 
                title={"Recommended Products"}
                products={product.collections.edges[0].node.products.edges}
                className={'productStrip'}
              />
            </Box>
        </main>
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