import React from "react";
import Image from 'next/image';
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

const RelatedProducts = ({product}) => {

    const productImages = [];
    let buyNowLinks = [];

    if (product.images.edges) {
        product.images.edges.map((image) => {
            productImages.push(image.node.originalSrc);
        });
    }

    if (product.buynow) {
        buyNowLinks = JSON.parse(product.buynow.value);
        console.log(buyNowLinks);
    }

    console.log('Related Product');

    return (
        <Stack direction={['column', 'column', 'row', 'row', 'row']} mt={'2%'} padding={'2%'} borderBottom={'1px solid #979797'
        }>
            <style jsx>{`
              .sb-external-link {
                display: flex;
                float:left;
                color: 'gray.800'
              }
            `}
            </style>
            {/* Hero Product Image */}
            <Box width={['100%', '100%', '40%', '40%', '40%']} mt={'2%'} position={'relative'} display={'flex'} flexDirection='row' margin={['0']}>
                {/*
                  <Carousel slides={productImages} type={"product"} />
                  */}
                {/* First Image */}
                <Image
                    width={"500px"}
                    height={"500px"}
                    src={productImages[0] ? productImages[0] : "https://via.placeholder.com/500x500.png?text=No+Image"}
                    objectFit={"fill"}
                    alt={"Product Image 1"}
                />
                {/* Second Image */}
                <Image
                    width={"500px"}
                    height={"500px"}
                    src={productImages[1] ? productImages[1] : "https://via.placeholder.com/500x500.png?text=No+Image"}
                    objectFit={"fill"}
                    alt={"Product Image 2"}
                />
            </Box>

            {/* Hero Product Description */}
            <Box width={['100%', '100%', '40%', '40%', '40%']} paddingLeft={['0%', '0%', '2%', '2%', '2%']} paddingRight={['0%', '0%', '2%', '2%', '2%']}>
                {/*
                  <Text textAlign={["center", "center", "left", "left", "left"]} mt={6}>Search Results for:</Text>
                  */}
                <Heading as="h2" size="lg" mb={2} textAlign={["center", "center", "left", "left", "left"]} fontSize={"2xl"} color={"#000"}>
                    {product.title}
                </Heading>
                <Text textAlign={["center", "center", "left", "left", "left"]}>by &quot;{product.vendor}&quot;</Text>
                <Text mt={"2%"} textAlign={["center", "center", "left", "left", "left"]} fontSize={'md'}>{product.description}</Text>
            </Box>

            {/* Hero Product Buy Button */}
            <Box width={['100%', '100%', '20%', '20%', '20%']} borderLeft={['none', 'none', '1px solid #979797', '1px solid #979797', '1px solid #979797']} marginLeft={['0%', '0%', '3%', '3%', '3%']} paddingLeft={['0%', '0%', '3%', '3%', '3%']} alignContent={["center"]}>
                {/* 
                  <Text marginBottom={['0%', '0%', '0%', '5%', '5%']} fontWeight={"semibold"} textAlign={['center','center','center','left','left']} textDecoration={"underline"} fontSize={'lg'}>Shop from</Text>
                  */}
                {buyNowLinks.map((link) => {
                    return (
                        <Stack marginBottom={['5%', '5%', '5%', '10%', '10%']} fontSize={'2xl'} fontFamily={'body'} textAlign={['center', 'center', 'center', 'left', 'left']} cursor={'pointer'} key={link} textDecoration={"none"} textTransform={"capitalize"} color={'gray.800'} fontWeight={700} flexDirection={'row'} justifyContent={['center', 'center', 'center', 'left', 'left']}>
                            <a href={link} textDecoration={"none"} target={"_blank"} color={'gray.800'} className={'sb-external-link'} rel={"noopener noreferrer"}>
                                <Stack marginRight={['1%', '1%', '1%', '3%', '3%']}>
                                    <Text fontSize={'md'}>
                                        {link.includes('www') ? link.split('/')[2].split('www.')[1] : link.split('/')[2]}
                                    </Text>
                                </Stack>
                                <Stack marginTop={['3%', '3%', '3%', '3%', '3%']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="20" height="20"
                                        viewBox="0 0 30 30">
                                        <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"></path>
                                    </svg>
                                </Stack>
                            </a>
                        </Stack>
                    );
                })}
            </Box>
        </Stack>
    );
}

export default RelatedProducts;