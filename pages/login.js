import React, { useState } from 'react'
import Head from "next/head";
import Link from 'next/link';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Divider
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import SignInGoogle from './components/SigninGoogle';
import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';
import { setToken } from '../lib/auth';
import { fetcher } from '../lib/api';

const Login = () => {

    const { user, loading } = useFetchUser();
    const { session, loadingSession } = useSession();

    // React-Hook-Form Validation
    const { register, formState: {errors}, handleSubmit  } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setSubmitStatus] = useState(false);

    const [submitError, setSubmitError] = useState('');

    const [data, setData] = useState({
        identifier: '',
        password: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {

        // Disable Submit Button / Unset Previous Submit Error Message
        setSubmitStatus(true);
        setSubmitError('');

        try {
            const responseData = await fetcher(
                `${process.env.STRAPI_CMS_DOMAIN}/api/auth/local`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: data.identifier,
                        password: data.password,
                    }),
                }
            );
            if (responseData.error) {
                let errorMessage = responseData.error.message || "System Error";
                // Scroll to the Top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // for smoothly scrolling
                });

                // Enable Back the Submit Button / Set Submit Error Message
                setSubmitStatus(false);
                setSubmitError(errorMessage);
            } else {
                setToken(responseData);
            }
        } catch (error) {
            // Scroll to the Top
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // for smoothly scrolling
            });
            // Enable Back the Submit Button / Set Submit Error Message
            setSubmitStatus(false);
            setSubmitError('System Error');
            console.error(error);
        }
    } 
    return (
        <Layout user={user}>
            <Head>
                <title>
                    Login - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    //bg={useColorModeValue('gray.50', 'gray.800')}
                    >
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                to enjoy all of our features ✌️
                            </Text>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            {
                                submitError ? 
                                    <Alert status='error' marginBottom={5} rounded={'lg'}>
                                        <AlertIcon />
                                        {/* <AlertTitle>{submitError}</AlertTitle> */}
                                        {
                                            submitError === "An error occurred during account creation" ?
                                            <AlertDescription>{"Incorrect email and password"}</AlertDescription>
                                            :
                                            <AlertDescription>{submitError}</AlertDescription>
                                        }
                                    </Alert>
                                : null
                            }
                            
                            <Stack spacing={4}>
                                {/* Email */}
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input 
                                        type="email" 
                                        name="identifier" 
                                        onChange={handleChange} 
                                        {
                                            ...register("identifier", {
                                                required: true, 
                                                pattern: {value: /^\S+@\S+$/i, message: "Invalid Email Address"}
                                            })
                                        }
                                        isInvalid={errors.identifier}
                                        focusBorderColor={ errors.identifier? 'red.500' : 'blue.500' }
                                        errorBorderColor='red.500'
                                    />
                                    <Text fontSize='md' color={'red.500'} marginTop={1}>
                                        {errors.identifier? errors.identifier.message : ""}
                                    </Text>
                                </FormControl>
                                
                                {/* Password */}
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type={showPassword ? 'text' : 'password'} 
                                            name="password" onChange={handleChange} 
                                            {
                                                ...register("password", 
                                                {
                                                    required: {value: "required"}
                                                })
                                            }
                                            isInvalid={errors.password}
                                            focusBorderColor={ errors.password? 'red.500' : 'blue.500' }
                                            errorBorderColor='red.500'
                                            maxLength={25}
                                        />
                                        <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                {/* Forgot Password / SignIn */}
                                <Stack spacing={10} paddingBottom={5}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'} href={'/forgotPassword'}>Forgot password?</Link>
                                    </Stack>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isSubmitting}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Sign in
                                    </Button>
                                </Stack>

                                <Divider />

                                {/* Signin using Gmail */}
                                {!session && (
                                    <Stack spacing={10} paddingTop={2}>
                                        <SignInGoogle gSignIn={()=>{signIn()}}/>
                                    </Stack>
                                )}

                                {/* Register Link for New User */}
                                <Stack paddingTop={2} >
                                    <Text align={'center'}>
                                        New user? <Link href={'/register'} color={'blue.400'}>Register</Link>
                                    </Text>
                                </Stack>

                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </Box>
        </Layout>
    );
}

export default Login;

// Sample Login Response
/*
    {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY1NTIyMzA3NCwiZXhwIjoxNjU3ODE1MDc0fQ.AEzV1puMgQWlBwPZU6Bu0lp7vUWfmxkqM6cWeQI1CEc","user":{"id":10,"username":"joshuajabakumar","email":"joshuajabakumar@gmail.com","provider":"local","confirmed":true,"blocked":false,"createdAt":"2022-06-13T16:32:36.659Z","updatedAt":"2022-06-14T16:08:27.330Z","firstName":"Joshua","lastName":"Jabakumar"}}
*/