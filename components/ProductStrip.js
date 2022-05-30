import React from 'react';
import Link from 'next/link';
import { Heading, Center, useColorModeValue, Text, Stack, Image, Box, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from'@chakra-ui/icons';
import Slider from 'react-slick';

const ProductStrip = (props) => {

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    };

    const [slider, setSlider] = React.useState(null, Slider);

    return (
        <>
            {/* CSS files for react-slick */}
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <Heading as="h2" size="lg" mt={6} mb={2} textAlign={["center", "center", "left", "left", "left"]}>{props.title}</Heading>

            {/* Left Icon */}
            <Box>
                <IconButton
                    aria-label="left-arrow"
                    colorScheme="blackAlpha"
                    borderRadius="full"
                    position="absolute"
                    left={"10%"}
                    bottom={"15%"}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider.slickPrev()}>
                    <ArrowLeftIcon />
                </IconButton>
            </Box>

            {/* Right Icon */}
            <Box
                >
                <IconButton
                    aria-label="right-arrow"
                    colorScheme="blackAlpha"
                    borderRadius="full"
                    position="absolute"
                    right={"10%"}
                    bottom={"15%"}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider.slickNext()}>
                    <ArrowRightIcon />
                </IconButton>
            </Box>

            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {
                    props.products.map((product) => { return (
                        <Link 
                            key={Math.random()}
                            href={`/product/${product.node.handle}`} 
                            _hover={{
                                textDecoration: 'none'
                        }}>
                        <Center py={12}>
                            <Box
                                role={'group'}
                                p={6}
                                maxW={'90%'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.800')}
                                //boxShadow={'lg'}
                                rounded={'lg'}
                                pos={'relative'}
                                zIndex={1}>
                                <Box
                                    rounded={'lg'}
                                    mt={-12}
                                    pos={'relative'}
                                    height={'230px'}
                                    _after={{
                                        transition: 'all .3s ease',
                                        content: '""',
                                        w: 'full',
                                        h: 'full',
                                        pos: 'absolute',
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url(${product.node.images.edges[0].node.originalSrc})`,
                                        filter: 'blur(15px)',
                                        zIndex: -1,
                                    }}
                                    _groupHover={{
                                        _after: {
                                            filter: 'blur(20px)',
                                        },
                                    }}>
                                    <Image
                                        rounded={'lg'}
                                        height={230}
                                        width={282}
                                        objectFit={'cover'}
                                        src={product.node.images.edges[0].node.originalSrc}
                                        cursor={'pointer'}
                                    />
                                </Box>
                                <Stack pt={10} align={'center'}>
                                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'capitalize'} cursor={'pointer'}>
                                        {product.node.vendor}
                                    </Text>
                                    <Text fontSize={'lg'} fontFamily={'body'} fontWeight={500} textTransform={'capitalize'} textAlign={'center'} cursor={'pointer'}>
                                        {product.node.title}
                                    </Text>
                                    {/* <Stack direction={'row'} align={'center'}>
                                        <Text fontWeight={800} fontSize={'xl'}>
                                            $57
                                        </Text>
                                        <Text textDecoration={'line-through'} color={'gray.600'}>
                                            $199
                                        </Text>
                                    </Stack> */}
                                </Stack>
                            </Box>
                        </Center>
                        </Link>
                    )})
                }
            </Slider>
        </>
    );
}

export default ProductStrip;