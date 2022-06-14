import React, {useState} from 'react';
import Head from "next/head";
import axios from 'axios';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout';

const ForgotPassword = () => {
    const { user, loading } = useFetchUser();

    // React-Hook-Form Validation
    const { register, formState: {errors}, handleSubmit  } = useForm();

    const [isSubmitting, setSubmitStatus] = useState(false);

    const [submitSuccess, setSubmitSuccess] = useState('');

    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (data) => {

        // Disable Submit Button / Unset Previous Submit Error Message
        setSubmitStatus(true);
        setSubmitError('');

        // Request API.
        await axios
        .post(`${process.env.STRAPI_CMS_DOMAIN}/api/auth/forgot-password`, {
            email: data.email, // user's email
        })
        .then((resp) => {
            console.log(resp);
            if(resp.data.ok){
                // Scroll to the Top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // for smoothly scrolling
                });

                // Disable Submit Button / Unset Previous Submit Error Message
                setSubmitStatus(true);
                setSubmitError('');
                setSubmitSuccess('Reset link has been sent to your mail, Please check your spam folder too');
            } else {
                let errorMessage = resp.error.message || "Email does not exists";
                // Scroll to the Top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // for smoothly scrolling
                });

                // Enable Back the Submit Button / Set Submit Error Message
                setSubmitStatus(false);
                setSubmitError(errorMessage);
                setSubmitSuccess('');
            }
        })
        .catch((error) => {

            console.log(error);
            // Scroll to the Top
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // for smoothly scrolling
            });

            // Enable Back the Submit Button / Set Submit Error Message
            setSubmitStatus(false);

            let responseData = error.response.data;
            if(responseData){
                let errorMessage = responseData.error.message || "System Error"

                setSubmitError(errorMessage);
                console.error('An error occurred:', error.response);
            }
        });
    }

    return (
        <Layout user={user}>
            <Head>
                <title>
                    Forgot Password - SwatchBack
                </title>
            </Head>
            <Box className="sb_container">
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    //bg={useColorModeValue('gray.50', 'gray.800')}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'lg'}
                        //bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={10}
                        my={12}>

                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Forgot your password?
                        </Heading>

                        <Text
                            fontSize={{ base: 'sm', sm: 'md' }}
                            color={useColorModeValue('gray.800', 'gray.400')}>
                            You&apos;ll get an email with a reset link
                        </Text>

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

                        {/* Error Alert Message */}
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

                        <FormControl id="email">
                            <Input
                                placeholder="your-email@example.com"
                                _placeholder={{ color: 'gray.500' }}
                                type="email"
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

                        <Stack spacing={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                type={'submit'}    
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Request Reset
                            </Button>
                        </Stack>

                    </Stack>
                </Flex>
            </Box>
        </Layout>
    );
}

export default ForgotPassword;