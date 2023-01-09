import React from 'react';
import Link from 'next/link';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Stack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Heading,
    Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import UserAvatar from 'react-user-avatar';
import { useSession, signOut } from 'next-auth/react';
import styles from './Nav.module.css';

import { useUser } from '../../lib/authContext';
import { unsetToken } from '../../lib/auth';

const Links = [
    { 'name': 'Foundation', 'url': '/foundation' },
    { 'name': 'Dupes', 'url': '/dupes' },
    { 'name': 'Blogs', 'url': '/blogs' },
    { 'name': 'Contact Us', 'url': '/contactUs' }
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
        className={styles.navLink}
        href={props.url}>
        {props.children}
    </Link>
);

const Nav = () => {
    // Open and close the Drop Down Menu
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadingUser } = useUser();

    let navColorModeValueBox = useColorModeValue('transparent', 'transparent');

    let navColorModeValueLink = useColorModeValue('gray.200', 'gray.700');

    const logout = () => {
        if(sbProfile.Provider === 'email'){
            unsetToken();
        } else {
            signOut();
        }
    };

    const {data, status} = useSession();

    let sbProfile = {
        isLoggedIn: false
    };

    if(user || data) {
        console.log(user);
        console.log(data);
        if(user?.firstName || user?.lastName){
            console.log('Building Profile Data from Email Provider');
            sbProfile.FirstName = user.firstName;
            sbProfile.LastName = user.lastName;
            sbProfile.ProfilePic = '';
            sbProfile.Provider = 'email';
            sbProfile.isLoggedIn = true;
        } else if(data) {
            console.log('Building Profile Data from Google');
            sbProfile.FirstName = data.session.user.name.split(' ')[0];
            sbProfile.LastName = data.session.user.name.split(' ')[1];
            sbProfile.ProfilePic  = data.session.user.image;
            sbProfile.Provider = 'google';
            sbProfile.isLoggedIn = true;
        } else {
            sbProfile.isLoggedIn = false;
        }
    }

    return (
        <header>
            <Box bg={navColorModeValueBox} className='sb_container'>
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
                                    <HStack>
                                    <Text display={'inline'} color={useColorModeValue('#000080')} m={'0px !important'}>find</Text>
                                    <Text display={'inline'} color={useColorModeValue('#ff6600')} m={'0px !important'}>my</Text>
                                    <Text display={'inline'} color={useColorModeValue('#000080')} m={'0px !important'}>dupe</Text>
                                    {/* <Image src='/sbHeader.png' alt='SwatchBack' width={'95%'} height={'95%'}></Image> */}
                                    </HStack>
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

                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                        
                        {/* My Account */}
                        {!loadingUser &&
                            (sbProfile.isLoggedIn ?
                                (<Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                            <UserAvatar 
                                                size="45" 
                                                name={`${sbProfile.FirstName} ${sbProfile.LastName}`} 
                                                className={styles.UserAvatarinner} 
                                                src={sbProfile.ProfilePic || ''}
                                            />
                                    </MenuButton>
                                    <MenuList >
                                        <MenuItem>
                                            <Link href={"/profile"}>
                                                My Account
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link href={"/profile/#favourites"}>
                                                Favourites
                                            </Link>
                                        </MenuItem>
                                        {/* <MenuDivider /> */}
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>)
                                :
                                (<></>)
                            )
                        }

                        {/* Login / Register */}
                        {!sbProfile.isLoggedIn ? (
                            <>
                                <Stack ml={6}>
                                    <Link
                                        href={"/login"}
                                        px={2}
                                        py={1}
                                        rounded={'md'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: navColorModeValueLink,
                                        }}
                                        className={styles.navLink}
                                    >Signin / Signup</Link>
                                </Stack>

                                {/*
                                <Stack ml={6}>
                                    <Link
                                        href={"/register"}
                                        px={2}
                                        py={1}
                                        rounded={'md'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: navColorModeValueLink,
                                        }}
                                        className={styles.navLink}
                                    >Register</Link>
                                </Stack>
                                */}
                            </>
                            ) : <></>
                        }
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