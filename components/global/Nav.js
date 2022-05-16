import React from 'react';
//import Image from 'next/image';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon  } from '@chakra-ui/icons';

const Links = [
    { 'name': 'Foundation', 'url': '/foundation' }, 
    { 'name': 'Dupes', 'url': '/dupes' }, 
    { 'name': 'Blogs', 'url': '/blogs' }, 
    { 'name': 'Contact Us', 'url': '/contact-us' }
];

const NavLink = (props) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={props.url}>
        {props.children}
    </Link>
);

const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <header>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} className='sb_container'>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Heading fontSize={"3xl"}>
                            <Link href='/' py={'5'} _hover={{
                                textDecoration: 'none',
                            }}>
                                SwatchBack
                                {/* <Image src='/sbHeader.png' alt='SwatchBack' width={'95%'} height={'95%'}></Image> */}
                            </Link>
                            </Heading>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.url} url={link.url}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        {/* <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}>
                            Action
                        </Button> */}

                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                size={'sm'}
                                src={
                                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>My Account</MenuItem>
                                <MenuItem>Favourites</MenuItem>
                                <MenuDivider />
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.url} url={link.url}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </header>
    );
}

export default Nav;