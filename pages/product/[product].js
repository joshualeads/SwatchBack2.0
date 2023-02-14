import React from "react";
import Head from 'next/head';
import Image from 'next/image';
import { Box, Stack, Heading, Text, Button, Link } from "@chakra-ui/react";
import { getProduct, recursiveCatalog } from "../../lib/shopify"
//import Carousel from "../../components/Carousel";
import ProductStrip from "../../components/ProductStrip";
import { useFetchUser } from '../../lib/authContext';
import Layout from '../../components/global/Layout';

const ProductDetailPage = ({product}) => {

    const { user, loading } = useFetchUser();
    const productImages = [];
    let buyNowLinks = [];

    if(product.images) {
      product.images.edges.map((image) => {
        productImages.push(image.node.originalSrc);
      });
    }

    if(product.buynow){
      buyNowLinks = JSON.parse(product.buynow.value);
      console.log(buyNowLinks);
    }

    console.log(product);

    return (
        <Layout user={user}>
            <Box className="sb_container_wide_screen">
              <Head>
                <title>{product.title} - SwatchBack</title>
              </Head>
              <Stack direction={['column', 'column', 'row', 'row', 'row']} mt={'2%'} padding={'2%'} backgroundColor={'#FFF4EB'}>
                {/* Hero Product Image */}
                <Box width={['100%','100%','40%','40%','40%']} mt={'2%'} position={'relative'} display={'flex'} flexDirection='row'>
                  {/*
                  <Carousel slides={productImages} type={"product"} />
                  */}
                  {/* First Image */}
                  <Image 
                    width={"500px"}
                    height={"500px"}
                    src={productImages[0] ? productImages[0] : "https://via.placeholder.com/500x500.png?text=No+Image"}
                    objectFit={"fill"}
                  />
                  {/* Second Image */}
                  <Image
                    width={"500px"}
                    height={"500px"}
                    src={productImages[1] ? productImages[1] : "https://via.placeholder.com/500x500.png?text=No+Image"}
                    objectFit={"fill"}
                  /> 
                </Box>

                {/* Hero Product Description */}
                <Box width={['100%','100%','40%','40%','40%']} paddingLeft={['0%', '0%', '2%', '2%', '2%']} paddingRight={['0%', '0%', '2%', '2%', '2%']}>
                  <Text textAlign={["center", "center", "left", "left", "left"]} mt={6}>Search Results for:</Text>
                  <Heading as="h2" size="lg" mb={2} textAlign={["center", "center", "left", "left", "left"]}>
                    {product.title}
                  </Heading>
                  <Text textAlign={["center", "center", "left", "left", "left"]}>by &quot;{product.vendor}&quot;</Text>
                  <Text mt={"2%"} textAlign={["center", "center", "left", "left", "left"]}>{product.description}</Text>
                </Box>

                {/* Hero Product Buy Button */}
                <Box width={['100%','100%','20%','20%','20%']} borderLeft={['none', 'none', '2px solid #979797', '2px solid #979797', '2px solid #979797']} marginLeft={['0%', '0%', '3%', '3%', '3%']} paddingLeft={['0%', '0%', '3%', '3%', '3%'] } alignContent={["center"]}>
                  <Text marginBottom={['0%', '0%', '0%', '5%', '5%']} fontWeight={"semibold"} textAlign={['center','center','center','left','left']} textDecoration={"underline"} fontSize={'lg'}>Shop from</Text>
                  {buyNowLinks.map((link)=>{
                    return (
                      <Stack marginBottom={['15%', '15%', '15%', '15%', '15%']} fontSize={'lg'} fontFamily={'body'} fontWeight={500} textAlign={['center','center','center','left','left']} cursor={'pointer'}>
                        <Link href={link} isExternal >
                          {link.includes('www') ? link.split('/')[2].split('www.')[1] : link.split('/')[2]}
                        </Link>
                      </Stack>
                    );
                  })}
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