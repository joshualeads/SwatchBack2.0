import React from 'react';
import Link from 'next/link';
import {
    Box,
    chakra,
    Container,
    //Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Heading,
    //textDecoration
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Logo = (props) => {
    return (
        <Link href='/' _hover={{textDecoration: 'none'}}>{props.children}</Link>
    );
};

const SocialButton = (props) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={props.href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{props.label}</VisuallyHidden>
            {props.children}
        </chakra.button>
    )
}

const Footer = () => {
    return (
        <footer>
            <Box
                position={'fixed'}
                width={"100%"}
                bottom={"0"}
                className={'sb_container'}
                zIndex={'99'}
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}>
                <Container
                    as={Stack}
                    maxW={'12xl'}
                    py={4}
                    px={0}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Logo><Heading fontSize={"3xl"} _hover={{cursor:'pointer'}}>SwatchBack</Heading></Logo>
                    <Text>© 2022 SwatchBack. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'#'} >
                            <FaTwitter  color={useColorModeValue('gray.700', 'gray.200')} />
                        </SocialButton>
                        <SocialButton label={'YouTube'} href={'#'}>
                            <FaYoutube color={useColorModeValue('gray.700', 'gray.200')} />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'#'}>
                            <FaInstagram color={useColorModeValue('gray.700', 'gray.200')} />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;