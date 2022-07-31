import React from 'react';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
  } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import { setToken } from '../lib/auth';
import { fetcher } from '../lib/api';
import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const Register = () => {
    const { user, loading } = useFetchUser();

    const router = useRouter();

    // React-Hook-Form Validation
    const { register, formState: {errors}, handleSubmit  } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setSubmitStatus] = useState(false);

    const [submitSuccess, setSubmitSuccess] = useState('');

    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (data) => {

        console.log(data);
        // Disable Submit Button / Unset Previous Submit Error Message
        setSubmitStatus(true);
        setSubmitError('');

        try {
          const responseData = await fetcher(
            `${process.env.STRAPI_CMS_DOMAIN}/api/auth/local/register`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                password: data.password
              }),
              method: 'POST',
            }
          );
          console.log(responseData);
          if(responseData.error) {
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
            // Disable Submit Button / Unset Previous Submit Error Message
            setSubmitStatus(true);
            setSubmitError('');
            setSubmitSuccess('Account Verification link has been sent to your mail. Please check your Spam folder too.');
            setToken(responseData, '/login');
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

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <Layout>
            <Head>
                <title>
                    Register - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    // bg={useColorModeValue('gray.50', 'gray.800')}
                >
                    <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                Sign up
                            </Heading>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                to enjoy all of our cool features ✌️
                            </Text>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>

                            {/* Success Alert Message */}
                            {
                                submitSuccess ?
                                <Alert status='success' marginBottom={5} rounded={'lg'}>
                                    <AlertIcon />
                                    {/* <AlertTitle>{submitError}</AlertTitle> */}
                                    {
                                        <AlertDescription>{submitSuccess}</AlertDescription>
                                    }
                                </Alert>
                                : null
                            }

                            {
                                submitError ? 
                                    <Alert status='error' marginBottom={5} rounded={'lg'}>
                                        <AlertIcon />
                                        {/* <AlertTitle>{submitError}</AlertTitle> */}
                                        {
                                            submitError === "An error occurred during account creation" ?
                                            <AlertDescription>{"User Name is already taken"}</AlertDescription>
                                            :
                                            <AlertDescription>{submitError}</AlertDescription>
                                        }
                                    </Alert>
                                : null
                            }
                            <Stack spacing={4}>
                                {/* First Name / Last Name */}
                                <HStack>
                                    <Box>
                                        <FormControl id="firstName" isRequired>
                                            <FormLabel>First Name</FormLabel>
                                            <Input 
                                                type="text" 
                                                onChange={(e) => handleChange(e)} 
                                                name="firstName" 
                                                {
                                                    ...register("firstName", {
                                                        required: {value: "required", message: "This Field is Required"}, 
                                                    })
                                                }
                                                isInvalid={errors.firstName}
                                                focusBorderColor={ errors.username? 'red.500' : 'blue.500' }
                                                errorBorderColor='red.500'
                                                maxLength={25}
                                            />

                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="lastName" isRequired>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input 
                                                type="text" 
                                                onChange={handleChange} 
                                                name="lastName" 
                                                {
                                                    ...register("lastName", {
                                                        required: {value: "required", message: "This Field is Required"},
                                                    })
                                                }
                                                isInvalid={errors.lastName}
                                                focusBorderColor={ errors.username? 'red.500' : 'blue.500' }
                                                errorBorderColor='red.500'
                                                maxLength={25}
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                
                                {/* User Name */}
                                <FormControl id="username" isRequired>
                                    <FormLabel>User Name</FormLabel>
                                    <Input 
                                        type="text" 
                                        onChange={handleChange} 
                                        name="username" 
                                        {
                                            ...register("username", {
                                                required: {value: "required"},
                                                minLength: {value: 8, message: "Should be more than 8 and less than 15"}, 
                                                maxLength: {value: 15, message: "Should be more than 8 and less than 15"}
                                            })
                                        }
                                        isInvalid={errors.username}
                                        focusBorderColor={ errors.username? 'red.500' : 'blue.500' }
                                        errorBorderColor='red.500'
                                        minLength={8}
                                        maxLength={15}
                                    />
                                    <Text fontSize='md' color={'red.500'} marginTop={1}>
                                        {errors.username? errors.username.message : ""}
                                    </Text>
                                </FormControl>

                                {/* Email */}
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input 
                                        type="email" 
                                        onChange={handleChange} 
                                        name="email" 
                                        {
                                            ...register("email", {
                                                required: true, 
                                                pattern: {value: /^\S+@\S+$/i, message: "Invalid Email Address"}
                                            })
                                        }
                                        isInvalid={errors.email}
                                        focusBorderColor={ errors.email? 'red.500' : 'blue.500' }
                                        errorBorderColor='red.500'
                                    />
                                    <Text fontSize='md' color={'red.500'} marginTop={1}>
                                        {errors.email? errors.email.message : ""}
                                    </Text>
                                </FormControl>

                                {/* Password */}
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type={showPassword ? 'text' : 'password'} 
                                            onChange={handleChange} 
                                            name="password" 
                                            {
                                                ...register("password", 
                                                {
                                                    required: {value: "required"},
                                                    minLength: {value: 6, message: "Should be more than 6 and less than 25"}, 
                                                    maxLength: {value: 25, message: "Should be more than 6 and less than 25"}
                                                })
                                            }
                                            isInvalid={errors.password}
                                            focusBorderColor={ errors.password? 'red.500' : 'blue.500' }
                                            errorBorderColor='red.500'
                                            minLength={6}
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
                                    <Text fontSize='md' color={'red.500'} marginTop={1}>
                                        {errors.password? errors.password.message : ""}
                                    </Text>
                                </FormControl>

                                {/* Submit */}
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isSubmitting}
                                        type={'submit'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>

                                {/* Login Redirect */}
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Already a user? <Link href="/login" color={'blue.400'}>Login</Link>
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

export default Register;